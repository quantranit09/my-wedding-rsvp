# ClosingSection Specification

## Overview
- **Target file:** `src/components/reveused/ClosingSection.tsx`
- **Screenshot:** `docs/design-references/reveused-mobile-15-496dc690.png`
- **Interaction model:** static footer links

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
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00141.jpg.jpeg")
- background: rgba(0, 0, 0, 0) url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00141.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 70px 20px
- paddingTop: 70px
- paddingRight: 20px
- paddingBottom: 70px
- paddingLeft: 20px
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
- objectPosition: 50% 50%

### Desktop Container
- fontSize: 16px
- fontWeight: 400
- fontFamily: -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- lineHeight: 24px
- color: rgb(51, 51, 51)
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00141.jpg.jpeg")
- background: rgba(0, 0, 0, 0) url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00141.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 60px 30px
- paddingTop: 60px
- paddingRight: 30px
- paddingBottom: 60px
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
- objectPosition: 50% 50%

### Text Nodes / Headings
- "THANK YOU FOR YOUR ATTENDANCE" — Candlefish, sans-serif, 28px, 400, 28px
- "IMAM NANDIRA" — ovo, sans-serif, 16px, 500, 16px
- "CREATED BY GROOVE PUBLIC" — Roboto, sans-serif, 9px, 300, 9px
- "© All rights reserved by groovepublic" — Roboto, sans-serif, 9px, 300, 9px

## States & Behaviors
- Entrance animations in source use Elementor/AOS fade/zoom classes. Clone uses CSS fade-up for panel content.
- Hover states: buttons transition over 0.3s, matching source button transition.
- Stateful details: static footer links.

## Per-State Content
- N/A unless noted in behavior model above.

## Assets
- Background image: `public/images/reveused/reveused-imam-nandira-00141.jpg.jpeg`
- Section screenshot: `docs/design-references/reveused-mobile-15-496dc690.png`

## Text Content (verbatim)
THANK YOU FOR YOUR ATTENDANCE It is a pleasure and honor for us, if you are willing to attend and give us your blessing. IMAM NANDIRA CREATED BY GROOVE PUBLIC +62 813-2757-7133 GROOVEPUBLIC.ID GROOVEPUBLIC.COM © All rights reserved by groovepublic

## Responsive Behavior
- **Desktop (1440px):** 460px wide column panel, 1200px tall; left desktop panel remains fixed.
- **Tablet (768px):** full-width panel, 1024px tall in capture.
- **Mobile (390px):** 390px wide, 844px tall in capture; implementation uses 100svh.
- **Breakpoint:** fixed desktop panel appears above ~1024px.
