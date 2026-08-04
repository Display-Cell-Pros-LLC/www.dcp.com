import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Display & Cell Pros LLC | Tier 3 Micro-Soldering & Data-Secure Repair",
  description:
    "Combat Veteran & Tribal Member-Owned. Tier 3 precision micro-soldering, mobile data-secure device repair, and federal procurement contracting. Mission-grade repair you can trust.",
  keywords: [
    "micro-soldering",
    "data-secure repair",
    "federal procurement",
    "veteran-owned",
    "board-level repair",
    "Tier 3 repair",
  ],
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#101725",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark bg-background ${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
