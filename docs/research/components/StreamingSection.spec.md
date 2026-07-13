# StreamingSection Specification

## Overview
- **Target file:** `src/components/reveused/StreamingSection.tsx`
- **Screenshot:** `docs/design-references/reveused-mobile-11-545a0069.png`
- **Interaction model:** external link

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
- backgroundColor: rgb(16, 16, 16)
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00139.jpg.jpeg")
- background: rgb(16, 16, 16) url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00139.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 70px 30px
- paddingTop: 70px
- paddingRight: 30px
- paddingBottom: 70px
- paddingLeft: 30px
- width: 390px
- height: 844px
- minHeight: 844px
- display: flex
- flexDirection: column
- justifyContent: flex-start
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

### Desktop Container
- fontSize: 16px
- fontWeight: 400
- fontFamily: -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- lineHeight: 24px
- color: rgb(51, 51, 51)
- backgroundColor: rgb(16, 16, 16)
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00139.jpg.jpeg")
- background: rgb(16, 16, 16) url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00139.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 70px 30px 90px
- paddingTop: 70px
- paddingRight: 30px
- paddingBottom: 90px
- paddingLeft: 30px
- width: 459.797px
- height: 1200px
- minHeight: 1200px
- display: flex
- flexDirection: column
- justifyContent: flex-start
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

### Text Nodes / Headings
- "JOIN OUR EXCLUSIVE LIVE STREAMING EVENT" — Candlefish, sans-serif, 28px, 400, 31px
- "SATURDAY, 1 MARCH 202X - 11.00 WIB" — Legan, sans-serif, 16px, 400, 17px
- "Join Streaming" — Legan, sans-serif, 13px, 500, 13px

## States & Behaviors
- Entrance animations in source use Elementor/AOS fade/zoom classes. Clone uses CSS fade-up for panel content.
- Hover states: buttons transition over 0.3s, matching source button transition.
- Stateful details: external link.

## Per-State Content
- N/A unless noted in behavior model above.

## Assets
- Background image: `public/images/reveused/reveused-imam-nandira-00139.jpg.jpeg`
- Section screenshot: `docs/design-references/reveused-mobile-11-545a0069.png`

## Text Content (verbatim)
JOIN OUR EXCLUSIVE LIVE STREAMING EVENT SATURDAY, 1 MARCH 202X - 11.00 WIB Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Join Streaming

## Responsive Behavior
- **Desktop (1440px):** 460px wide column panel, 1200px tall; left desktop panel remains fixed.
- **Tablet (768px):** full-width panel, 1024px tall in capture.
- **Mobile (390px):** 390px wide, 844px tall in capture; implementation uses 100svh.
- **Breakpoint:** fixed desktop panel appears above ~1024px.
