import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { mkdtemp, rm, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const targetUrl = process.argv[2] ?? "https://groovepublic.com/reveused/";
const outputPrefix = process.env.INSPECT_PREFIX ?? "reveused";
const chromePath =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outRoot = process.cwd();

const viewports = [
  { name: "desktop", width: 1440, height: 1200, mobile: false, deviceScaleFactor: 1 },
  { name: "tablet", width: 768, height: 1024, mobile: false, deviceScaleFactor: 1 },
  { name: "mobile", width: 390, height: 844, mobile: true, deviceScaleFactor: 2 },
];

async function ensureDirs() {
  await Promise.all([
    mkdir(path.join(outRoot, "docs/research/components"), { recursive: true }),
    mkdir(path.join(outRoot, "docs/design-references"), { recursive: true }),
    mkdir(path.join(outRoot, "public/images/reveused"), { recursive: true }),
    mkdir(path.join(outRoot, "public/videos/reveused"), { recursive: true }),
    mkdir(path.join(outRoot, "public/seo"), { recursive: true }),
  ]);
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("Unable to allocate a debug port"));
        return;
      }
      const { port } = address;
      server.close(() => resolve(port));
    });
    server.on("error", reject);
  });
}

async function delay(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url, tries = 80) {
  let lastError;
  for (let index = 0; index < tries; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await delay(125);
  }
  throw lastError ?? new Error(`Unable to fetch ${url}`);
}

class Cdp {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.nextId = 1;
    this.pending = new Map();
    this.events = [];
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.addEventListener("open", () => resolve());
      this.ws.addEventListener("error", reject);
      this.ws.addEventListener("message", (event) => {
        const message = JSON.parse(event.data.toString());
        if (message.id && this.pending.has(message.id)) {
          const { resolve: done, reject: fail } = this.pending.get(message.id);
          this.pending.delete(message.id);
          if (message.error) {
            fail(new Error(`${message.error.message}: ${message.error.data ?? ""}`));
          } else {
            done(message.result);
          }
          return;
        }
        this.events.push(message);
      });
    });
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId;
    this.nextId += 1;
    const payload = sessionId ? { id, method, params, sessionId } : { id, method, params };
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify(payload));
    });
  }

  async close() {
    this.ws.close();
  }
}

async function runtimeEval(cdp, sessionId, expression) {
  const result = await cdp.send(
    "Runtime.evaluate",
    {
      expression,
      awaitPromise: true,
      returnByValue: true,
      timeout: 60000,
    },
    sessionId,
  );
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text ?? "Runtime evaluation failed");
  }
  return result.result.value;
}

async function waitForReady(cdp, sessionId) {
  await runtimeEval(
    cdp,
    sessionId,
    `new Promise((resolve) => {
      const finish = () => {
        Promise.allSettled(Array.from(document.images).map((img) => {
          if (img.complete) return true;
          return new Promise((done) => {
            img.addEventListener('load', done, { once: true });
            img.addEventListener('error', done, { once: true });
          });
        })).then(() => document.fonts.ready).then(() => setTimeout(resolve, 900));
      };
      if (document.readyState === 'complete') finish();
      else window.addEventListener('load', finish, { once: true });
    })`,
  );
}

