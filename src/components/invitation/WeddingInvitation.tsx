"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { PauseIcon, PlayIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

import {
  BrideProfileSection,
  ClosingSection,
  CountdownSection,
  DesktopFixedPanel,
  DressCodeSection,
  GallerySection,
  GiftSection,
  GroomProfileSection,
  LoveStorySection,
  OpeningHero,
  Preloader,
  RsvpSection,
  ScriptureQuoteSection,
  SideMenu,
  StreamingSection,
  WeddingDateSection,
  WishesSection,
} from "./InvitationSections";
import { backgroundMusicSrc } from "./content";

const preloaderProgressMs = 4000;
const preloaderFadeStartMs = 4500;
const preloaderDoneMs = 5500;

export function WeddingInvitation() {
  const [loading, setLoading] = useState(true);
  const [preloaderHiding, setPreloaderHiding] = useState(false);
  const [percent, setPercent] = useState(1);
  const [opened, setOpened] = useState(false);
  const [coverLeaving, setCoverLeaving] = useState(false);
  const [scrollCueReady, setScrollCueReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryPreviewOpen, setGalleryPreviewOpen] = useState(false);
  const [snapSuppressed, setSnapSuppressed] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [debugEnabled, setDebugEnabled] = useState(false);
  const [debugLines, setDebugLines] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const invitationRef = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<number | null>(null);
  const openInvitationRef = useRef<() => void>(() => {});
  const snapRestoreTimerRef = useRef<number | null>(null);
  const stableViewportHeightRef = useRef<number | null>(null);
  const debugEnabledRef = useRef(false);
  const debugSequenceRef = useRef(0);

  const appendDebugLine = useCallback((message: string) => {
    if (!debugEnabledRef.current) return;

    const sequence = debugSequenceRef.current + 1;
    debugSequenceRef.current = sequence;
    const timestamp = new Date().toLocaleTimeString("vi-VN", { hour12: false });

    setDebugLines((current) => [...current, `${sequence} ${timestamp} ${message}`].slice(-36));
  }, []);

  useEffect(() => {
    const enabled = new URLSearchParams(window.location.search).has("debug");

    debugEnabledRef.current = enabled;
    const setupTimer = window.setTimeout(() => {
      setDebugEnabled(enabled);

      if (!enabled) return;

      const viewport = window.visualViewport;
      setDebugLines([
        `debug:on ua=${window.navigator.userAgent}`,
        `viewport inner=${window.innerWidth}x${window.innerHeight} visual=${Math.round(viewport?.width ?? 0)}x${Math.round(viewport?.height ?? 0)} dpr=${window.devicePixelRatio}`,
      ]);
    }, 0);

    return () => {
      window.clearTimeout(setupTimer);
    };
  }, []);

  useEffect(() => {
    debugEnabledRef.current = debugEnabled;
  }, [debugEnabled]);

  useEffect(() => {
    if (!debugEnabled) return;

    const describeEventTarget = (target: EventTarget | null) => {
      return target instanceof Element ? describeDebugElement(target) : "non-element";
    };

    const getEventPoint = (event: Event) => {
      if ("changedTouches" in event) {
        const touch = (event as TouchEvent).changedTouches.item(0);
        return touch ? { x: touch.clientX, y: touch.clientY } : null;
      }

      if (event instanceof MouseEvent) {
        return { x: event.clientX, y: event.clientY };
      }

      return null;
    };

    const recordDomEvent = (event: Event) => {
      const point = getEventPoint(event);
      const button = document.querySelector<HTMLElement>(".invitation-open-button");
      const rect = button?.getBoundingClientRect();
      const hitElement = point ? document.elementFromPoint(point.x, point.y) : null;
      const insideButton = Boolean(
        point &&
          rect &&
          point.x >= rect.left &&
          point.x <= rect.right &&
          point.y >= rect.top &&
          point.y <= rect.bottom,
      );
      const pointText = point ? `${Math.round(point.x)},${Math.round(point.y)}` : "none";
      const buttonText = rect
        ? `${Math.round(rect.left)},${Math.round(rect.top)},${Math.round(rect.width)}x${Math.round(rect.height)}`
        : "none";

      appendDebugLine(
        `[event:${event.type}] target=${describeEventTarget(event.target)} hit=${describeDebugElement(hitElement)} point=${pointText} btn=${buttonText} inBtn=${insideButton}`,
      );
    };

    const recordError = (event: ErrorEvent) => {
      appendDebugLine(`[error] ${event.message} ${event.filename}:${event.lineno}:${event.colno}`);
    };

    const recordRejection = (event: PromiseRejectionEvent) => {
      appendDebugLine(`[unhandled] ${String(event.reason)}`);
    };

    const recordCustomDebug = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      appendDebugLine(`[custom] ${String(detail)}`);
    };

    const touchOptions: AddEventListenerOptions = { capture: true, passive: true };

    document.addEventListener("touchstart", recordDomEvent, touchOptions);
    document.addEventListener("touchend", recordDomEvent, touchOptions);
    document.addEventListener("pointerup", recordDomEvent, true);
    document.addEventListener("click", recordDomEvent, true);
    window.addEventListener("error", recordError);
    window.addEventListener("unhandledrejection", recordRejection);
    window.addEventListener("invitation-debug", recordCustomDebug);

    appendDebugLine("[debug] listeners attached");

    return () => {
      document.removeEventListener("touchstart", recordDomEvent, touchOptions);
      document.removeEventListener("touchend", recordDomEvent, touchOptions);
      document.removeEventListener("pointerup", recordDomEvent, true);
      document.removeEventListener("click", recordDomEvent, true);
      window.removeEventListener("error", recordError);
      window.removeEventListener("unhandledrejection", recordRejection);
      window.removeEventListener("invitation-debug", recordCustomDebug);
    };
  }, [appendDebugLine, debugEnabled]);

  useEffect(() => {
    appendDebugLine(
      `[state] loading=${loading} opened=${opened} leaving=${coverLeaving} hash=${window.location.hash || "none"} y=${Math.round(window.scrollY)}`,
    );
  }, [appendDebugLine, coverLeaving, loading, opened]);

  useEffect(() => {
    const root = document.documentElement;

    const syncViewportHeight = () => {
      const layoutHeight = window.innerHeight;
      const visualViewport = window.visualViewport;
      const visualHeight = visualViewport?.height ?? layoutHeight;
      const activeElement = document.activeElement;
      const fieldFocused =
        activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement;
      const keyboardLikelyOpen = Boolean(fieldFocused && visualViewport && visualHeight < layoutHeight - 80);

      if (!keyboardLikelyOpen) {
        stableViewportHeightRef.current = visualHeight;
      }

      const viewportHeight = keyboardLikelyOpen
        ? stableViewportHeightRef.current ?? layoutHeight
        : visualHeight;

      root.style.setProperty("--invitation-viewport-height", `${viewportHeight}px`);
    };

    syncViewportHeight();
    window.addEventListener("resize", syncViewportHeight);
    window.addEventListener("orientationchange", syncViewportHeight);
    window.visualViewport?.addEventListener("resize", syncViewportHeight);
    window.visualViewport?.addEventListener("scroll", syncViewportHeight);

    return () => {
      root.style.removeProperty("--invitation-viewport-height");
      window.removeEventListener("resize", syncViewportHeight);
      window.removeEventListener("orientationchange", syncViewportHeight);
      window.visualViewport?.removeEventListener("resize", syncViewportHeight);
      window.visualViewport?.removeEventListener("scroll", syncViewportHeight);
    };
  }, []);

  useEffect(() => {
    const startedAt = window.performance.now();
    let frame = 0;

    const updateProgress = (now = window.performance.now()) => {
      const elapsed = now - startedAt;
      const nextPercent = Math.max(1, Math.min(100, Math.floor((elapsed / preloaderProgressMs) * 100)));
      const percentNode = document.querySelector<HTMLElement>("[data-invitation-loading-percent]");
      if (percentNode) {
        percentNode.dataset.jsProgress = "true";
        percentNode.dataset.percent = String(nextPercent);
        if (percentNode.textContent !== String(nextPercent)) {
          percentNode.textContent = String(nextPercent);
        }
      }
      setPercent((current) => (current === nextPercent ? current : nextPercent));
      return elapsed;
    };

    const tick = (now: number) => {
      const elapsed = updateProgress(now);
      if (elapsed < preloaderProgressMs) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    const fallback = window.setInterval(() => {
      const elapsed = updateProgress();
      if (elapsed >= preloaderProgressMs) {
        window.clearInterval(fallback);
      }
    }, 250);
    const hide = window.setTimeout(() => setPreloaderHiding(true), preloaderFadeStartMs);
    const done = window.setTimeout(() => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(fallback);
      setPercent(100);
      setLoading(false);
    }, preloaderDoneMs);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(fallback);
      window.clearTimeout(hide);
      window.clearTimeout(done);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
      }
      if (snapRestoreTimerRef.current) {
        window.clearTimeout(snapRestoreTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleGalleryPreviewChange = (event: Event) => {
      setGalleryPreviewOpen(Boolean((event as CustomEvent<{ open?: boolean }>).detail?.open));
    };

    window.addEventListener("invitation-gallery-preview-change", handleGalleryPreviewChange);

    return () => {
      window.removeEventListener("invitation-gallery-preview-change", handleGalleryPreviewChange);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (opened) {
      root.classList.add("invitation-root-snap");
    } else {
      root.classList.remove("invitation-root-snap");
    }

    if (menuOpen || snapSuppressed) {
      root.classList.add("invitation-root-snap-disabled");
    } else {
      root.classList.remove("invitation-root-snap-disabled");
    }

    return () => {
      root.classList.remove("invitation-root-snap", "invitation-root-snap-disabled");
    };
  }, [menuOpen, opened, snapSuppressed]);

  useEffect(() => {
    if (!opened) return;

    const revealItems = Array.from(
      invitationRef.current?.querySelectorAll<HTMLElement>(".invitation-fade-up") ?? [],
    );

    const revealItem = (item: HTMLElement) => {
      item.dataset.visible = "true";
    };

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach(revealItem);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealItem(entry.target as HTMLElement);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.24,
      },
    );

    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
        revealItem(item);
      }
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [opened]);

  async function playMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;
    try {
      await audio.play();
      setMusicPlaying(true);
    } catch {
      setMusicPlaying(false);
    }
  }

  function pauseMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setMusicPlaying(false);
  }

  function forceScrollTop() {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    try {
      window.scrollTo(0, 0);
    } catch {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    root.style.scrollBehavior = previousScrollBehavior;
  }

  function smoothScrollToElement(element: HTMLElement) {
    const startY = window.scrollY;
    const targetY = startY + element.getBoundingClientRect().top;
    const distance = targetY - startY;
    const duration = 820;
    const startedAt = window.performance.now();

    if (Math.abs(distance) < 2) return;

    const easeInOutCubic = (progress: number) => {
      return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    };

    const step = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const nextY = startY + distance * easeInOutCubic(progress);

      try {
        window.scrollTo(0, nextY);
      } catch {
        document.documentElement.scrollTop = nextY;
        document.body.scrollTop = nextY;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }

  function scrollToQuote() {
    if (!scrollCueReady || coverLeaving) return;

    const quoteSection = document.getElementById("quote");
    if (!quoteSection) return;

    if (snapRestoreTimerRef.current) {
      window.clearTimeout(snapRestoreTimerRef.current);
      snapRestoreTimerRef.current = null;
    }

    setSnapSuppressed(true);
    window.requestAnimationFrame(() => {
      smoothScrollToElement(quoteSection);
    });
    snapRestoreTimerRef.current = window.setTimeout(() => {
      setSnapSuppressed(false);
      snapRestoreTimerRef.current = null;
    }, 1050);
  }

  function openInvitation() {
    appendDebugLine(
      `[openInvitation] called opened=${opened} leaving=${coverLeaving} hash=${window.location.hash || "none"} y=${Math.round(window.scrollY)}`,
    );

    if (opened || coverLeaving) {
      appendDebugLine("[openInvitation] ignored by guard");
      return;
    }

    if (snapRestoreTimerRef.current) {
      window.clearTimeout(snapRestoreTimerRef.current);
      snapRestoreTimerRef.current = null;
    }

    setSnapSuppressed(true);
    setScrollCueReady(false);
    forceScrollTop();
    void playMusic();
    setCoverLeaving(true);
    setOpened(true);
    appendDebugLine("[openInvitation] state queued");
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
    }

    window.requestAnimationFrame(forceScrollTop);
    window.setTimeout(forceScrollTop, 80);
    window.setTimeout(forceScrollTop, 280);
    openTimerRef.current = window.setTimeout(() => {
      forceScrollTop();
      setCoverLeaving(false);
      setScrollCueReady(true);
      setSnapSuppressed(false);
    }, 980);
  }

  useEffect(() => {
    openInvitationRef.current = openInvitation;
  });

  useEffect(() => {
    const clearOpenHash = () => {
      if (window.location.hash !== "#open-invitation") return;

      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    };

    const handleOpenHash = () => {
      if (window.location.hash !== "#open-invitation") return;

      openInvitationRef.current();
      window.setTimeout(clearOpenHash, 0);
    };

    window.addEventListener("hashchange", handleOpenHash);
    handleOpenHash();

    return () => {
      window.removeEventListener("hashchange", handleOpenHash);
    };
  }, []);

  function toggleMusic() {
    if (musicPlaying) {
      pauseMusic();
      return;
    }
    void playMusic();
  }

  function openMenu() {
    if (snapRestoreTimerRef.current) {
      window.clearTimeout(snapRestoreTimerRef.current);
    }
    setSnapSuppressed(false);
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
    setSnapSuppressed(true);
    if (snapRestoreTimerRef.current) {
      window.clearTimeout(snapRestoreTimerRef.current);
    }
    snapRestoreTimerRef.current = window.setTimeout(() => {
      setSnapSuppressed(false);
    }, 1000);
  }

  return (
    <>
      <audio
        className="hidden"
        loop
        onPause={() => setMusicPlaying(false)}
        onPlay={() => setMusicPlaying(true)}
        preload="auto"
        ref={audioRef}
        src={backgroundMusicSrc}
      />
      <main
        className={cn(
          "min-h-screen bg-[#101010]",
          opened && "invitation-page-open",
          menuOpen && "invitation-page-menu-open",
        )}
      >
        <DesktopFixedPanel />
        {opened ? (
          <>
            <button
              aria-label="Open menu"
              className={cn(
                "invitation-menu-toggle fixed right-[20px] top-[24px] z-40 flex size-12 items-center justify-center text-white transition hover:scale-105",
                galleryPreviewOpen && "pointer-events-none opacity-0",
              )}
              onClick={openMenu}
              type="button"
            >
              <MenuGlyph />
            </button>
            <button
              aria-label={musicPlaying ? "Pause background music" : "Play background music"}
              className="invitation-music-control sr-only"
              data-playing={musicPlaying ? "true" : "false"}
              onClick={toggleMusic}
              type="button"
            >
              {musicPlaying ? (
                <PauseIcon size={18} strokeWidth={1.8} />
              ) : (
                <PlayIcon size={18} strokeWidth={1.8} />
              )}
            </button>
            <SideMenu onClose={closeMenu} open={menuOpen} />
          </>
        ) : null}
        <div className="mx-auto min-h-screen w-full max-w-[460px] lg:ml-auto lg:mr-0" ref={invitationRef}>
          <OpeningHero
            leaving={coverLeaving}
            locked={!opened}
            onDebug={appendDebugLine}
            openingRecipientVisible={opened && coverLeaving}
            onOpen={openInvitation}
            onScrollCue={scrollToQuote}
            scrollCueEnabled={opened && scrollCueReady && !coverLeaving && !snapSuppressed}
          />
          {opened ? (
            <>
              <ScriptureQuoteSection />
              <GroomProfileSection />
              <BrideProfileSection />
              <LoveStorySection />
              <WeddingDateSection />
              <CountdownSection />
              <RsvpSection />
              <WishesSection />
              <DressCodeSection />
              <StreamingSection />
              <GiftSection />
              <GallerySection />
              <ClosingSection />
            </>
          ) : null}
        </div>
      </main>
      {loading ? <Preloader hiding={preloaderHiding} percent={percent} /> : null}
      {debugEnabled ? (
        <InvitationDebugOverlay
          lines={debugLines}
          onClear={() => setDebugLines([])}
          onOpen={() => openInvitationRef.current()}
        />
      ) : null}
    </>
  );
}

