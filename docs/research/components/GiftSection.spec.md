# GiftSection Specification

## Overview
- **Target file:** `src/components/reveused/GiftSection.tsx`
- **Screenshot:** `docs/design-references/reveused-mobile-12-weddinggift.png`
- **Interaction model:** copy-button interactions

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
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00171.jpg.jpeg")
- background: rgb(16, 16, 16) url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00171.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 20px 35px 70px
- paddingTop: 20px
- paddingRight: 35px
- paddingBottom: 70px
- paddingLeft: 35px
- width: 390px
- height: 844px
- minHeight: 844px
- display: flex
- flexDirection: column
- justifyContent: flex-end
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
- backgroundColor: rgb(16, 16, 16)
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00171.jpg.jpeg")
- background: rgb(16, 16, 16) url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00171.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
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
- "Wedding Gift" — Candlefish, sans-serif, 28px, 400, 31px
- "Shirley Lorraine" — Legan, sans-serif, 14px, 300, 14px
- "Bank BCA 0087771222" — Legan, sans-serif, 14px, 300, 14px
- "Shirley Lorraine" — Legan, sans-serif, 14px, 300, 14px
- "Bank Mandiri 001231200" — Legan, sans-serif, 14px, 300, 14px
- "Brandon William" — Legan, sans-serif, 14px, 300, 14px
- "Bank BCA 0800123123" — Legan, sans-serif, 14px, 300, 14px
- "CONFIRM" — Legan, sans-serif, 12px, 400, 12px

## States & Behaviors
- Entrance animations in source use Elementor/AOS fade/zoom classes. Clone uses CSS fade-up for panel content.
- Hover states: buttons transition over 0.3s, matching source button transition.
- Stateful details: copy-button interactions.

## Per-State Content
- N/A unless noted in behavior model above.

## Assets
- Background image: `public/images/reveused/reveused-imam-nandira-00171.jpg.jpeg`
- Section screenshot: `docs/design-references/reveused-mobile-12-weddinggift.png`

## Text Content (verbatim)
Wedding Gift For those of you who want to give a token of love to the bride and groom, you can use the account number below: Shirley Lorraine Bank BCA 0087771222 Shirley Lorraine Bank Mandiri 001231200 Brandon William Bank BCA 0800123123 CONFIRM

## Responsive Behavior
- **Desktop (1440px):** 460px wide column panel, 1200px tall; left desktop panel remains fixed.
- **Tablet (768px):** full-width panel, 1024px tall in capture.
- **Mobile (390px):** 390px wide, 844px tall in capture; implementation uses 100svh.
- **Breakpoint:** fixed desktop panel appears above ~1024px.
