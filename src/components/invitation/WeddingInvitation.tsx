"use client";

import { useEffect, useRef, useState } from "react";

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
  VideoStorySection,
  WeddingDateSection,
  WishesSection,
} from "./InvitationSections";

const backgroundMusicSrc = "/audio/sod-ven-infinity.mp3";
const preloaderProgressMs = 4000;
const preloaderFadeStartMs = 4500;
const preloaderDoneMs = 5500;

export function WeddingInvitation() {
  const [loading, setLoading] = useState(true);
  const [preloaderHiding, setPreloaderHiding] = useState(false);
  const [percent, setPercent] = useState(1);
  const [opened, setOpened] = useState(false);
  const [coverLeaving, setCoverLeaving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [snapSuppressed, setSnapSuppressed] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const invitationRef = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<number | null>(null);
  const snapRestoreTimerRef = useRef<number | null>(null);
  const resumeMusicAfterVideoRef = useRef(false);

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
    const handleVideoOpen = () => {
      resumeMusicAfterVideoRef.current = Boolean(audioRef.current && !audioRef.current.paused);
      pauseMusic();
    };

    const handleVideoClose = () => {
      if (resumeMusicAfterVideoRef.current) {
        void playMusic();
      }
      resumeMusicAfterVideoRef.current = false;
    };

    window.addEventListener("invitation-video-open", handleVideoOpen);
    window.addEventListener("invitation-video-close", handleVideoClose);

    return () => {
      window.removeEventListener("invitation-video-open", handleVideoOpen);
      window.removeEventListener("invitation-video-close", handleVideoClose);
    };
  }, []);

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

  function openInvitation() {
    if (opened || coverLeaving) return;

    void playMusic();
    setCoverLeaving(true);
    setOpened(true);
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
    }
    openTimerRef.current = window.setTimeout(() => {
      setCoverLeaving(false);
    }, 900);
  }

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
              className="fixed right-[20px] top-[24px] z-40 flex size-12 items-center justify-center text-white transition hover:scale-105"
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
            openingRecipientVisible={opened && coverLeaving}
            onOpen={openInvitation}
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
              <VideoStorySection />
              <ClosingSection />
            </>
          ) : null}
        </div>
      </main>
      {loading ? <Preloader hiding={preloaderHiding} percent={percent} /> : null}
    </>
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