function makeInspectExpression({ afterOpen = false } = {}) {
  return `(() => {
    const afterOpen = ${JSON.stringify(afterOpen)};
    const props = [
      'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
      'textTransform','textDecoration','backgroundColor','backgroundImage','background',
      'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
      'margin','marginTop','marginRight','marginBottom','marginLeft',
      'width','height','maxWidth','minWidth','maxHeight','minHeight',
      'display','flexDirection','justifyContent','alignItems','gap',
      'gridTemplateColumns','gridTemplateRows',
      'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
      'boxShadow','overflow','overflowX','overflowY',
      'position','top','right','bottom','left','zIndex',
      'opacity','transform','transition','cursor',
      'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
      'whiteSpace','textOverflow','WebkitLineClamp'
    ];

    const ignored = new Set(['none', 'normal', 'auto', '0px', 'rgba(0, 0, 0, 0)', '']);
    const styleSubset = (element) => {
      const cs = getComputedStyle(element);
      const styles = {};
      props.forEach((prop) => {
        const value = cs[prop];
        if (value && !ignored.has(value)) styles[prop] = value;
      });
      return styles;
    };

    const rectFor = (element) => {
      const rect = element.getBoundingClientRect();
      return {
        x: Math.round(rect.x + window.scrollX),
        y: Math.round(rect.y + window.scrollY),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        viewportX: Math.round(rect.x),
        viewportY: Math.round(rect.y),
      };
    };

    const selectorFor = (element) => {
      if (element.id) return '#' + CSS.escape(element.id);
      const dataId = element.getAttribute('data-id');
      if (dataId) return '[data-id="' + dataId + '"]';
      const classes = Array.from(element.classList).slice(0, 3);
      if (classes.length) return element.tagName.toLowerCase() + '.' + classes.map((value) => CSS.escape(value)).join('.');
      const parent = element.parentElement;
      if (!parent) return element.tagName.toLowerCase();
      const index = Array.from(parent.children).indexOf(element) + 1;
      return selectorFor(parent) + ' > ' + element.tagName.toLowerCase() + ':nth-child(' + index + ')';
    };

    const visible = (element) => {
      const rect = element.getBoundingClientRect();
      const cs = getComputedStyle(element);
      return rect.width > 2 && rect.height > 2 && cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || '1') > 0.01;
    };

    const firstText = (element) => Array.from(element.childNodes)
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent.trim())
      .filter(Boolean)
      .join(' ')
      .slice(0, 220);

    const walk = (element, depth = 0) => {
      if (depth > 4 || !element) return null;
      const children = Array.from(element.children).filter(visible).slice(0, 24);
      return {
        tag: element.tagName.toLowerCase(),
        selector: selectorFor(element),
        id: element.id || null,
        classes: Array.from(element.classList).slice(0, 8),
        dataId: element.getAttribute('data-id'),
        dataElementType: element.getAttribute('data-element_type'),
        widgetType: element.getAttribute('data-widget_type'),
        text: firstText(element),
        innerText: element.innerText?.replace(/\\s+/g, ' ').trim().slice(0, 1400) || '',
        rect: rectFor(element),
        styles: styleSubset(element),
        image: element.tagName === 'IMG' ? {
          src: element.currentSrc || element.src,
          alt: element.alt,
          naturalWidth: element.naturalWidth,
          naturalHeight: element.naturalHeight,
        } : null,
        backgroundImage: getComputedStyle(element).backgroundImage,
        childCount: element.children.length,
        children: children.map((child) => walk(child, depth + 1)).filter(Boolean),
      };
    };

    const all = Array.from(document.querySelectorAll('*'));
    const colors = new Map();
    const fonts = new Map();
    const addCount = (map, key) => {
      if (!key || ignored.has(key)) return;
      map.set(key, (map.get(key) ?? 0) + 1);
    };

    all.filter(visible).slice(0, 1600).forEach((element) => {
      const cs = getComputedStyle(element);
      addCount(colors, cs.color);
      addCount(colors, cs.backgroundColor);
      addCount(colors, cs.borderColor);
      addCount(fonts, cs.fontFamily + ' | ' + cs.fontWeight + ' | ' + cs.fontSize + ' | ' + cs.lineHeight);
    });

    const pageRoot = document.querySelector('[data-elementor-type="wp-post"]') || document.querySelector('main') || document.body;
    const rawSections = Array.from(pageRoot.querySelectorAll(':scope > .e-con, :scope > section, #section-cover, .elementor-section, .elementor-top-section, [data-element_type="container"]'))
      .filter(visible)
      .filter((element, index, arr) => {
        const rect = element.getBoundingClientRect();
        if (rect.height < 80) return false;
        return !arr.some((other) => other !== element && other.contains(element) && other.parentElement === pageRoot);
      });

    const sectionCandidates = rawSections.length ? rawSections : Array.from(pageRoot.children).filter(visible);
    const sections = sectionCandidates.slice(0, 42).map((element, index) => ({
      index,
      selector: selectorFor(element),
      id: element.id || null,
      classes: Array.from(element.classList).slice(0, 10),
      dataId: element.getAttribute('data-id'),
      dataElementType: element.getAttribute('data-element_type'),
      text: element.innerText.replace(/\\s+/g, ' ').trim().slice(0, 700),
      rect: rectFor(element),
      styles: styleSubset(element),
      images: Array.from(element.querySelectorAll('img')).map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight,
      })),
      backgroundImages: Array.from(element.querySelectorAll('*')).concat(element).map((child) => getComputedStyle(child).backgroundImage).filter((bg) => bg && bg !== 'none').slice(0, 20),
    }));

    const sectionDetails = sectionCandidates.slice(0, 18).map((element) => walk(element, 0));
    const invitationColumn = document.querySelector('[data-id="565386fd"]');
    const panels = Array.from(invitationColumn?.children || []).filter(visible).map((element, index) => ({
      index,
      selector: selectorFor(element),
      id: element.id || null,
      dataId: element.getAttribute('data-id'),
      classes: Array.from(element.classList).slice(0, 10),
      rect: rectFor(element),
      styles: styleSubset(element),
      backgroundImage: getComputedStyle(element).backgroundImage,
      text: element.innerText.replace(/\\s+/g, ' ').trim(),
      headings: Array.from(element.querySelectorAll('h1,h2,h3,h4,h5,h6,p,.elementor-heading-title,.elementor-button-text')).map((node) => ({
        text: node.innerText?.replace(/\\s+/g, ' ').trim() || '',
        selector: selectorFor(node),
        styles: styleSubset(node),
        rect: rectFor(node),
      })).filter((item) => item.text),
      images: Array.from(element.querySelectorAll('img')).map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight,
      })),
      backgroundImages: Array.from(element.querySelectorAll('*')).concat(element).map((child) => getComputedStyle(child).backgroundImage).filter((bg) => bg && bg !== 'none').slice(0, 24),
    }));

    const images = Array.from(document.querySelectorAll('img')).map((img) => ({
      src: img.currentSrc || img.src,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      parentClasses: img.parentElement ? Array.from(img.parentElement.classList).slice(0, 8) : [],
      siblings: img.parentElement ? img.parentElement.querySelectorAll('img').length : 0,
      position: getComputedStyle(img).position,
      zIndex: getComputedStyle(img).zIndex,
    })).filter((asset) => asset.src);

    const videos = Array.from(document.querySelectorAll('video')).map((video) => ({
      src: video.currentSrc || video.src || video.querySelector('source')?.src || '',
      poster: video.poster,
      autoplay: video.autoplay,
      loop: video.loop,
      muted: video.muted,
    })).filter((asset) => asset.src || asset.poster);

    const backgroundImages = all.map((element) => ({
      url: getComputedStyle(element).backgroundImage,
      selector: selectorFor(element),
      classes: Array.from(element.classList).slice(0, 6),
    })).filter((item) => item.url && item.url !== 'none');

    const interactives = Array.from(document.querySelectorAll('a, button, [role="button"], input, textarea, select, [onclick], .elementor-button, [data-dce-visibility-click]'))
      .filter(visible)
      .map((element) => ({
        selector: selectorFor(element),
        tag: element.tagName.toLowerCase(),
        text: element.innerText.replace(/\\s+/g, ' ').trim().slice(0, 160),
        href: element.href || null,
        ariaLabel: element.getAttribute('aria-label'),
        role: element.getAttribute('role'),
        rect: rectFor(element),
        styles: styleSubset(element),
      }));

    const fixed = all.filter(visible).filter((element) => {
      const position = getComputedStyle(element).position;
      return position === 'fixed' || position === 'sticky';
    }).slice(0, 40).map((element) => ({
      selector: selectorFor(element),
      text: element.innerText.replace(/\\s+/g, ' ').trim().slice(0, 180),
      rect: rectFor(element),
      styles: styleSubset(element),
    }));

    const meta = {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content || '',
      ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
      viewport: document.querySelector('meta[name="viewport"]')?.content || '',
      bodyClasses: Array.from(document.body.classList),
      htmlClasses: Array.from(document.documentElement.classList),
      hasLenis: document.documentElement.classList.contains('lenis') || Boolean(document.querySelector('.lenis')),
      scrollHeight: document.documentElement.scrollHeight,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      afterOpen,
    };

    const favicons = Array.from(document.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]')).map((link) => ({
      rel: link.rel,
      href: link.href,
      sizes: link.sizes?.toString() || '',
      type: link.type || '',
    }));

    const styleSheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((link) => ({
      id: link.id,
      href: link.href,
    }));

    const inlineSvgs = Array.from(document.querySelectorAll('svg')).slice(0, 80).map((svg, index) => ({
      index,
      selector: selectorFor(svg),
      classes: Array.from(svg.classList),
      width: svg.getAttribute('width'),
      height: svg.getAttribute('height'),
      viewBox: svg.getAttribute('viewBox'),
      outerHTML: svg.outerHTML.slice(0, 4000),
    }));

    return {
      meta,
      colors: Array.from(colors.entries()).sort((a, b) => b[1] - a[1]).slice(0, 80),
      fonts: Array.from(fonts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 80),
      assets: { images, videos, backgroundImages, favicons, inlineSvgs, styleSheets },
      fixed,
      interactives,
      sections,
      panels,
      sectionDetails,
      textContent: document.body.innerText.replace(/\\n{3,}/g, '\\n\\n').trim(),
    };
  })()`;
}

