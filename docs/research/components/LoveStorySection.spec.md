# LoveStorySection Specification

## Overview
- **Target file:** `src/components/reveused/LoveStorySection.tsx`
- **Screenshot:** `docs/design-references/reveused-mobile-05-lovestory.png`
- **Interaction model:** static timeline

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
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00204.jpg.jpeg")
- background: rgba(0, 0, 0, 0) url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00204.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 39px
- paddingTop: 39px
- paddingRight: 39px
- paddingBottom: 39px
- paddingLeft: 39px
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

### Desktop Container
- fontSize: 16px
- fontWeight: 400
- fontFamily: -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- lineHeight: 24px
- color: rgb(51, 51, 51)
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00204.jpg.jpeg")
- background: rgba(0, 0, 0, 0) url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00204.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
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

### Text Nodes / Headings
- "A journey in love" — Candlefish, sans-serif, 40px, 400, 40px
- "SEPTEMBER 2019" — Roxborough-CF, sans-serif, 16px, 400, 16px
- "SEPTEMBER 2020" — Roxborough-CF, sans-serif, 16px, 400, 16px
- "SEPTEMBER 2023" — Roxborough-CF, sans-serif, 16px, 400, 16px
- "IMAM NANDIRA" — ovo, sans-serif, 14px, 500, 14px

## States & Behaviors
- Entrance animations in source use Elementor/AOS fade/zoom classes. Clone uses CSS fade-up for panel content.
- Hover states: buttons transition over 0.3s, matching source button transition.
- Stateful details: static timeline.

## Per-State Content
- N/A unless noted in behavior model above.

## Assets
- Background image: `public/images/reveused/reveused-imam-nandira-00204.jpg.jpeg`
- Section screenshot: `docs/design-references/reveused-mobile-05-lovestory.png`

## Text Content (verbatim)
A journey in love SEPTEMBER 2019 2019, we started our journey as two individuals who were just getting to know each other. We were excited to explore what the future held for us and were eager to see where our paths would lead. SEPTEMBER 2020 In 2020, we continued our journey, facing challenges and obstacles along the way. We learned how to communicate effectively and work together as a team, and our relationship grew stronger as a result. SEPTEMBER 2023 And now, in 2023, we have reached the pinnacle of our journey – marriage. It has been a joyous and exciting ride filled with laughter, love, and endless possibilities. We have made countless memories together, from our first date to our engagement, and now our wedding day. Our journey has been a fulfilling one, and we are grateful for every moment we have shared. We look forward to continuing our adventure as a married couple. IMAM NANDIRA

## Responsive Behavior
- **Desktop (1440px):** 460px wide column panel, 1200px tall; left desktop panel remains fixed.
- **Tablet (768px):** full-width panel, 1024px tall in capture.
- **Mobile (390px):** 390px wide, 844px tall in capture; implementation uses 100svh.
- **Breakpoint:** fixed desktop panel appears above ~1024px.
