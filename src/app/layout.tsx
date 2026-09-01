import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaushal Sonawane | DevOps & Cloud Engineer",
  description: "Associate DevOps Engineer specializing in Cloud, DevOps, AI/ML, and Full Stack Development. Pune, India.",
  keywords: ["DevOps", "Cloud", "AWS", "Kubernetes", "AI", "Full Stack", "Portfolio", "Kaushal Sonawane"],
  authors: [{ name: "Kaushal Sonawane" }],
  openGraph: {
    title: "Kaushal Sonawane | DevOps & Cloud Engineer",
    description: "Associate DevOps Engineer crafting scalable cloud infrastructure and intelligent applications.",
    url: "https://kaushalsonawane.dev",
    siteName: "Kaushal Sonawane Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Kaushal2910",
  },
  metadataBase: new URL("https://kaushalsonawane.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-lg focus:bg-amber-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
