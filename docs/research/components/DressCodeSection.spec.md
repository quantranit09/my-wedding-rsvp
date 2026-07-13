# DressCodeSection Specification

## Overview
- **Target file:** `src/components/reveused/DressCodeSection.tsx`
- **Screenshot:** `docs/design-references/reveused-mobile-10-56e9ab26.png`
- **Live mobile correction:** `docs/design-references/mobile-audit-source-10-56e9ab26.png`
- **Interaction model:** static

## DOM Structure
- Full-viewport `section` inside the invitation column.
- Absolute background layer from local asset.
- Dark overlay/gradient layer.
- Foreground content group with extracted text.
- Mobile visible state is signature-only over the portrait background. The guide title, description, and color swatches are not visible in the mobile viewport.

## Computed Styles (exact values from getComputedStyle)

### Mobile Container
- fontSize: 16px
- fontWeight: 400
- fontFamily: -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- lineHeight: 24px
- color: rgb(51, 51, 51)
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00200-copy.jpg.jpeg")
- background: rgba(0, 0, 0, 0) url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00200-copy.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 20px 20px 120px
- paddingTop: 20px
- paddingRight: 20px
- paddingBottom: 120px
- paddingLeft: 20px
- width: 390px
- height: 844px
- minHeight: 844px
- display: flex
- flexDirection: column
- justifyContent: flex-end
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

### Desktop Container
- fontSize: 16px
- fontWeight: 400
- fontFamily: -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- lineHeight: 24px
- color: rgb(51, 51, 51)
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00200-copy.jpg.jpeg")
- background: rgba(0, 0, 0, 0) url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00200-copy.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 30px 30px 130px
- paddingTop: 30px
- paddingRight: 30px
- paddingBottom: 130px
- paddingLeft: 30px
- width: 459.797px
- height: 1200px
- minHeight: 1200px
- display: flex
- flexDirection: column
- justifyContent: flex-end
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

### Text Nodes / Headings
- "Imam Nandira" — Thesignature, sans-serif, 35px, 300, 17px
- "A GUIDE TO DRESS CODES" — Candlefish, sans-serif, 29px, 400, 29px

## States & Behaviors
- Entrance animations in source use Elementor/AOS fade/zoom classes. Clone uses CSS fade-up for panel content.
- Hover states: buttons transition over 0.3s, matching source button transition.
- Stateful details: static.

## Per-State Content
- N/A unless noted in behavior model above.

## Assets
- Background image: `public/images/reveused/reveused-imam-nandira-00200-copy.jpg.jpeg`
- Section screenshot: `docs/design-references/reveused-mobile-10-56e9ab26.png`

## Text Content (verbatim)
Imam Nandira A GUIDE TO DRESS CODES We kindly encourage our guests to wear these colors for our special day

## Responsive Behavior
- **Desktop (1440px):** 460px wide column panel, 1200px tall; left desktop panel remains fixed.
- **Tablet (768px):** full-width panel, 1024px tall in capture.
- **Mobile (390px):** 390px wide, 844px tall in capture; implementation uses 100svh.
- **Breakpoint:** fixed desktop panel appears above ~1024px.

## Mobile Visual Notes From Live Source
- On a 390px by 844px viewport, only "Imam Nandira" is visibly present over the image.
- Signature is centered horizontally and sits slightly below vertical center, around the portrait faces.
- The background remains the `reveused-imam-nandira-00200-copy` portrait with the standard dark overlay/gradient.
- Do not show the "A GUIDE TO DRESS CODES" headline, explanatory text, or color swatches on mobile; those made the clone visibly diverge from the live source capture.
