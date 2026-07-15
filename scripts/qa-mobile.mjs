#!/usr/bin/env node

import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { chromium, devices, firefox, webkit } from "playwright";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const browserTypes = { chromium, firefox, webkit };

function parseArgs(argv) {
  const config = {
    artifactsDir: path.join(projectRoot, ".qa-artifacts", "mobile"),
    browser: "webkit",
    device: "iPhone 13",
    headed: false,
    port: 3210,
    slowMo: 0,
    timeoutMs: 45_000,
    url: "",
  };

  for (const arg of argv) {
    if (arg === "--headed") {
      config.headed = true;
      continue;
    }
    if (arg.startsWith("--url=")) {
      config.url = arg.slice("--url=".length);
      continue;
    }
    if (arg.startsWith("--port=")) {
      config.port = Number(arg.slice("--port=".length));
      continue;
    }
    if (arg.startsWith("--browser=")) {
      config.browser = arg.slice("--browser=".length);
      continue;
    }
    if (arg.startsWith("--device=")) {
      config.device = arg.slice("--device=".length);
      continue;
    }
    if (arg.startsWith("--slow-mo=")) {
      config.slowMo = Number(arg.slice("--slow-mo=".length));
      continue;
    }
    if (arg.startsWith("--artifacts=")) {
      config.artifactsDir = path.resolve(projectRoot, arg.slice("--artifacts=".length));
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!browserTypes[config.browser]) {
    throw new Error(`Unsupported browser "${config.browser}". Use webkit, chromium, or firefox.`);
  }
  if (!devices[config.device]) {
    throw new Error(`Unsupported device "${config.device}". Check Playwright devices list.`);
  }
  if (!Number.isFinite(config.port) || config.port < 1) {
    throw new Error(`Invalid port: ${config.port}`);
  }
  if (!Number.isFinite(config.slowMo) || config.slowMo < 0) {
    throw new Error(`Invalid slow-mo: ${config.slowMo}`);
  }

  return config;
}

function printHelp() {
  console.log(`Mobile QA automation

Usage:
  npm run qa:mobile
  npm run qa:mobile -- --headed
  npm run qa:mobile -- --url=http://localhost:3000
  npm run qa:mobile -- --browser=chromium --device="iPhone 14"

Options:
  --url=URL          Use an already running app. If omitted, starts Next dev on --port.
  --port=PORT       Dev server port when --url is omitted. Default: 3210.
  --browser=NAME    webkit, chromium, or firefox. Default: webkit.
  --device=NAME     Playwright device profile. Default: iPhone 13.
  --headed          Show the browser window.
  --slow-mo=MS      Slow down browser actions.
  --artifacts=DIR   Screenshot output directory. Default: .qa-artifacts/mobile.
`);
}

function log(message) {
  console.log(`[mobile-qa] ${message}`);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForHttp(url, timeoutMs) {
  const startedAt = Date.now();
  let lastError = null;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (response.ok || response.status === 404 || response.status === 405) {
        return;
      }
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await wait(350);
  }

  throw new Error(`Timed out waiting for ${url}: ${lastError?.message ?? "no response"}`);
}

async function detectExistingInvitationServer() {
  const url = "http://localhost:3000/";

  try {
    const response = await fetch(url);
    if (!response.ok) return "";

    const html = await response.text();
    return html.includes("The Wedding of") || html.includes("Wedding Gift") ? url : "";
  } catch {
    return "";
  }
}

function startDevServer(port) {
  const child = spawn("npm", ["run", "dev", "--", "--port", String(port)], {
    cwd: projectRoot,
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: "1",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.stdout.on("data", (chunk) => {
    const text = chunk.toString().trim();
    if (text) log(`server: ${text}`);
  });
  child.stderr.on("data", (chunk) => {
    const text = chunk.toString().trim();
    if (text && !text.includes("Next.js inferred your workspace root")) {
      log(`server: ${text}`);
    }
  });

  return child;
}

async function withStep(name, fn) {
  log(`START ${name}`);
  await fn();
  log(`PASS  ${name}`);
}

async function tapLocator(page, locator, label) {
  await locator.waitFor({ state: "visible", timeout: 10_000 });
  const box = await locator.boundingBox();
  assert(box, `${label} has no bounding box`);
  await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
}

async function screenshot(page, artifactsDir, name) {
  await page.screenshot({
    animations: "disabled",
    path: path.join(artifactsDir, `${name}.png`),
  });
}

async function getScrollState(page) {
  return page.evaluate(() => ({
    hash: window.location.hash,
    scrollY: Math.round(window.scrollY),
  }));
}

async function runMobileQa(config) {
  await mkdir(config.artifactsDir, { recursive: true });

  let baseUrl = config.url;
  let server = null;

  if (!baseUrl) {
    const existingUrl = await detectExistingInvitationServer();

    if (existingUrl) {
      baseUrl = existingUrl;
      log(`using existing dev server at ${baseUrl}`);
    } else {
      baseUrl = `http://localhost:${config.port}`;
      server = startDevServer(config.port);
    }
  }

  const appUrl = new URL("/", baseUrl).toString();

  try {
    await waitForHttp(appUrl, config.timeoutMs);

    const browserType = browserTypes[config.browser];
    const browser = await browserType.launch({
      headless: !config.headed,
      slowMo: config.slowMo,
    });

    try {
      const consoleIssues = [];
      const context = await browser.newContext({
        ...devices[config.device],
        locale: "vi-VN",
        timezoneId: "Asia/Ho_Chi_Minh",
      });
      context.setDefaultTimeout(10_000);

      const page = await context.newPage();
      page.on("console", (message) => {
        if (message.type() === "error") {
          consoleIssues.push(`console error: ${message.text()}`);
        }
      });
      page.on("pageerror", (error) => {
        consoleIssues.push(`page error: ${error.message}`);
      });

      await withStep("load invitation and finish preloader", async () => {
        await page.goto(appUrl, { waitUntil: "domcontentloaded" });
        await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
        await page.locator(".invitation-preloader").waitFor({ state: "detached", timeout: 9_000 });
        await page.locator(".invitation-open-button").waitFor({ state: "visible" });
        await screenshot(page, config.artifactsDir, "01-cover");
      });

      await withStep("open invitation without iOS ghost click or hash jump", async () => {
        await tapLocator(page, page.locator(".invitation-open-button"), "open button");
        await page.locator(".invitation-page-open").waitFor({ state: "attached" });
        await page.waitForTimeout(320);

        const earlyCue = await page.evaluate(() => {
          const cue = document.querySelector(".invitation-open-scroll-cue");
          const rect = cue?.getBoundingClientRect();
          return {
            disabled: cue?.getAttribute("aria-disabled") ?? "",
            hash: window.location.hash,
            pointerEvents: cue ? getComputedStyle(cue).pointerEvents : "",
            rect: rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : null,
            scrollY: Math.round(window.scrollY),
          };
        });

        assert(earlyCue.disabled === "true", "scroll cue should be disabled during opening transition");
        assert(earlyCue.pointerEvents === "none", "scroll cue should ignore touch during opening transition");
        assert(earlyCue.hash === "", "opening should not leave a URL hash");
        assert(earlyCue.scrollY === 0, "opening should keep scrollY at 0");

        if (earlyCue.rect) {
          await page.touchscreen.tap(earlyCue.rect.x, earlyCue.rect.y);
          await page.waitForTimeout(350);
          const state = await getScrollState(page);
          assert(state.hash === "", "disabled scroll cue should not change hash");
          assert(state.scrollY === 0, "disabled scroll cue should not move the page");
        }

        await page.waitForFunction(() => {
          const cue = document.querySelector(".invitation-open-scroll-cue");
          return cue && !cue.hasAttribute("aria-disabled") && getComputedStyle(cue).pointerEvents !== "none";
        });

        await screenshot(page, config.artifactsDir, "02-opened-home");
      });

      await withStep("scroll cue moves to quote smoothly without hash", async () => {
        await tapLocator(page, page.locator(".invitation-open-scroll-cue"), "scroll cue");
        await page.waitForTimeout(1_150);

        const result = await page.evaluate(() => ({
          hash: window.location.hash,
          quoteTop: Math.round(document.getElementById("quote")?.getBoundingClientRect().top ?? 9999),
          scrollY: Math.round(window.scrollY),
        }));

        assert(result.hash === "", "scroll cue should not add a URL hash");
        assert(Math.abs(result.quoteTop) <= 3, `quote section should align to top, got ${result.quoteTop}`);
        assert(result.scrollY > 0, "scroll cue should move page down");
        await screenshot(page, config.artifactsDir, "03-quote");
      });

      await withStep("RSVP mobile input flow keeps section stable", async () => {
        await page.locator("#rsvp").scrollIntoViewIfNeeded();
        await page.waitForTimeout(450);
        const rsvpTop = await page.evaluate(() => Math.round(document.getElementById("rsvp")?.getBoundingClientRect().top ?? 9999));
        assert(Math.abs(rsvpTop) <= 3, `RSVP section should align to top before input, got ${rsvpTop}`);

        const nameInput = page.locator(".invitation-rsvp-form input").first();
        await nameInput.tap();
        await nameInput.fill("Mobile QA");
        await page.keyboard.press("Enter");
        await page.locator('[aria-label="RSVP step 2"][aria-current="step"]').waitFor();

        const afterName = await page.evaluate(() => ({
          focusedLock: document.documentElement.classList.contains("invitation-root-form-focused"),
          rsvpTop: Math.round(document.getElementById("rsvp")?.getBoundingClientRect().top ?? 9999),
        }));
        assert(afterName.focusedLock, "RSVP focus lock should be active after mobile input");
        assert(Math.abs(afterName.rsvpTop) <= 16, `RSVP should not jump away after Enter, got ${afterName.rsvpTop}`);

        const attendButton = page.locator(".invitation-rsvp-form button[aria-pressed]").first();
        await tapLocator(page, attendButton, "attendance option");
        await tapLocator(page, attendButton, "attendance option double tap");
        await page.locator('[aria-label="RSVP step 3"][aria-current="step"]').waitFor();

        const guestInput = page.locator('.invitation-rsvp-form input[type="number"]');
        await guestInput.tap();
        await guestInput.fill("2");

        const moveResult = await page.evaluate(() => {
          const form = document.querySelector(".invitation-rsvp-form");
          if (!form) return { delta: 0, kind: "missing-form", prevented: false };

          const before = window.scrollY;
          let prevented = false;
          let kind = "wheel";

          if (typeof TouchEvent === "function") {
            try {
              const event = new TouchEvent("touchmove", {
                bubbles: true,
                cancelable: true,
              });

              kind = "touchmove";
              prevented = !form.dispatchEvent(event);
            } catch {
              const event = new Event("touchmove", {
                bubbles: true,
                cancelable: true,
              });

              kind = "touchmove";
              prevented = !form.dispatchEvent(event);
            }
          } else {
            const event = new WheelEvent("wheel", {
              bubbles: true,
              cancelable: true,
              deltaY: 260,
            });

            prevented = !form.dispatchEvent(event);
          }

          return {
            delta: Math.round(window.scrollY - before),
            kind,
            prevented,
          };
        });

        assert(moveResult.prevented, `${moveResult.kind} should be prevented while RSVP input is focused`);
        assert(
          Math.abs(moveResult.delta) <= 2,
          `focused RSVP input should not scroll to another section, delta=${moveResult.delta}`,
        );

        await page.keyboard.press("Enter");
        await page.locator('[aria-label="RSVP step 4"][aria-current="step"]').waitFor();
        await screenshot(page, config.artifactsDir, "04-rsvp");
      });

      await withStep("gift QR preview opens and download endpoint works", async () => {
        await page.locator("#weddinggift").scrollIntoViewIfNeeded();
        await page.waitForTimeout(450);
        await tapLocator(page, page.locator('button[aria-label^="Preview QR"]').first(), "gift QR preview");
        await page.locator('[role="dialog"]').waitFor({ state: "visible" });

        const modalState = await page.evaluate(() => {
          const dialog = document.querySelector('[role="dialog"]');
          const download = dialog?.querySelector("a[download]");
          return {
            bodyOverflow: document.body.style.overflow,
            downloadHref: download?.getAttribute("href") ?? "",
            previewClass: document.documentElement.classList.contains("invitation-preview-open"),
            title: document.getElementById("gift-qr-preview-title")?.textContent ?? "",
          };
        });

        assert(modalState.previewClass, "QR preview should set preview-open class");
        assert(modalState.bodyOverflow === "hidden", "QR preview should lock body scroll");
        assert(modalState.downloadHref.startsWith("/api/gift-qr"), "QR preview should expose download link");
        assert(modalState.title.length > 0, "QR preview should show account owner");

        const response = await page.request.get(new URL(modalState.downloadHref, appUrl).toString());
        assert(response.ok(), `QR download endpoint failed with ${response.status()}`);
        assert(
          (response.headers()["content-disposition"] ?? "").includes("attachment"),
          "QR download endpoint should return attachment disposition",
        );
        assert(
          (response.headers()["content-type"] ?? "").includes("image/"),
          "QR download endpoint should return image content type",
        );

        await screenshot(page, config.artifactsDir, "05-gift-qr-preview");
        await page.keyboard.press("Escape");
        await page.locator('[role="dialog"]').waitFor({ state: "detached" });
      });

      await withStep("gallery preview opens and closes on mobile", async () => {
        await page.locator("#gallery").scrollIntoViewIfNeeded();
        await page.waitForTimeout(450);
        await tapLocator(page, page.locator('#gallery button[aria-label^="Preview "]').first(), "gallery preview");
        await page.locator('[role="dialog"]').waitFor({ state: "visible" });
        await screenshot(page, config.artifactsDir, "06-gallery-preview");
        await page.locator('button[aria-label="Close preview"]').click();
        await page.locator('[role="dialog"]').waitFor({ state: "detached" });
      });

      assert(consoleIssues.length === 0, `Browser errors found:\n${consoleIssues.join("\n")}`);
      log(`Artifacts written to ${path.relative(projectRoot, config.artifactsDir)}`);
    } finally {
      await browser.close();
    }
  } catch (error) {
    if (String(error?.message ?? error).includes("Executable doesn't exist")) {
      throw new Error(`${error.message}\nInstall the simulator browser with: npx playwright install ${config.browser}`);
    }
    throw error;
  } finally {
    if (server) {
      server.kill("SIGTERM");
    }
  }
}

const config = parseArgs(process.argv.slice(2));

runMobileQa(config)
  .then(() => {
    log("Mobile QA passed.");
  })
  .catch((error) => {
    console.error(`\n[mobile-qa] FAILED: ${error.message}`);
    process.exit(1);
  });
