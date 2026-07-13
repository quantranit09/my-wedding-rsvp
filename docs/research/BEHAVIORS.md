# Reveused Behaviors

## Source
- Target: https://groovepublic.com/reveused/
- Desktop screenshot: docs/design-references/reveused-desktop-after-open.png
- Mobile screenshot: docs/design-references/reveused-mobile-after-open.png

## Interaction Sweep
- Initial state: fixed preloader covers the page with background rgb(16, 16, 16), opacity transition 1s, z-index 9999999. Captured text: "THE WEDDING OF IMAM NANDIRA LOADING... 32%". The progress counter increments by elapsed time to 100%, holds briefly, fades for 1000ms, then removes.
- Preloader media/text: source uses a 90px square grayscale/slideshow image centered around y=337 on a 390x844 viewport, with the mobile loading label around y=649. On desktop the loading label is bottom-left. The two title lines are GSAP/SplitText `chars` animations: "The Wedding of" from right (`x:100`) left-to-right, "Imam Nandira" from left (`x:-100`) right-to-left, `0.7s` duration with ~70ms stagger. Clone mirrors the square image placement, fast photo cycling, per-character text entrance, 1s fade, and cover-behind-loader layering.
- Open state: a full-viewport invitation cover includes the "LET'S OPEN" button. The source hides the invite content until that button is clicked; clone uses the same click-to-unlock model and slides/fades the recipient block before fading in the full invitation.
- Background music: source renders `<audio id="song" loop>` with autoplay disabled and starts playback from the invitation open control. MP3: `https://is3.cloudhost.id/externalgroovepublic/MP3/s%C3%B8d%20ven%20-%20infinity%20(lyric%20video)%20(mp3cut.net).mp3`. Local clone asset: `public/audio/reveused/sod-ven-infinity.mp3`.
- Scroll model: native scroll, no Lenis/Locomotive detected. Source CSS uses full-viewport snap panels (`scroll-snap-type: y mandatory`, `scroll-snap-align: start`, `scroll-snap-stop: always`) and temporarily disables snap during open/menu navigation. Clone applies the same opened-state snap model and menu-time snap suppression.
- Mobile viewport sizing: source Elementor panels use `--min-height: 100vh` with background `cover`; the clone uses `.reveused-panel-frame` with `min-height: 100vh` and upgrades to `100dvh` when supported so iOS Safari resizes/crops backgrounds when the address bar collapses instead of keeping the smaller `svh` height.
- Desktop model: at 1440px the left visual panel is fixed (selector [data-id="6849594c"], position fixed, width 980px, height 1200px) and the invitation column scrolls on the right.
- Mobile/tablet model: one full-width invitation column; desktop fixed panel is hidden.
- Hero slideshow: the opening panel uses Elementor background slideshow with 3 images (`00141`, `00195-copy`, `00152`), slide duration 2500ms, transition duration 1500ms, fade, loop enabled.
- Menu: hamburger opens a side menu with Home, Profile, Love Story, Wedding Event, RSVP, Wedding Gift, Gallery links. Source transition values include `all 0.5s cubic-bezier(0.76, 0, 0.24, 1)`, item reveal transitions around 650ms with `cubic-bezier(.215,.61,.355,1)`, and hover underline transitions around 750ms.
- Gallery: original uses Swiper with autoplay 1500ms, speed 1000ms, loop yes, horizontal slides, fraction pagination.
- Gallery preview: original opens a custom fixed lightbox with black 90% backdrop, image preview, prev/next controls, close, keyboard arrows/Escape, outside click, touch swipe, and `current / total` counter. Clone implements the same preview surface and stops autoplay on interaction.
- Save date overlay: source opens a fixed save-date card overlay and downloads `Imam Nandira.png` via canvas capture. Clone opens a matching save-date overlay with close/Escape/backdrop behavior and generates a PNG download from the local image/text composition.
- Video preview: source opens the YouTube prewedding story and pauses background music while the video is active. Clone opens the YouTube iframe and pauses/resumes the local background audio through the same open/close lifecycle.
- Wishes pagination: source shows 4 wishes per page with prev/next opacity transitions. Clone paginates 4 wishes per page and animates page changes.
- Forms/gifts: RSVP is a multi-step form in the source; clone mocks the visual flow. Gift copy buttons copy account numbers.
- Scroll reveal / transitions: original Elementor sections use AOS-style fade entrances with 1000-2000ms durations and staggered delays around 100-800ms, plus transition values including `background 0.3s, border 0.3s, box-shadow 0.3s, transform 0.4s`, `opacity 0.5s ease`, and `transform .65s cubic-bezier(.215,.61,.355,1)`. Clone reveals animated content groups as they enter the viewport, staggers their children, and keeps the full-panel background slow-zoom behavior.
- Hover: Elementor buttons use transition 0.3s. Buttons darken/raise subtly in clone to mirror the original's interactive feel.
- Event QA: `node scripts/inspect-clone-events.mjs http://localhost:3000` passed on mobile viewport. Verified open audio start, scroll snap, menu hover underline, outside close, Save Date modal/download, wishes pagination, gallery lightbox/next, video modal audio pause/resume, and clean console/runtime errors. Results: `docs/research/clone-events-qa.json`; screenshots: `docs/design-references/clone-events-save-date-modal.png`, `docs/design-references/clone-events-gallery-lightbox.png`, `docs/design-references/clone-events-video-preview.png`.

## Scroll Samples
- scrollY 0: (hero / image area)
- scrollY 0: (hero / image area)
- scrollY 0: (hero / image area)
- scrollY 0: (hero / image area)
- scrollY 1441: THE GROOM Imam Faizan The second son of Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Imam
- scrollY 2979: A journey in love SEPTEMBER 2019 2019, we started our journey as two individuals who were just getting to know each other. We were excited to explore what the future held for us and were eager to see where our paths would lead. SEPTEMBER 20
- scrollY 4672: ALMOST TIME FOR OURCELEBRATION 00 DAYS 00 HOURS 00 MINUTES 00 SECONDS SAVE THE DATE
- scrollY 6122: Kindly Confirm Your Presence And Share Your Blessings Kindly express your best wishes and kindly confirm your attendance by using the form provided below. Thank you. 1 2 3 4 NAME NEXT
- scrollY 7416: Imam Nandira A GUIDE TO DRESS CODES We kindly encourage our guests to wear these colors for our special day
