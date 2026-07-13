# OpeningHero Specification

## Overview
- **Target file:** `src/components/reveused/OpeningHero.tsx`
- **Screenshot:** `docs/design-references/reveused-mobile-01-pertama.png`
- **Interaction model:** opening cover + unlocked hero

## DOM Structure
- Full-viewport `section` inside the invitation column.
- Absolute background layer from local asset.
- Dark overlay/gradient layer.
- Foreground content group with extracted text.

## Computed Styles (exact values from getComputedStyle)

### Mobile Container
- fontSize: 16px
- fontWeight: 400
- fontFamily: -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- lineHeight: 24px
- color: rgb(51, 51, 51)
- background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box
- padding: 20px
- paddingTop: 20px
- paddingRight: 20px
- paddingBottom: 20px
- paddingLeft: 20px
- width: 390px
- height: 844px
- minHeight: 844px
- display: flex
- flexDirection: column
- justifyContent: center
- alignItems: center
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

### Desktop Container
- fontSize: 16px
- fontWeight: 400
- fontFamily: -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- lineHeight: 24px
- color: rgb(51, 51, 51)
- background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box
- padding: 30px
- paddingTop: 30px
- paddingRight: 30px
- paddingBottom: 30px
- paddingLeft: 30px
- width: 459.797px
- height: 1200px
- minHeight: 1200px
- display: flex
- flexDirection: column
- justifyContent: center
- alignItems: center
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

### Text Nodes / Headings
- "THE WEDDING OF" — Legan, sans-serif, 13px, 400, 17px
- "Imam Nandira" — Candlefish, sans-serif, 33px, 400, 33px
- "SATURDAY, 9TH DECEMBER 202X" — Legan, sans-serif, 13px, 400, 17px
- "Dear," — Legan, sans-serif, 20px, 500, 20px
- "We apologize if there is any misspelling of name or title" — Legan, sans-serif, 11px, 500, 11px
- "LET'S OPEN" — inter, sans-serif, 12px, 400, 12px

## States & Behaviors
- Entrance animations in source use Elementor/AOS fade/zoom classes. Clone uses CSS fade-up for panel content.
- Hover states: buttons transition over 0.3s, matching source button transition.
- Stateful details: opening cover + unlocked hero.

## Per-State Content
- N/A unless noted in behavior model above.

## Assets
- Background image: `N/A`
- Section screenshot: `docs/design-references/reveused-mobile-01-pertama.png`

## Text Content (verbatim)
THE WEDDING OF Imam Nandira SATURDAY, 9TH DECEMBER 202X

## Responsive Behavior
- **Desktop (1440px):** 460px wide column panel, 1200px tall; left desktop panel remains fixed.
- **Tablet (768px):** full-width panel, 1024px tall in capture.
- **Mobile (390px):** 390px wide, 844px tall in capture; implementation uses 100svh.
- **Breakpoint:** fixed desktop panel appears above ~1024px.
