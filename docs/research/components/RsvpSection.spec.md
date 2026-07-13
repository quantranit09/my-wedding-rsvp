# RsvpSection Specification

## Overview
- **Target file:** `src/components/reveused/InvitationSections.tsx` (`RsvpSection`)
- **Screenshots:** `docs/design-references/source-rsvp-step1-live.png`, `docs/design-references/source-rsvp-step2-live.png`
- **Interaction model:** Elementor-style 4-step form

## DOM Structure
- Full-viewport `section` inside the invitation column.
- Absolute background layer from local asset.
- Dark overlay/gradient layer.
- Foreground content is left-aligned and contains heading, description, numeric stepper, one active field group, and navigation buttons.
- Source form fields from `/tmp/reveused.html`:
  - Step 1: `Name` text input.
  - Step 2: `Attendance` radio options: `EXCITED TO ATTEND`, `UNABLE ATTEND`.
  - Step 3: `No of Guest` number input, default `1`, min `1`, max `2`.
  - Step 4: `Wishes` textarea and final `Send` submit.

## Computed Styles (exact values from getComputedStyle)

### Mobile Container
- fontSize: 16px
- fontWeight: 400
- fontFamily: -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- lineHeight: 24px
- color: rgb(51, 51, 51)
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00189-copy.jpg.jpeg")
- background: rgba(0, 0, 0, 0) url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00189-copy.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 78px 50.6875px 39px
- paddingTop: 78px
- paddingRight: 50.6875px
- paddingBottom: 39px
- paddingLeft: 50.6875px
- width: 390px
- height: 844px
- minHeight: 844px
- display: flex
- flexDirection: column
- justifyContent: flex-start
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
- backgroundImage: url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00189-copy.jpg.jpeg")
- background: rgba(0, 0, 0, 0) url("https://groovepublic.com/wp-content/uploads/2024/03/reveused-imam-nandira-00189-copy.jpg.jpeg") repeat scroll 50% 50% / cover padding-box border-box
- padding: 50px 50px 30px
- paddingTop: 50px
- paddingRight: 50px
- paddingBottom: 30px
- paddingLeft: 50px
- width: 459.797px
- height: 1200px
- minHeight: 1200px
- display: flex
- flexDirection: column
- justifyContent: flex-start
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
- Heading: `Candlefish, sans-serif`, `28px`, weight `400`, line-height `28px`, letter-spacing `0.5px`, color `rgb(255,255,255)`, rect `x=50.6875 y=78 w=288.625 h=84`.
- Description: `Legan, sans-serif`, `13px`, line-height `19.5px`, color `rgb(255,255,255)`, rect `x=50.6875 y=182 w=288.625 h=58.5`.
- Field label: `inter, sans-serif`, `11px`, line-height `18.7px`, letter-spacing `1px`, uppercase, color white.
- Text input: `inter, sans-serif`, `13px`, line-height `18.2px`, color `rgb(194,194,194)`, background `rgba(65,65,65,0.43)`, border `1px solid rgba(255,255,255,0.56)`, padding `8px 16px`, rect `x=50.6875 y=339.1875 w=288.625 h=40`.
- Step 1 next button: rect `x=50.6875 y=389.1875 w=288.625 h=40`, bg `rgb(49,49,49)`, text white, `13px`, letter-spacing `1px`.
- Step 2 previous/next buttons: two columns, each `139.31px x 40px`; previous bg `rgb(105,114,125)`, next bg `rgb(49,49,49)`.
- Step indicator number circles: `30px x 30px`; centers spaced by about `86.2px`. Active color `rgb(57,181,74)`, inactive color `rgb(194,203,210)`, connectors are thin white/gray horizontal lines.

## States & Behaviors
- Entrance animations in source use AOS fade on heading/description/form.
- Step navigation is click-driven. Source validates required fields before advancing.
- Step 1 `Next` requires a non-empty name.
- Step 2 requires one attendance option.
- Step 3 guest count is `1` to `2`.
- Step 4 `Send` produces Elementor success feedback: `Your submission was successful.`

## Per-State Content
- Step 1: `NAME`, text input, `NEXT`.
- Step 2: `ATTENDANCE`, `EXCITED TO ATTEND`, `UNABLE ATTEND`, `PREVIOUS`, `NEXT`.
- Step 3: `NO OF GUEST`, number input, `PREVIOUS`, `NEXT`.
- Step 4: `WISHES`, textarea, `PREVIOUS`, `SEND`.
- Submitted: keep visible form state and show green success line with check mark text.

## Assets
- Background image: `public/images/reveused/reveused-imam-nandira-00189-copy.jpg.jpeg`
- Section screenshot: `docs/design-references/reveused-mobile-08-rsvp.png`

## Text Content (verbatim)
Kindly Confirm Your Presence And Share Your Blessings
Kindly express your best wishes and kindly confirm your attendance by using the form provided below. Thank you.
1 2 3 4
NAME
NEXT
ATTENDANCE
EXCITED TO ATTEND
UNABLE ATTEND
PREVIOUS
NO OF GUEST
WISHES
SEND
Your submission was successful.

## Responsive Behavior
- **Desktop (1440px):** 460px wide column panel, 1200px tall; left desktop panel remains fixed.
- **Tablet (768px):** full-width panel, 1024px tall in capture.
- **Mobile (390px):** 390px wide, 844px tall in capture; implementation uses 100svh.
- **Breakpoint:** fixed desktop panel appears above ~1024px.
