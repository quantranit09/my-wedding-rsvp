# CountdownSection Specification

## Overview
- **Target file:** `src/components/reveused/CountdownSection.tsx`
- **Screenshot:** `docs/design-references/reveused-mobile-07-6935054a.png`
- **Interaction model:** time-driven countdown display frozen at zero in capture

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
- backgroundColor: rgb(156, 156, 156)
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00152.jpg.jpeg")
- background: rgb(156, 156, 156) url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00152.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 50px 30px 120px
- paddingTop: 50px
- paddingRight: 30px
- paddingBottom: 120px
- paddingLeft: 30px
- width: 390px
- height: 844px
- minHeight: 844px
- display: flex
- flexDirection: column
- justifyContent: flex-end
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

### Desktop Container
- fontSize: 16px
- fontWeight: 400
- fontFamily: -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- lineHeight: 24px
- color: rgb(51, 51, 51)
- backgroundColor: rgb(156, 156, 156)
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00152.jpg.jpeg")
- background: rgb(156, 156, 156) url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00152.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 50px 30px 120px
- paddingTop: 50px
- paddingRight: 30px
- paddingBottom: 120px
- paddingLeft: 30px
- width: 459.797px
- height: 1200px
- minHeight: 1200px
- display: flex
- flexDirection: column
- justifyContent: flex-end
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

### Text Nodes / Headings
- "ALMOST TIME FOR OURCELEBRATION" — Candlefish, sans-serif, 28px, 400, 31px
- "SAVE THE DATE" — Legan, sans-serif, 13px, 400, 13px

## States & Behaviors
- Entrance animations in source use Elementor/AOS fade/zoom classes. Clone uses CSS fade-up for panel content.
- Hover states: buttons transition over 0.3s, matching source button transition.
- Stateful details: time-driven countdown display frozen at zero in capture.

## Per-State Content
- N/A unless noted in behavior model above.

## Assets
- Background image: `public/images/reveused/reveused-imam-nandira-00152.jpg.jpeg`
- Section screenshot: `docs/design-references/reveused-mobile-07-6935054a.png`

## Text Content (verbatim)
ALMOST TIME FOR OURCELEBRATION 00 DAYS 00 HOURS 00 MINUTES 00 SECONDS SAVE THE DATE

## Responsive Behavior
- **Desktop (1440px):** 460px wide column panel, 1200px tall; left desktop panel remains fixed.
- **Tablet (768px):** full-width panel, 1024px tall in capture.
- **Mobile (390px):** 390px wide, 844px tall in capture; implementation uses 100svh.
- **Breakpoint:** fixed desktop panel appears above ~1024px.
