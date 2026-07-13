# Preloader Specification

## Overview
- **Target file:** `src/components/reveused/Preloader.tsx`
- **Screenshot:** `docs/design-references/reveused-mobile-after-open.png`
- **Interaction model:** time-driven loading overlay

## DOM Structure
- Implemented as a supporting component for the invitation shell.
- Uses fixed/absolute positioning where the source does.

## Computed Styles (exact values from getComputedStyle)
- See `docs/research/reveused-mobile-after-open.json` and `docs/research/reveused-desktop-after-open.json`.

## States & Behaviors
- Preloader: time-driven, fades out after load.
- Progress: source increments continuously to 100%. Clone uses elapsed-time `requestAnimationFrame` plus interval fallback and direct DOM text update for the percent span so mobile does not get stuck on the server-rendered `0%`.
- Title/name text transition: source uses Dynamic Content for Elementor animated text with GSAP/SplitText. Both lines split into `chars`, animate in for `0.7s`, and use `Power3.easeIn`-style easing. "The Wedding of" enters from right (`x: 100`) with left-to-right character stagger; "Imam Nandira" enters from left (`x: -100`) with right-to-left character stagger. Clone mirrors this with per-character spans and ~70ms stagger steps.
- SideMenu: click-driven open/close.
- DesktopFixedPanel: desktop-only fixed panel with source position fixed.

## Assets
- Desktop background: `public/images/reveused/reveused-imam-nandira-00162.jpg.jpeg`
- Menu text links target panel IDs.

## Text Content (verbatim)
- Side menu: Home, Profile, Love Story, Wedding Event, RSVP, Wedding Gift, Gallery.
- Preloader: THE WEDDING OF IMAM NANDIRA LOADING...

## Responsive Behavior
- Desktop (1440px): centered title/image/name group; loading text is positioned bottom-left.
- Tablet (768px): hidden except menu overlay.
- Mobile (390px): centered title/image/name group; loading text remains horizontally centered around y=649 on 844px height.
