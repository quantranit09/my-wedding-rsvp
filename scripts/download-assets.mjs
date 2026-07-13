import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const outRoot = process.cwd();
const inspection = JSON.parse(
  await readFile(path.join(outRoot, "docs/research/reveused-mobile-after-open.json"), "utf8"),
);

const fontAssets = [
  ["Lausanne-300.ttf", "https://groovepublic.com/wp-content/uploads/2025/02/Lausanne-300.ttf"],
  ["Candlefish.ttf", "https://groovepublic.com/wp-content/uploads/2024/09/Candlefish.ttf"],
  ["TimesNow-SemiBold.ttf", "https://groovepublic.com/wp-content/uploads/2024/07/TimesNow-SemiBold.ttf"],
  ["TimesNow-SemiLight.ttf", "https://groovepublic.com/wp-content/uploads/2024/07/TimesNow-SemiLight.ttf"],
  ["TimesNow-Light.ttf", "https://groovepublic.com/wp-content/uploads/2024/07/TimesNow-Light.ttf"],
  ["Ovo-Regular.ttf", "https://groovepublic.com/wp-content/uploads/2024/05/Ovo-Regular.ttf"],
  ["Legan.ttf", "https://groovepublic.com/wp-content/uploads/2024/04/Legan.ttf"],
  ["Thesignature.ttf", "https://groovepublic.com/wp-content/uploads/2023/12/Thesignature.ttf"],
  ["Inter-VariableFont_slntwght.ttf", "https://groovepublic.com/wp-content/uploads/2023/11/Inter-VariableFont_slntwght.ttf"],
  ["Roxborough-CF.ttf", "https://groovepublic.com/wp-content/uploads/2021/10/Roxborough-CF.ttf"],
];

const audioAssets = [
  [
    "sod-ven-infinity.mp3",
    "https://is3.cloudhost.id/externalgroovepublic/MP3/s%C3%B8d%20ven%20-%20infinity%20(lyric%20video)%20(mp3cut.net).mp3",
  ],
];

function urlsFromBackground(value) {
  return Array.from(value.matchAll(/url\(["']?([^"')]+)["']?\)/g)).map((match) => match[1]);
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function filenameFromUrl(url) {
  const parsed = new URL(url);
  const filename = decodeURIComponent(path.basename(parsed.pathname));
  return filename.replace(/[^a-zA-Z0-9._-]/g, "-");
}

function destinationFor(url) {
  const audioAsset = audioAssets.find(([, assetUrl]) => assetUrl === url);
  if (audioAsset) {
    return path.join(outRoot, "public/audio/reveused", audioAsset[0]);
  }

  const parsed = new URL(url);
  const ext = path.extname(parsed.pathname).toLowerCase();
  if ([".ttf", ".otf", ".woff", ".woff2"].includes(ext)) {
    return path.join(outRoot, "public/fonts/reveused", filenameFromUrl(url));
  }
  if ([".mp4", ".webm", ".mov", ".m4v"].includes(ext)) {
    return path.join(outRoot, "public/videos/reveused", filenameFromUrl(url));
  }
  if ([".mp3", ".m4a", ".ogg", ".wav"].includes(ext)) {
    return path.join(outRoot, "public/audio/reveused", filenameFromUrl(url));
  }
  if (parsed.pathname.includes("favicon") || parsed.pathname.includes("apple-touch-icon")) {
    return path.join(outRoot, "public/seo", filenameFromUrl(url));
  }
  return path.join(outRoot, "public/images/reveused", filenameFromUrl(url));
}

const imageUrls = unique([
  ...inspection.assets.images.map((asset) => asset.src),
  ...inspection.assets.backgroundImages.flatMap((asset) => urlsFromBackground(asset.url)),
  inspection.meta.ogImage,
]).filter((url) => url.startsWith("http") && !url.includes("groovepublic.com/reveused/"));

const videoUrls = unique([
  ...inspection.assets.videos.map((asset) => asset.src),
  ...inspection.assets.videos.map((asset) => asset.poster),
]).filter((url) => url.startsWith("http"));

const faviconUrls = unique(inspection.assets.favicons.map((asset) => asset.href)).filter((url) =>
  url.startsWith("http"),
);

const downloads = [
  ...imageUrls,
  ...videoUrls,
  ...faviconUrls,
  ...fontAssets.map(([, url]) => url),
  ...audioAssets.map(([, url]) => url),
];

await Promise.all([
  mkdir(path.join(outRoot, "public/images/reveused"), { recursive: true }),
  mkdir(path.join(outRoot, "public/videos/reveused"), { recursive: true }),
  mkdir(path.join(outRoot, "public/audio/reveused"), { recursive: true }),
  mkdir(path.join(outRoot, "public/fonts/reveused"), { recursive: true }),
  mkdir(path.join(outRoot, "public/seo"), { recursive: true }),
]);

async function download(url) {
  const destination = destinationFor(url);
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed ${response.status} ${url}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(destination, buffer);
  return { url, destination: path.relative(outRoot, destination), bytes: buffer.byteLength };
}

const results = [];
const queue = [...downloads];
const workers = Array.from({ length: 4 }, async () => {
  while (queue.length) {
    const url = queue.shift();
    if (!url) continue;
    try {
      results.push(await download(url));
    } catch (error) {
      results.push({ url, error: error.message });
    }
  }
});

await Promise.all(workers);

await writeFile(
  path.join(outRoot, "docs/research/ASSET_MANIFEST.json"),
  JSON.stringify(
    {
      images: imageUrls.length,
      videos: videoUrls.length,
      audio: audioAssets.length,
      favicons: faviconUrls.length,
      fonts: fontAssets.length,
      results: results.sort((a, b) => a.url.localeCompare(b.url)),
    },
    null,
    2,
  ),
);

const failed = results.filter((result) => result.error);
console.log(`Downloaded ${results.length - failed.length}/${results.length} assets`);
if (failed.length) {
  console.log(JSON.stringify(failed, null, 2));
}
