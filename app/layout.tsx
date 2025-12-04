import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

import {
  Inter as V0_Font_Inter,
  Geist_Mono as V0_Font_Geist_Mono,
} from "next/font/google"

// Initialize fonts
const _inter = V0_Font_Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
})
const geistMono = V0_Font_Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Liquidity - Affordable Micro-Mortgages for Rent & Land",
  description:
    "Get flexible micro-mortgage loans for rent and land acquisition. Monthly repayments from ₦50,000. Apply today and get approved in 24 hours.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${geistMono.variable} ${_inter.variable}`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
