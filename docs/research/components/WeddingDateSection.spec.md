# WeddingDateSection Specification

## Overview
- **Target file:** `src/components/reveused/InvitationSections.tsx`
- **Screenshot:** `docs/design-references/source-live-mobile-weddingevent-visible.png`
- **Computed styles:** `docs/research/components/source-live-mobile-weddingevent-visible.json`
- **Interaction model:** static content with scroll-triggered AOS fade reveal.

## DOM Structure
- Full-viewport `section` inside the invitation column.
- Absolute background layer from local asset `reveused-imam-nandira-00187.jpg.jpeg`.
- Dark overlay/gradient layer.
- Foreground content, centered, with:
  - Ornament SVG icon.
  - "SAVE OUR DATE" kicker.
  - Date heading.
  - Holy Matrimony event detail group.
  - Wedding Reception event detail group.

## Computed Styles (exact values from getComputedStyle)

### Mobile Container
- fontSize: 16px
- fontWeight: 400
- fontFamily: -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- lineHeight: 24px
- color: rgb(51, 51, 51)
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00187.jpg.jpeg")
- background: rgba(0, 0, 0, 0) url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00187.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- width: 390px
- height: 844px
- minHeight: 844px
- display: flex
- flexDirection: column
- justifyContent: center
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

### Intro Group
- selector: `[data-id="6a85e955"]`
- rect at 390x844: x 0, y 161, width 390px, height 148px
- display: flex
- flexDirection: column

### Ornament SVG
- selector: `[data-id="2f22dd4"] svg`
- rect at 390x844: x 170, y 161, width 50px, height 50px
- fontSize: 50px
- lineHeight: 50px
- color: rgb(255, 255, 255)
- display: block
- transition: all

### Save Our Date Kicker
- selector: `[data-id="598424fb"] h2`
- rect at 390x844: x 0, y 227, width 390px, height 10px
- fontFamily: Legan, sans-serif
- fontSize: 10px
- fontWeight: 400
- lineHeight: 10px
- letterSpacing: 1.8px
- color: rgb(255, 255, 255)
- textTransform: uppercase

### Date Heading
- selector: `[data-id="62e9bcb0"] h2`
- rect at 390x844: x 0, y 247, width 390px, height 62px
- fontFamily: Candlefish, sans-serif
- fontSize: 24px
- fontWeight: 500
- lineHeight: 31px
- color: rgb(255, 255, 255)

### Event Groups
- Holy block rect at 390x844: x 0, y 329, width 390px, height 173px
- Reception block rect at 390x844: x 0, y 521, width 390px, height 163px
- Event title font: Candlefish, sans-serif, 24px, 500, line-height 28px, white.
- Event venue/address width: 230px, font Legan, sans-serif, 13px, 400, line-height 19.5px, white.
- Google Maps button: x 130, width 130px, height 33px, background rgb(128, 128, 128), padding 10px 13px, font Legan 13px, line-height 13px, text-transform uppercase, color white.

## States & Behaviors
- Source entrance animations use AOS fade.
- Ornament: `data-aos="fade"`, delay 200ms, duration 1000ms, easing ease-in-out.
- Kicker: delay 100ms, duration 800ms.
- Date heading: delay 200ms, duration 1000ms.
- Holy block: delay 500ms, duration 1000ms.
- Reception block: delay 600ms, duration 1000ms.
- Clone uses `reveused-fade-up` / transition classes already wired by the invitation observer.
- Button hover: background moves from #808080 to a slightly lighter gray over 300ms.

## Per-State Content
- N/A, no click/switched states in this section.

## Assets
- Background image: `public/images/reveused/reveused-imam-nandira-00187.jpg.jpeg`
- Ornament SVG: `public/images/reveused/reveused-wedding-ornament.svg`
- Section screenshot: `docs/design-references/source-live-mobile-weddingevent-visible.png`

## Text Content (verbatim)
SAVE OUR DATE
SATURDAY
01 MARCH 202X

Holy Matrimony
12.00 - 01.00 PM
Gereja Katedral Jakarta
Jl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
GOOGLE MAPS

Wedding Reception
12.00 - 01.00 PM
Gereja Katedral Jakarta
Jl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
GOOGLE MAPS

Map URL: `https://maps.app.goo.gl/fQGiC37iEx6fcuNq8`

## Responsive Behavior
- **Desktop (1440px):** 460px wide column panel, 1200px tall; left desktop panel remains fixed.
- **Tablet (768px):** full-width panel, 1024px tall in capture.
- **Mobile (390px):** 390px wide, 844px tall in capture; first content starts at y=161 and the second button ends near y=684.
- **Breakpoint:** fixed desktop panel appears above ~1024px.
