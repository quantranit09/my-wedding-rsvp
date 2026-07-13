import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const targetUrl = process.argv[2] ?? "http://localhost:3000";
const outRoot = process.cwd();
const chromePath =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("Unable to allocate debug port"));
        return;
      }
      server.close(() => resolve(address.port));
    });
    server.on("error", reject);
  });
}

async function fetchJson(url, tries = 80) {
  let lastError;
  for (let index = 0; index < tries; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
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
          const pending = this.pending.get(message.id);
          this.pending.delete(message.id);
          if (message.error) {
            pending.reject(new Error(`${message.error.message}: ${message.error.data ?? ""}`));
          } else {
            pending.resolve(message.result);
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

  close() {
    this.ws.close();
  }
}

async function evalPage(cdp, sessionId, expression, step) {
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
    const details = result.exceptionDetails;
    throw new Error(`${step}: ${details.exception?.description ?? details.text ?? "Runtime evaluation failed"}`);
  }
  return result.result.value;
}

async function waitForReady(cdp, sessionId) {
  await evalPage(
    cdp,
    sessionId,
    `new Promise((resolve) => {
      const finish = () => {
        Promise.allSettled(Array.from(document.images).map((img) => {
          if (img.complete) return true;
          return new Promise((done) => {
            img.addEventListener("load", done, { once: true });
            img.addEventListener("error", done, { once: true });
          });
        })).then(() => document.fonts.ready).then(() => setTimeout(resolve, 500));
      };
      if (document.readyState === "complete") finish();
      else window.addEventListener("load", finish, { once: true });
    })`,
    "wait for ready",
  );
}

async function screenshot(cdp, sessionId, fileName) {
  const shot = await cdp.send("Page.captureScreenshot", { format: "png", fromSurface: true }, sessionId);
  await writeFile(path.join(outRoot, "docs/design-references", fileName), Buffer.from(shot.data, "base64"));
}

async function elementRect(cdp, sessionId, finder, step) {
  return evalPage(
    cdp,
    sessionId,
    `(() => {
      const el = (${finder})();
      if (!el) return null;
      const previous = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      el.scrollIntoView({ block: "center", inline: "center", behavior: "instant" });
      document.documentElement.style.scrollBehavior = previous;
      return new Promise((resolve) => {
        setTimeout(() => {
          const rect = el.getBoundingClientRect();
          resolve({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            width: rect.width,
            height: rect.height,
            text: el.innerText || el.getAttribute("aria-label") || "",
          });
        }, 80);
      });
    })()`,
    step,
  );
}

async function realClick(cdp, sessionId, finder, step) {
  const rect = await elementRect(cdp, sessionId, finder, step);
  if (!rect) throw new Error(`${step}: element not found`);
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: rect.x, y: rect.y, button: "none" }, sessionId);
  await cdp.send(
    "Input.dispatchMouseEvent",
    { type: "mousePressed", x: rect.x, y: rect.y, button: "left", clickCount: 1 },
    sessionId,
  );
  await cdp.send(
    "Input.dispatchMouseEvent",
    { type: "mouseReleased", x: rect.x, y: rect.y, button: "left", clickCount: 1 },
    sessionId,
  );
  return rect;
}

async function pressEscape(cdp, sessionId) {
  await cdp.send(
    "Input.dispatchKeyEvent",
    { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 },
    sessionId,
  );
  await cdp.send(
    "Input.dispatchKeyEvent",
    { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 },
    sessionId,
  );
}

