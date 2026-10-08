import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Instrument_Serif, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif-accent", subsets: ["latin"], weight: "400" });
const hand = Caveat({ variable: "--font-hand", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kaushal Sonawane — Software Engineer",
  description:
    "Software engineer from Pune: full-stack & mobile apps (React Native, Next.js) plus cloud/DevOps. Bilingual English · 日本語 (JLPT N4).",
  keywords: ["Software Engineer", "Full Stack", "React Native", "Next.js", "DevOps", "AWS", "Japanese", "Portfolio", "Kaushal Sonawane"],
  authors: [{ name: "Kaushal Sonawane" }],
  openGraph: {
    title: "Kaushal Sonawane — Software Engineer",
    description: "Full-stack & mobile apps, on cloud infrastructure that stays up. English · 日本語OK.",
    url: "https://kaushalsonawane.dev",
    siteName: "Kaushal Sonawane Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Japanese typeface via stylesheet (next/font chokes on Noto Sans JP under Turbopack dev) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500;700&display=swap"
        rel="stylesheet"
      />
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable} ${hand.variable} antialiased`}
        id="top"
      >
        {/* scroll progress */}
        <div id="progress" className="no-print fixed left-0 top-0 z-[100] h-[2px] w-full origin-left scale-x-0 bg-[#ff4d00]" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-lg focus:bg-[#ff4d00] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `addEventListener('scroll',()=>{var h=document.documentElement;var p=h.scrollTop/(h.scrollHeight-h.clientHeight);var b=document.getElementById('progress');if(b)b.style.transform='scaleX('+p+')'},{passive:true})`,
          }}
        />
      </body>
    </html>
  );
}