function makeScrollSweepExpression() {
  return `new Promise(async (resolve) => {
    const samples = [];
    const selectors = ['#section-cover', '[data-id="6849594c"]', '[data-id="565386fd"]', '.elementor-location-footer', '.dce-visibility-event'];
    const styleSubset = (element) => {
      if (!element) return null;
      const cs = getComputedStyle(element);
      return {
        display: cs.display,
        position: cs.position,
        opacity: cs.opacity,
        transform: cs.transform,
        backgroundColor: cs.backgroundColor,
        backgroundImage: cs.backgroundImage,
        boxShadow: cs.boxShadow,
        filter: cs.filter,
        visibility: cs.visibility,
      };
    };
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const steps = Array.from(new Set([0, 80, 180, 360, Math.round(maxY * 0.2), Math.round(maxY * 0.4), Math.round(maxY * 0.6), Math.round(maxY * 0.8), maxY])).filter((value) => value >= 0);
    for (const y of steps) {
      window.scrollTo(0, y);
      await new Promise((done) => setTimeout(done, 260));
      samples.push({
        scrollY: Math.round(window.scrollY),
        activeText: document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)?.innerText?.replace(/\\s+/g, ' ').trim().slice(0, 240) || '',
        styles: Object.fromEntries(selectors.map((selector) => [selector, styleSubset(document.querySelector(selector))])),
      });
    }
    window.scrollTo(0, 0);
    resolve(samples);
  })`;
}