async function main() {
  await Promise.all([
    mkdir(path.join(outRoot, "docs/design-references"), { recursive: true }),
    mkdir(path.join(outRoot, "docs/research"), { recursive: true }),
  ]);

  const port = await getFreePort();
  const userDataDir = await mkdtemp(path.join(tmpdir(), "codex-clone-events-"));
  const chrome = spawn(
    chromePath,
    [
      "--headless=new",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userDataDir}`,
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--no-first-run",
      "--no-default-browser-check",
      "--autoplay-policy=no-user-gesture-required",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  let cdp;
  const qa = {};

  try {
    const version = await fetchJson(`http://127.0.0.1:${port}/json/version`);
    cdp = new Cdp(version.webSocketDebuggerUrl);
    await cdp.connect();

    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
    await cdp.send("Page.enable", {}, sessionId);
    await cdp.send("Runtime.enable", {}, sessionId);
    await cdp.send("Network.enable", {}, sessionId);
    await cdp.send(
      "Page.addScriptToEvaluateOnNewDocument",
      {
        source: `(() => {
          window.__codexConsoleErrors = [];
          const originalError = console.error;
          console.error = (...args) => {
            window.__codexConsoleErrors.push(args.map((arg) => String(arg)).join(" "));
            originalError.apply(console, args);
          };
        })();`,
      },
      sessionId,
    );
    await cdp.send(
      "Emulation.setDeviceMetricsOverride",
      { width: 390, height: 844, deviceScaleFactor: 2, mobile: true },
      sessionId,
    );

    await cdp.send("Page.navigate", { url: targetUrl }, sessionId);
    await waitForReady(cdp, sessionId);
    await delay(5800);

    await realClick(
      cdp,
      sessionId,
      `() => Array.from(document.querySelectorAll("button")).find((button) => button.textContent?.includes("LET'S OPEN"))`,
      "open invitation",
    );
    await delay(1200);

    qa.afterOpen = await evalPage(
      cdp,
      sessionId,
      `(() => ({
        opened: Boolean(document.querySelector(".invitation-page-open")),
        rootClasses: Array.from(document.documentElement.classList),
        rootSnapType: getComputedStyle(document.documentElement).scrollSnapType,
        sectionSnaps: Array.from(document.querySelectorAll("main.invitation-page-open section")).slice(0, 5).map((section) => ({
          id: section.id || null,
          snapAlign: getComputedStyle(section).scrollSnapAlign,
          snapStop: getComputedStyle(section).scrollSnapStop,
          height: Math.round(section.getBoundingClientRect().height),
        })),
        audioSrc: document.querySelector("audio")?.currentSrc || "",
        audioPaused: document.querySelector("audio")?.paused ?? null,
        musicControlPlaying: document.querySelector(".invitation-music-control")?.getAttribute("data-playing") || null,
      }))()`,
      "after open",
    );

    await realClick(cdp, sessionId, `() => document.querySelector("button[aria-label='Open menu']")`, "open menu");
    await delay(650);
    qa.menuOpen = await evalPage(
      cdp,
      sessionId,
      `(() => {
        const menu = document.querySelector("nav")?.closest("div");
        const link = document.querySelector(".invitation-menu-link");
        const after = link ? getComputedStyle(link, "::after") : null;
        return {
          visible: menu ? Number(getComputedStyle(menu).opacity) > 0.9 : false,
          rootSnapType: getComputedStyle(document.documentElement).scrollSnapType,
          rootClasses: Array.from(document.documentElement.classList),
          underlineTransition: after?.transition || "",
          underlineTransformBeforeHover: after?.transform || "",
        };
      })()`,
      "menu open",
    );

    const linkRect = await elementRect(cdp, sessionId, `() => document.querySelector(".invitation-menu-link")`, "menu hover");
    await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: linkRect.x, y: linkRect.y, button: "none" }, sessionId);
    await delay(850);
    qa.menuHover = await evalPage(
      cdp,
      sessionId,
      `(() => {
        const link = document.querySelector(".invitation-menu-link");
        const after = link ? getComputedStyle(link, "::after") : null;
        return { underlineTransformAfterHover: after?.transform || "" };
      })()`,
      "menu hover",
    );

    await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 4, y: 4, button: "none" }, sessionId);
    await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", x: 4, y: 4, button: "left", clickCount: 1 }, sessionId);
    await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: 4, y: 4, button: "left", clickCount: 1 }, sessionId);
    await delay(1150);
    qa.menuClosed = await evalPage(
      cdp,
      sessionId,
      `(() => {
        const menu = document.querySelector("nav")?.closest("div");
        return {
          visible: menu ? Number(getComputedStyle(menu).opacity) > 0.1 : false,
          rootSnapType: getComputedStyle(document.documentElement).scrollSnapType,
          rootClasses: Array.from(document.documentElement.classList),
        };
      })()`,
      "menu closed",
    );

    await evalPage(
      cdp,
      sessionId,
      `(() => {
        const button = Array.from(document.querySelectorAll("button")).find((item) => item.textContent?.trim() === "SAVE THE DATE");
        if (!button) throw new Error("Save date button missing");
        const previous = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        button.scrollIntoView({ block: "center", behavior: "instant" });
        document.documentElement.style.scrollBehavior = previous;
        button.click();
        return true;
      })()`,
      "save date",
    );
    await delay(500);
    await screenshot(cdp, sessionId, "clone-events-save-date-modal.png");
    qa.saveDate = await evalPage(
      cdp,
      sessionId,
      `(() => {
        const dialog = document.querySelector("[role='dialog']");
        return {
          visible: Boolean(dialog),
          text: (dialog?.textContent || "").slice(0, 240),
          hasDownload: Boolean(Array.from(document.querySelectorAll("button")).find((button) => button.textContent?.includes("DOWNLOAD"))),
          bodyOverflow: document.body.style.overflow,
        };
      })()`,
      "save date state",
    );
    await pressEscape(cdp, sessionId);
    await delay(350);

    qa.wishes = await evalPage(
      cdp,
      sessionId,
      `new Promise((resolve) => {
        const section = Array.from(document.querySelectorAll("section")).find((candidate) => (
          candidate.innerText.includes("Wishes") &&
          candidate.innerText.includes("NEXT") &&
          candidate.querySelector("article")
        ));
        if (!section) {
          resolve({ found: false });
          return;
        }
        const previous = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        section.scrollIntoView({ block: "center", behavior: "instant" });
        document.documentElement.style.scrollBehavior = previous;
        const before = section.querySelector("article p")?.textContent || "";
        Array.from(section.querySelectorAll("button")).find((button) => button.textContent?.trim() === "NEXT")?.click();
        setTimeout(() => {
          resolve({
            found: true,
            before,
            after: section.querySelector("article p")?.textContent || "",
            pageAnimated: Boolean(section.querySelector(".invitation-wishes-page")),
          });
        }, 850);
      })`,
      "wishes",
    );

    await evalPage(
      cdp,
      sessionId,
      `(() => {
        const section = document.querySelector("#gallery");
        if (!section) throw new Error("Gallery missing");
        const previous = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        section.scrollIntoView({ block: "center", behavior: "instant" });
        document.documentElement.style.scrollBehavior = previous;
        section.querySelector("button[aria-label^='Preview']")?.click();
        return true;
      })()`,
      "gallery open",
    );
    await evalPage(
      cdp,
      sessionId,
      `new Promise((resolve) => {
        const done = () => resolve(true);
        const img = document.querySelector("[role='dialog'] img");
        if (!img || img.complete) done();
        else {
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
          setTimeout(done, 1800);
        }
      })`,
      "gallery image load",
    );
    await delay(250);
    await screenshot(cdp, sessionId, "clone-events-gallery-lightbox.png");
    qa.galleryPreview = await evalPage(
      cdp,
      sessionId,
      `(() => {
        const img = document.querySelector("[role='dialog'] img");
        const rect = img?.getBoundingClientRect();
        return {
          dialogVisible: Boolean(document.querySelector("[role='dialog']")),
          counter: Array.from(document.querySelectorAll("[role='dialog'] p")).map((p) => p.textContent?.trim() || "").find((text) => /^[0-9]+ \\/ [0-9]+$/.test(text)) || "",
          bodyOverflow: document.body.style.overflow,
          imageLoaded: img?.complete ?? false,
          imageNaturalWidth: img?.naturalWidth ?? 0,
          imageRect: rect ? { width: Math.round(rect.width), height: Math.round(rect.height) } : null,
        };
      })()`,
      "gallery state",
    );
    await evalPage(
      cdp,
      sessionId,
      `(() => {
        document.querySelector("button[aria-label='Next preview image']")?.click();
      })()`,
      "gallery next",
    );
    await delay(350);
    qa.galleryNext = await evalPage(
      cdp,
      sessionId,
      `(() => ({
        counter: Array.from(document.querySelectorAll("[role='dialog'] p")).map((p) => p.textContent?.trim() || "").find((text) => /^[0-9]+ \\/ [0-9]+$/.test(text)) || "",
      }))()`,
      "gallery next state",
    );
    await pressEscape(cdp, sessionId);
    await delay(350);

    await evalPage(
      cdp,
      sessionId,
      `(() => {
        const button = Array.from(document.querySelectorAll("button")).find((item) => item.innerText?.includes("Play Video"));
        if (!button) throw new Error("Video button missing");
        const previous = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        button.scrollIntoView({ block: "center", behavior: "instant" });
        document.documentElement.style.scrollBehavior = previous;
        button.click();
        return true;
      })()`,
      "video open",
    );
    await delay(800);
    await screenshot(cdp, sessionId, "clone-events-video-preview.png");
    qa.videoPreview = await evalPage(
      cdp,
      sessionId,
      `(() => ({
        dialogVisible: Boolean(document.querySelector("[role='dialog'] iframe")),
        iframeSrc: document.querySelector("[role='dialog'] iframe")?.src || "",
        bodyOverflow: document.body.style.overflow,
        audioPausedWhileVideoOpen: document.querySelector("audio")?.paused ?? null,
        musicControlPlayingWhileVideoOpen: document.querySelector(".invitation-music-control")?.getAttribute("data-playing") || null,
      }))()`,
      "video state",
    );
    await pressEscape(cdp, sessionId);
    await delay(800);
    qa.videoClosed = await evalPage(
      cdp,
      sessionId,
      `(() => ({
        dialogVisible: Boolean(document.querySelector("[role='dialog'] iframe")),
        audioPausedAfterVideoClose: document.querySelector("audio")?.paused ?? null,
        musicControlPlayingAfterVideoClose: document.querySelector(".invitation-music-control")?.getAttribute("data-playing") || null,
      }))()`,
      "video closed",
    );

    qa.consoleErrors = await evalPage(cdp, sessionId, "window.__codexConsoleErrors || []", "console errors");
    qa.runtimeErrors = cdp.events
      .filter((event) => event.method === "Runtime.exceptionThrown")
      .map((event) => event.params?.exceptionDetails?.text || event.params?.exceptionDetails?.exception?.description || "Runtime exception");

    qa.assertions = {
      opened: qa.afterOpen.opened === true,
      scrollSnap: qa.afterOpen.rootSnapType === "y mandatory" && qa.afterOpen.sectionSnaps.every((item) => item.snapAlign === "start"),
      musicStarted: qa.afterOpen.audioPaused === false && qa.afterOpen.musicControlPlaying === "true",
      menuSnapDisabled: qa.menuOpen.rootSnapType === "none",
      menuHoverUnderline: qa.menuHover.underlineTransformAfterHover !== qa.menuOpen.underlineTransformBeforeHover,
      menuOutsideClose: qa.menuClosed.visible === false && qa.menuClosed.rootSnapType === "y mandatory",
      saveDateOverlay: qa.saveDate.visible === true && qa.saveDate.hasDownload === true && qa.saveDate.bodyOverflow === "hidden",
      wishesPagination: qa.wishes.found === true && qa.wishes.before && qa.wishes.after && qa.wishes.before !== qa.wishes.after,
      galleryPreview: qa.galleryPreview.dialogVisible === true && qa.galleryPreview.imageLoaded === true && qa.galleryPreview.imageNaturalWidth > 0,
      galleryNext: qa.galleryPreview.counter !== qa.galleryNext.counter,
      videoPreview: qa.videoPreview.dialogVisible === true && qa.videoPreview.audioPausedWhileVideoOpen === true,
      videoResume: qa.videoClosed.dialogVisible === false && qa.videoClosed.audioPausedAfterVideoClose === false,
      cleanConsole: qa.consoleErrors.length === 0 && qa.runtimeErrors.length === 0,
    };
    qa.passed = Object.values(qa.assertions).every(Boolean);
  } finally {
    await writeFile(path.join(outRoot, "docs/research/clone-events-qa.json"), JSON.stringify(qa, null, 2));
    cdp?.close();
    chrome.kill("SIGTERM");
    await new Promise((resolve) => chrome.once("exit", resolve));
    await rm(userDataDir, { recursive: true, force: true }).catch(() => undefined);
  }

  console.log(JSON.stringify(qa, null, 2));
  if (!qa.passed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
