import type { Metadata } from "next";

import { invitationInfo } from "@/components/invitation/content";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: invitationInfo.metaTitle,
  description: invitationInfo.metaDescription,
  openGraph: {
    title: invitationInfo.metaTitle,
    description: invitationInfo.metaDescription,
    images: ["/images/our-images/optimized/NgocQuan.8935.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