async function clickOpenIfPresent(cdp, sessionId) {
  return runtimeEval(
    cdp,
    sessionId,
    `new Promise((resolve) => {
      let attempts = 0;
      const findOpen = () => {
        const candidates = Array.from(document.querySelectorAll('a, button, [role="button"], .elementor-button, #tombol-buka'));
        return candidates.find((element) => {
          const text = element.innerText?.replace(/\\s+/g, ' ').trim().toLowerCase() || '';
          return element.id === 'tombol-buka' || text.includes('open') || text.includes('buka') || text.includes('invitation');
        });
      };
      const tick = () => {
        const open = findOpen();
        attempts += 1;
        if (!open && attempts < 25) {
          setTimeout(tick, 160);
          return;
        }
        if (!open) {
          resolve({ clicked: false });
          return;
        }
        open.scrollIntoView({ block: 'center' });
        open.click();
        setTimeout(() => resolve({
          clicked: true,
          selector: open.id ? '#' + open.id : open.className,
          text: open.innerText?.replace(/\\s+/g, ' ').trim() || '',
          scrollHeight: document.documentElement.scrollHeight,
        }), 900);
      };
      tick();
    })`,
  );
}

async function inspectViewport(cdp, sessionId, viewport) {
  await cdp.send(
    "Emulation.setDeviceMetricsOverride",
    {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.deviceScaleFactor,
      mobile: viewport.mobile,
    },
    sessionId,
  );
  await cdp.send("Page.navigate", { url: targetUrl }, sessionId);
  await waitForReady(cdp, sessionId);
  await runtimeEval(cdp, sessionId, "window.scrollTo(0, 0);");
  await delay(300);

  const before = await runtimeEval(cdp, sessionId, makeInspectExpression({ afterOpen: false }));
  await writeFile(
    path.join(outRoot, `docs/research/${outputPrefix}-${viewport.name}-before-open.json`),
    JSON.stringify(before, null, 2),
  );

  const metricsBefore = await cdp.send("Page.getLayoutMetrics", {}, sessionId);
  const beforeShot = await cdp.send(
    "Page.captureScreenshot",
    {
      format: "png",
      captureBeyondViewport: true,
      fromSurface: true,
      clip: {
        x: 0,
        y: 0,
        width: Math.ceil(metricsBefore.cssContentSize.width),
        height: Math.min(Math.ceil(metricsBefore.cssContentSize.height), 26000),
        scale: 1,
      },
    },
    sessionId,
  );
  await writeFile(
    path.join(outRoot, `docs/design-references/${outputPrefix}-${viewport.name}-before-open.png`),
    Buffer.from(beforeShot.data, "base64"),
  );

  const openResult = await clickOpenIfPresent(cdp, sessionId);
  await delay(1000);
  await runtimeEval(cdp, sessionId, "window.scrollTo(0, 0);");
  await delay(600);
  const after = await runtimeEval(cdp, sessionId, makeInspectExpression({ afterOpen: true }));
  const scrollSweep = await runtimeEval(cdp, sessionId, makeScrollSweepExpression());
  await writeFile(
    path.join(outRoot, `docs/research/${outputPrefix}-${viewport.name}-after-open.json`),
    JSON.stringify({ openResult, ...after, scrollSweep }, null, 2),
  );

  const metricsAfter = await cdp.send("Page.getLayoutMetrics", {}, sessionId);
  const afterShot = await cdp.send(
    "Page.captureScreenshot",
    {
      format: "png",
      captureBeyondViewport: true,
      fromSurface: true,
      clip: {
        x: 0,
        y: 0,
        width: Math.ceil(metricsAfter.cssContentSize.width),
        height: Math.min(Math.ceil(metricsAfter.cssContentSize.height), 32000),
        scale: 1,
      },
    },
    sessionId,
  );
  await writeFile(
    path.join(outRoot, `docs/design-references/${outputPrefix}-${viewport.name}-after-open.png`),
    Buffer.from(afterShot.data, "base64"),
  );

  const cropTargets = after.panels?.length ? after.panels : after.sections;
  for (const [index, section] of cropTargets.slice(0, 18).entries()) {
    const safeId = section.id || section.dataId || `section-${index + 1}`;
    const clip = {
      x: Math.max(0, section.rect.x),
      y: Math.max(0, section.rect.y),
      width: Math.max(1, Math.min(section.rect.width, metricsAfter.cssContentSize.width)),
      height: Math.max(1, Math.min(section.rect.height, 2200)),
      scale: 1,
    };
    try {
      const sectionShot = await cdp.send(
        "Page.captureScreenshot",
        { format: "png", captureBeyondViewport: true, fromSurface: true, clip },
        sessionId,
      );
      await writeFile(
        path.join(outRoot, `docs/design-references/${outputPrefix}-${viewport.name}-${String(index + 1).padStart(2, "0")}-${safeId}.png`),
        Buffer.from(sectionShot.data, "base64"),
      );
    } catch {
      // Some enormous transformed Elementor sections produce invalid clips; the JSON still records them.
    }
  }
}

await ensureDirs();
const port = await getFreePort();
const userDataDir = await mkdtemp(path.join(tmpdir(), "codex-chrome-"));
const chrome = spawn(chromePath, [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${userDataDir}`,
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--no-first-run",
  "--no-default-browser-check",
  "about:blank",
], { stdio: "ignore" });

try {
  const version = await fetchJson(`http://127.0.0.1:${port}/json/version`);
  const cdp = new Cdp(version.webSocketDebuggerUrl);
  await cdp.connect();
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  await cdp.send("Page.enable", {}, sessionId);
  await cdp.send("Runtime.enable", {}, sessionId);
  await cdp.send("Network.enable", {}, sessionId);

  for (const viewport of viewports) {
    await inspectViewport(cdp, sessionId, viewport);
  }

  await cdp.close();
} finally {
  chrome.kill("SIGTERM");
  await new Promise((resolve) => chrome.once("exit", resolve));
  await rm(userDataDir, { recursive: true, force: true }).catch(() => undefined);
}
