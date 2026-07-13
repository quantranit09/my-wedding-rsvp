# Opening Hero Open Interaction

Source URL: `https://groovepublic.com/reveused/`
Captured: `docs/research/components/source-open-click-timeline-ready.json`

## Source Behavior

- Before click, the page height is one viewport and only the cover is reachable.
- `LET'S OPEN` starts the background audio from the user gesture.
- The cover section stays mounted after click; the page does not fade to black or swap to a new first screen.
- Page content unlocks immediately. In the source capture, `document.body.scrollHeight` changed from `844` to `12660` within `100ms`.
- The recipient block is controlled by Dynamic Content visibility on `#tombol-buka` using the `slide` hide effect.
- The scroll cue is hidden before click, then fades in after the click. In the source capture it was visible around `500ms`, with a `50px` square Lottie at `x=170`, `y=578` on a `390x844` viewport.
- The source scroll cue uses `/wp-content/uploads/2024/03/Animation-1729503542565.json`, captured locally as `public/animation/reveused-open-scroll.json`.
- The hamburger menu appears only after the invitation is opened.

## Clone Requirements

- Keep the cover component mounted through the open transition so the background slideshow and title do not reset.
- Render the remaining invitation sections immediately on click to match the source page-height unlock.
- Hide the recipient with a short slide/fade effect and remove it after the transition.
- Show the scroll cue at roughly the same vertical position as the source (`bottom: 26%`) and fade it in after click.
- Do not apply a global page fade to the opened invitation.

## Clone Verification

- At `500ms` after click on a `390x844` viewport:
  - `document.body.scrollHeight`: `12660`
  - scroll cue rect: `x=170`, `y=574.5625`, `width=50`, `opacity=1`
  - recipient rect: `height=0`, `opacity=0`
  - hero title `y=118.15625`
- Screenshot: `docs/design-references/clone-open-500ms.png`
