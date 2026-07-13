# ScriptureQuoteSection Specification

## Overview
- **Target file:** `src/components/reveused/ScriptureQuoteSection.tsx`
- **Screenshot:** `docs/design-references/reveused-mobile-02-133f2f8f.png`
- **Interaction model:** static

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
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00195-copy.jpg.jpeg")
- background: rgba(0, 0, 0, 0) url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00195-copy.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 0px 30px
- paddingRight: 30px
- paddingLeft: 30px
- width: 390px
- height: 844px
- minHeight: 844px
- display: flex
- flexDirection: column
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
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00195-copy.jpg.jpeg")
- background: rgba(0, 0, 0, 0) url("https://groovepublic.com/wp-content/uploads/2025/03/reveused-imam-nandira-00195-copy.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 0px 30px
- paddingRight: 30px
- paddingLeft: 30px
- width: 459.797px
- height: 1200px
- minHeight: 1200px
- display: flex
- flexDirection: column
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
- "ECCLESIASTES 4:9-12" — Candlefish, sans-serif, 23px, 500, 23px

## States & Behaviors
- Entrance animations in source use Elementor/AOS fade/zoom classes. Clone uses CSS fade-up for panel content.
- Hover states: buttons transition over 0.3s, matching source button transition.
- Stateful details: static.

## Per-State Content
- N/A unless noted in behavior model above.

## Assets
- Background image: `public/images/reveused/reveused-imam-nandira-00195-copy.jpg.jpeg`
- Section screenshot: `docs/design-references/reveused-mobile-02-133f2f8f.png`

## Text Content (verbatim)
Two are better than one because they have a good reward for their toil. For if they fall, one will lift up his fellow. But woe to him who is alone when he falls and has not another to lift him up! Again, if two lie together, they keep warm, but how can one keep warm alone? And though a man might prevail against one who is alone, two will withstand him ECCLESIASTES 4:9-12

## Responsive Behavior
- **Desktop (1440px):** 460px wide column panel, 1200px tall; left desktop panel remains fixed.
- **Tablet (768px):** full-width panel, 1024px tall in capture.
- **Mobile (390px):** 390px wide, 844px tall in capture; implementation uses 100svh.
- **Breakpoint:** fixed desktop panel appears above ~1024px.
