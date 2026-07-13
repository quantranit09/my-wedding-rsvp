# Reveused Event Interactions Specification

## Overview
- Target files:
  - `src/components/reveused/ReveusedInvitation.tsx`
  - `src/components/reveused/InvitationSections.tsx`
  - `src/app/globals.css`
- Interaction model: scroll-driven section reveal and snap, click-driven overlays, click-driven carousel/lightbox, hover-driven menu/button feedback.

## Source Behaviors
- Scroll:
  - Source CSS applies `scroll-snap-align: start`, `scroll-snap-stop: always`, `height: 100vh`, and `overflow: hidden` to `.child` sections.
  - On invitation open and side-menu clicks, source temporarily disables `documentElement.style.scrollSnapType`, then restores `y mandatory`.
  - Source AOS uses IntersectionObserver-like behavior that adds/removes `aos-animate` on `[data-aos]`.
- Side menu:
  - Button click adds staged classes over roughly 500-750ms.
  - Body click outside closes the menu.
  - Menu item hover animates an underline with `transition: all 0.75s cubic-bezier(.645,.045,.355,1)`.
- Save the date:
  - `SAVE THE DATE` opens a fixed overlay with dark translucent background.
  - Overlay contains a save-date card, close button, and `download` button.
  - Source uses `html2canvas` to download `Imam Nandira.png`.
- Gallery preview:
  - Gallery images open `#custom-lightbox`: fixed, full-screen, black `rgba(0,0,0,.9)`, z-index 9999.
  - Lightbox opacity transitions over 300ms.
  - Body scroll is disabled while open.
  - Supports prev/next, close, Escape, ArrowLeft/ArrowRight, outside click, and touch swipe.
  - Counter format: `current / total`.
- Gallery carousel:
  - Swiper autoplay: 1500ms, speed 1000ms, loop yes, disable on interaction yes.
  - Prev/next controls switch slides.
- Video:
  - Play overlay opens YouTube inline player for `https://www.youtube.com/watch?v=a-kLVfwTZnM`.
  - Source pauses background audio while video plays and resumes when paused/ended.
- Wishes:
  - Shows 4 comments per page.
  - Prev/next controls paginate with `opacity` transition around 500-700ms.

## Clone Implementation Targets
- Add root scroll-snap class only after invitation is opened, with snap temporarily disabled while menu is open.
- Add Save Date fixed overlay with close and generated PNG download.
- Add gallery lightbox with prev/next, close, keyboard, outside-click, body-scroll lock, and swipe.
- Add video overlay with YouTube iframe and audio pause/resume via custom window events.
- Add wishes pagination with 4 items per page and prev/next.
- Add menu hover underline and outside-click close.

## Verification
- Automated mobile CDP sweep: `node scripts/inspect-clone-events.mjs http://localhost:3000`.
- Result artifact: `docs/research/clone-events-qa.json`.
- Pass status: all assertions true for open/audio, scroll-snap, menu hover/outside close, Save Date overlay, wishes pagination, gallery preview/next, video audio pause/resume, and clean console/runtime errors.
- Screenshot artifacts:
  - `docs/design-references/clone-events-save-date-modal.png`
  - `docs/design-references/clone-events-gallery-lightbox.png`
  - `docs/design-references/clone-events-video-preview.png`
