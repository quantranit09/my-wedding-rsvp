# WishesSection Specification

## Overview
- **Target file:** `src/components/reveused/WishesSection.tsx`
- **Screenshot:** `docs/design-references/reveused-mobile-09-f0d4436.png`
- **Live mobile correction:** `docs/design-references/mobile-audit-source-09-f0d4436.png`
- **Interaction model:** click-driven carousel controls mocked

## DOM Structure
- Full-viewport `section` inside the invitation column.
- Absolute background layer from local asset.
- Dark overlay/gradient layer.
- Foreground content group with extracted text.
- Mobile layout is a free typography composition, not cards: header row, divider, and four alternating wish clusters.
- "Wishes" sits left-aligned; "NEXT ->" sits on the right. There is no visible centered "PREV / WISHES / NEXT" control bar.
- Wish items alternate left/right alignment and must remain visually unboxed.

## Computed Styles (exact values from getComputedStyle)

### Mobile Container
- fontSize: 16px
- fontWeight: 400
- fontFamily: -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- lineHeight: 24px
- color: rgb(51, 51, 51)
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00189.jpg.jpeg")
- background: rgba(0, 0, 0, 0) url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00189.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 58.5px 39px 39px
- paddingTop: 58.5px
- paddingRight: 39px
- paddingBottom: 39px
- paddingLeft: 39px
- width: 390px
- height: 844px
- minHeight: 844px
- display: flex
- flexDirection: column
- gap: 20px
- border: 0px none rgb(51, 51, 51)
- borderTop: 0px none rgb(51, 51, 51)
- borderBottom: 0px none rgb(51, 51, 51)
- borderLeft: 0px none rgb(51, 51, 51)
- borderRight: 0px none rgb(51, 51, 51)
- overflow: hidden
- overflowX: hidden
- overflowY: hidden
- position: relative
- opacity: 1
- transition: background 0.3s, border 0.3s, box-shadow 0.3s, transform 0.4s
- objectFit: fill
- objectPosition: 50% 50%
- textOverflow: clip

### Desktop Container
- fontSize: 16px
- fontWeight: 400
- fontFamily: -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- lineHeight: 24px
- color: rgb(51, 51, 51)
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00189.jpg.jpeg")
- background: rgba(0, 0, 0, 0) url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00189.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 45.9688px
- paddingTop: 45.9688px
- paddingRight: 45.9688px
- paddingBottom: 45.9688px
- paddingLeft: 45.9688px
- width: 459.797px
- height: 1200px
- minHeight: 1200px
- display: flex
- flexDirection: column
- gap: 20px
- border: 0px none rgb(51, 51, 51)
- borderTop: 0px none rgb(51, 51, 51)
- borderBottom: 0px none rgb(51, 51, 51)
- borderLeft: 0px none rgb(51, 51, 51)
- borderRight: 0px none rgb(51, 51, 51)
- overflow: hidden
- overflowX: hidden
- overflowY: hidden
- position: relative
- opacity: 1
- transition: background 0.3s, border 0.3s, box-shadow 0.3s, transform 0.4s
- objectFit: fill
- objectPosition: 50% 50%
- textOverflow: clip

### Text Nodes / Headings
- "Wishes" — Candlefish, sans-serif, 25px, 400, 25px
- "PREV" — inter, sans-serif, 13px, 500, 13px
- "NEXT" — inter, sans-serif, 13px, 500, 13px
- "Selamat" — legan, 13px, 300, 19.5px
- "Sangat Fungsional dan Cakep banget undangannya ! Fitur sangat baik dan rapi polll" — legan, 13px, 300, 19.5px
- "Maaf, hanya untuk yang sudah melakukan pembelian dan memiliki akun dari Groove Public." — legan, 13px, 300, 19.5px
- "Maaf, hanya untuk yang sudah melakukan pembelian dan memiliki akun dari Groove Public." — legan, 13px, 300, 19.5px

## States & Behaviors
- Entrance animations in source use Elementor/AOS fade/zoom classes. Clone uses CSS fade-up for panel content.
- Hover states: buttons transition over 0.3s, matching source button transition.
- Stateful details: click-driven carousel controls mocked.

## Per-State Content
- N/A unless noted in behavior model above.

## Assets
- Background image: `public/images/reveused/reveused-imam-nandira-00189.jpg.jpeg`
- Section screenshot: `docs/design-references/reveused-mobile-09-f0d4436.png`

## Text Content (verbatim)
Wishes NEXT Guest Name Selamat 20 Jun 2025 Jaya Sangat Fungsional dan Cakep banget undangannya ! Fitur sangat baik dan rapi polll 27 Nov 2024 Mr. Example Maaf, hanya untuk yang sudah melakukan pembelian dan memiliki akun dari Groove Public. 27 Nov 2024 Mr. Example Maaf, hanya untuk yang sudah melakukan pembelian dan memiliki akun dari Groove Public. 27 Nov 2024

## Responsive Behavior
- **Desktop (1440px):** 460px wide column panel, 1200px tall; left desktop panel remains fixed.
- **Tablet (768px):** full-width panel, 1024px tall in capture.
- **Mobile (390px):** 390px wide, 844px tall in capture; implementation uses 100svh.
- **Breakpoint:** fixed desktop panel appears above ~1024px.

## Mobile Visual Notes From Live Source
- Top padding is approximately 58.5px and side padding is 39px.
- Header uses Candlefish-style "Wishes" at the upper left; NEXT is 13px uppercase at upper right with a thin arrow glyph.
- A 1px white horizontal rule runs below the header.
- The first four visible wishes are positioned in a loose editorial layout:
  - Guest Name: left aligned near the top under the rule.
  - Jaya: right aligned in the upper-middle.
  - Mr. Example: left aligned lower-middle.
  - Mr. Example: right aligned near the lower body.
- Dates are small and low-contrast gray/white; messages are Legan 13px with 19.5px line-height.
