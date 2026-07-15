import { giftAccounts, invitationInfo } from "@/components/invitation/content";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const index = Number(url.searchParams.get("index") ?? "0");
  const gift = Number.isInteger(index) ? giftAccounts[index] : undefined;

  if (!gift?.qrImage) {
    return new Response("QR image not found", { status: 404 });
  }

  const qrUrl = new URL(gift.qrImage);
  if (qrUrl.hostname !== "img.vietqr.io") {
    return new Response("Unsupported QR host", { status: 400 });
  }

  const response = await fetch(qrUrl, { cache: "force-cache" });

  if (!response.ok || !response.body) {
    return new Response("Unable to fetch QR image", { status: 502 });
  }

  const account = gift.account.replace(/\D/g, "");
  const filename = `${invitationInfo.slug}-${gift.bank.toLowerCase()}-${account}-qr.png`;

  return new Response(response.body, {
    headers: {
      "Cache-Control": "public, max-age=86400",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": response.headers.get("content-type") ?? "image/png",
    },
  });
}
