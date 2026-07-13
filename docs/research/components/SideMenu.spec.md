# SideMenu Specification

## Overview
- **Target file:** `src/components/reveused/SideMenu.tsx`
- **Screenshot:** `docs/design-references/reveused-mobile-after-open.png`
- **Interaction model:** click-driven menu overlay

## DOM Structure
- Implemented as a supporting component for the invitation shell.
- Uses fixed/absolute positioning where the source does.

## Computed Styles (exact values from getComputedStyle)
- See `docs/research/reveused-mobile-after-open.json` and `docs/research/reveused-desktop-after-open.json`.

## States & Behaviors
- Preloader: time-driven, fades out after load.
- SideMenu: click-driven open/close.
- DesktopFixedPanel: desktop-only fixed panel with source position fixed.

## Assets
- Desktop background: `public/images/reveused/reveused-imam-nandira-00162.jpg.jpeg`
- Menu text links target panel IDs.

## Text Content (verbatim)
- Side menu: Home, Profile, Love Story, Wedding Event, RSVP, Wedding Gift, Gallery.
- Preloader: THE WEDDING OF IMAM NANDIRA LOADING...

## Responsive Behavior
- Desktop (1440px): fixed panel visible.
- Tablet (768px): hidden except menu overlay.
- Mobile (390px): hidden except menu overlay.
