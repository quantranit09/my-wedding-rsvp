import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const mobile = JSON.parse(await readFile(path.join(root, "docs/research/reveused-mobile-after-open.json"), "utf8"));
const desktop = JSON.parse(await readFile(path.join(root, "docs/research/reveused-desktop-after-open.json"), "utf8"));
const before = JSON.parse(await readFile(path.join(root, "docs/research/reveused-mobile-before-open.json"), "utf8"));
const manifest = JSON.parse(await readFile(path.join(root, "docs/research/ASSET_MANIFEST.json"), "utf8"));

const components = [
  ["OpeningHero", "src/components/reveused/OpeningHero.tsx", 0, "opening cover + unlocked hero"],
  ["ScriptureQuoteSection", "src/components/reveused/ScriptureQuoteSection.tsx", 1, "static"],
  ["GroomProfileSection", "src/components/reveused/GroomProfileSection.tsx", 2, "static with external Instagram link"],
  ["BrideProfileSection", "src/components/reveused/BrideProfileSection.tsx", 3, "static with external Instagram link"],
  ["LoveStorySection", "src/components/reveused/LoveStorySection.tsx", 4, "static timeline"],
  ["WeddingDateSection", "src/components/reveused/WeddingDateSection.tsx", 5, "static"],
  ["CountdownSection", "src/components/reveused/CountdownSection.tsx", 6, "time-driven countdown display frozen at zero in capture"],
  ["RsvpSection", "src/components/reveused/RsvpSection.tsx", 7, "click/form-driven mock RSVP"],
  ["WishesSection", "src/components/reveused/WishesSection.tsx", 8, "click-driven carousel controls mocked"],
  ["DressCodeSection", "src/components/reveused/DressCodeSection.tsx", 9, "static"],
  ["StreamingSection", "src/components/reveused/StreamingSection.tsx", 10, "external link"],
  ["GiftSection", "src/components/reveused/GiftSection.tsx", 11, "copy-button interactions"],
  ["GallerySection", "src/components/reveused/GallerySection.tsx", 12, "time/click-driven image carousel"],
  ["VideoStorySection", "src/components/reveused/VideoStorySection.tsx", 13, "click-driven video play placeholder"],
  ["ClosingSection", "src/components/reveused/ClosingSection.tsx", 14, "static footer links"],
  ["DesktopFixedPanel", "src/components/reveused/DesktopFixedPanel.tsx", null, "fixed desktop-only visual panel"],
  ["SideMenu", "src/components/reveused/SideMenu.tsx", null, "click-driven menu overlay"],
  ["Preloader", "src/components/reveused/Preloader.tsx", null, "time-driven loading overlay"],
];

function localPath(url) {
  if (!url) return "N/A";
  const result = manifest.results.find((item) => item.url === url);
  return result?.destination ? `public/${result.destination.replace(/^public\//, "")}` : url;
}

function firstBackground(panel) {
  const value = panel?.backgroundImage || "";
  const match = value.match(/url\("?(.*?)"?\)/);
  return match ? match[1] : "";
}

function styleList(styles) {
  return Object.entries(styles || {})
    .slice(0, 32)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");
}

function headingList(panel) {
  return (panel?.headings || [])
    .slice(0, 16)
    .map((heading) => `- "${heading.text}" — ${heading.styles.fontFamily || "font n/a"}, ${heading.styles.fontSize || "size n/a"}, ${heading.styles.fontWeight || "weight n/a"}, ${heading.styles.lineHeight || "line-height n/a"}`)
    .join("\n");
}

await mkdir(path.join(root, "docs/research/components"), { recursive: true });

await writeFile(
  path.join(root, "docs/research/BEHAVIORS.md"),
  `# Reveused Behaviors

## Source
- Target: https://groovepublic.com/reveused/
- Desktop screenshot: docs/design-references/reveused-desktop-after-open.png
- Mobile screenshot: docs/design-references/reveused-mobile-after-open.png

## Interaction Sweep
- Initial state: fixed preloader covers the page with background rgb(16, 16, 16), opacity transition 1s, z-index 9999999. Captured text: "${before.sections[1]?.text || "THE WEDDING OF IMAM NANDIRA LOADING..."}".
- Open state: a full-viewport invitation cover includes the "LET'S OPEN" button. The source hides the invite content until that button is clicked; clone uses the same click-to-unlock model.
- Scroll model: native scroll, no Lenis/Locomotive detected. The invitation is a sequence of full-viewport panels; no scroll snap was detected in computed styles.
- Desktop model: at 1440px the left visual panel is fixed (selector [data-id="6849594c"], position fixed, width ${desktop.fixed[0]?.rect.width}px, height ${desktop.fixed[0]?.rect.height}px) and the invitation column scrolls on the right.
- Mobile/tablet model: one full-width invitation column; desktop fixed panel is hidden.
- Menu: hamburger opens a side menu with Home, Profile, Love Story, Wedding Event, RSVP, Wedding Gift, Gallery links.
- Gallery: original uses Swiper with autoplay 1500ms, speed 1000ms, loop yes, horizontal slides, fraction pagination.
- Forms/gifts: RSVP is a multi-step form in the source; clone mocks the visual flow. Gift copy buttons copy account numbers.
- Hover: Elementor buttons use transition 0.3s. Buttons darken/raise subtly in clone to mirror the original's interactive feel.

## Scroll Samples
${mobile.scrollSweep
  .map((sample) => `- scrollY ${sample.scrollY}: ${sample.activeText || "(hero / image area)"}`)
  .join("\n")}
`,
);

