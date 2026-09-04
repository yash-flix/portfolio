import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import { site } from "@/lib/data";

const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-grotesk", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const jet = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jet", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — AI engineer who ships`, template: `%s — ${site.name}` },
  description:
    "Yash Rane builds AI agents, RAG pipelines and full-stack products from first principles. B.Tech AI & Data Science, Mumbai, class of 2027.",
  openGraph: {
    title: `${site.name} — AI engineer who ships`,
    description: "AI agents, RAG pipelines and full-stack products, built from first principles and deployed on AWS.",
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", creator: "@yash_ranee" },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${instrument.variable} ${jet.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Intro />
        <Cursor />
        <div className="grain" aria-hidden />
        <Nav />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
