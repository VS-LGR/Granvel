import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "@/styles/globals.css";
import { site } from "@/config/site";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const baseUrl = site.url;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} · Semi-novos selecionados`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.legalName,
    title: `${site.name} · Semi-novos selecionados`,
    description: site.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} ${syne.variable} min-h-screen antialiased`}>{children}</body>
    </html>
  );
}