await writeFile(
  path.join(root, "docs/research/PAGE_TOPOLOGY.md"),
  `# Reveused Page Topology

## Global Layout
- Body background: black on desktop, invitation column itself is 390px mobile / ~460px desktop.
- Root sequence: preloader -> cover/open state -> scrollable invitation panels.
- Fixed overlays: desktop left image/title panel; hamburger menu button; side menu overlay when opened.

## Sections
${mobile.panels
  .map((panel, index) => {
    const component = components.find((item) => item[2] === index);
    const bg = localPath(firstBackground(panel));
    return `${index + 1}. ${component?.[0] || panel.id || panel.dataId}
   - Selector: ${panel.selector}
   - ID/data-id: ${panel.id || "none"} / ${panel.dataId}
   - Mobile rect: ${panel.rect.width}x${panel.rect.height} at y=${panel.rect.y}
   - Desktop rect: ${desktop.panels[index]?.rect.width}x${desktop.panels[index]?.rect.height} at y=${desktop.panels[index]?.rect.y}
   - Interaction model: ${component?.[3] || "static"}
   - Background: ${bg}
   - Text: ${panel.text.slice(0, 220)}${panel.text.length > 220 ? "..." : ""}`;
  })
  .join("\n\n")}
`,
);

await writeFile(
  path.join(root, "docs/research/DESIGN_TOKENS.md"),
  `# Reveused Design Tokens

## Fonts
${mobile.fonts.slice(0, 24).map(([font, count]) => `- ${font} (${count})`).join("\n")}

## Colors
${mobile.colors.slice(0, 24).map(([color, count]) => `- ${color} (${count})`).join("\n")}

## Assets
- Images: ${manifest.images}
- Videos: ${manifest.videos}
- Favicons: ${manifest.favicons}
- Fonts: ${manifest.fonts}

## Responsive
- 1440px: fixed left panel + right invitation column.
- 768px: invitation column fills viewport width.
- 390px: invitation column fills viewport width; panels use height 844px in capture and 100svh in implementation.
`,
);

for (const [name, target, panelIndex, model] of components) {
  const panel = typeof panelIndex === "number" ? mobile.panels[panelIndex] : null;
  const desktopPanel = typeof panelIndex === "number" ? desktop.panels[panelIndex] : null;
  const screenshot =
    typeof panelIndex === "number"
      ? `docs/design-references/reveused-mobile-${String(panelIndex + 1).padStart(2, "0")}-${panel.id || panel.dataId}.png`
      : `docs/design-references/reveused-mobile-after-open.png`;

  const body =
    panel === null
      ? `# ${name} Specification

## Overview
- **Target file:** \`${target}\`
- **Screenshot:** \`${screenshot}\`
- **Interaction model:** ${model}

## DOM Structure
- Implemented as a supporting component for the invitation shell.
- Uses fixed/absolute positioning where the source does.

## Computed Styles (exact values from getComputedStyle)
- See \`docs/research/reveused-mobile-after-open.json\` and \`docs/research/reveused-desktop-after-open.json\`.

## States & Behaviors
- Preloader: time-driven, fades out after load.
- SideMenu: click-driven open/close.
- DesktopFixedPanel: desktop-only fixed panel with source position fixed.

## Assets
- Desktop background: \`public/images/reveused/reveused-imam-nandira-00162.jpg.jpeg\`
- Menu text links target panel IDs.

## Text Content (verbatim)
- Side menu: Home, Profile, Love Story, Wedding Event, RSVP, Wedding Gift, Gallery.
- Preloader: THE WEDDING OF IMAM NANDIRA LOADING...

## Responsive Behavior
- Desktop (1440px): fixed panel visible.
- Tablet (768px): hidden except menu overlay.
- Mobile (390px): hidden except menu overlay.
`
      : `# ${name} Specification

## Overview
- **Target file:** \`${target}\`
- **Screenshot:** \`${screenshot}\`
- **Interaction model:** ${model}

## DOM Structure
- Full-viewport \`section\` inside the invitation column.
- Absolute background layer from local asset.
- Dark overlay/gradient layer.
- Foreground content group with extracted text.

## Computed Styles (exact values from getComputedStyle)

### Mobile Container
${styleList(panel.styles)}

### Desktop Container
${styleList(desktopPanel?.styles)}

### Text Nodes / Headings
${headingList(panel) || "- N/A"}

## States & Behaviors
- Entrance animations in source use Elementor/AOS fade/zoom classes. Clone uses CSS fade-up for panel content.
- Hover states: buttons transition over 0.3s, matching source button transition.
- Stateful details: ${model}.

## Per-State Content
- N/A unless noted in behavior model above.

## Assets
- Background image: \`${localPath(firstBackground(panel))}\`
- Section screenshot: \`${screenshot}\`

## Text Content (verbatim)
${panel.text || "N/A"}

## Responsive Behavior
- **Desktop (1440px):** ${desktopPanel?.rect.width}px wide column panel, ${desktopPanel?.rect.height}px tall; left desktop panel remains fixed.
- **Tablet (768px):** full-width panel, ${JSON.parse(await readFile(path.join(root, "docs/research/reveused-tablet-after-open.json"), "utf8")).panels[panelIndex]?.rect.height}px tall in capture.
- **Mobile (390px):** ${panel.rect.width}px wide, ${panel.rect.height}px tall in capture; implementation uses 100svh.
- **Breakpoint:** fixed desktop panel appears above ~1024px.
`;

  await writeFile(path.join(root, `docs/research/components/${name}.spec.md`), body);
}

console.log(`Wrote ${components.length} component specs plus research docs`);