function describeDebugElement(element: Element | null) {
  if (!element) return "null";

  const id = element.id ? `#${element.id}` : "";
  const className =
    element instanceof HTMLElement
      ? element.className
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 3)
          .map((value) => `.${value}`)
          .join("")
      : "";

  return `<${element.tagName.toLowerCase()}${id}${className}>`;
}

function InvitationDebugOverlay({
  lines,
  onClear,
  onOpen,
}: {
  lines: string[];
  onClear: () => void;
  onOpen: () => void;
}) {
  return (
    <div className="fixed left-2 right-2 top-2 z-[10000000] max-h-[36vh] overflow-hidden rounded bg-black/85 p-2 font-mono text-[10px] leading-[13px] text-lime-200 shadow-2xl">
      <div className="mb-1 flex items-center gap-2">
        <button className="rounded bg-lime-200 px-2 py-1 text-[10px] uppercase text-black" onClick={onOpen} type="button">
          Debug Open
        </button>
        <button className="rounded bg-white/20 px-2 py-1 text-[10px] uppercase text-white" onClick={onClear} type="button">
          Clear
        </button>
      </div>
      <pre className="max-h-[calc(36vh-34px)] overflow-auto whitespace-pre-wrap">
        {lines.join("\n")}
      </pre>
    </div>
  );
}

function MenuGlyph() {
  return (
    <span aria-hidden="true" className="flex w-[26px] flex-col gap-[6px]">
      <span className="block h-0.5 w-full rounded-full bg-white" />
      <span className="block h-0.5 w-full rounded-full bg-white" />
    </span>
  );
}
