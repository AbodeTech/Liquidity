import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { QueryProvider } from "@/components/providers/query-provider"

import {
  Inter,
  Geist_Mono,
} from "next/font/google"

// Initialize fonts
const _inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
})
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Liquide - Affordable Micro-Mortgages for Rent & Land",
  description:
    "Get flexible micro-mortgage loans for rent and land acquisition. Monthly repayments from ₦50,000. Apply today and get approved in 24 hours.",
  icons: {
    icon: "/Logo.svg",
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
        <QueryProvider>
          {children}
          <Toaster />
          <Analytics />
        </QueryProvider>
      </body>
    </html>
  )
}
