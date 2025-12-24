"use client"

import Link from "next/link"
import { ArrowRight, TrendingUp, Banknote, Clock, CheckCircle, Shield, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-[#fafaf8] w-full">

      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 w-full h-full">
        {/* 1. The Requested Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* 2. Soft Gradient Blurs for depth */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#1a4d3e]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#d4a574]/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">

          {/* --- LEFT CONTENT --- */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left animate-in slide-in-from-bottom-8 duration-700 fade-in">

            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-[#1a4d3e]/20 px-4 py-2 rounded-full mb-8 shadow-sm hover:bg-white transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1a4d3e] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1a4d3e]" />
              </span>
              <span className="text-xs sm:text-sm text-[#1a4d3e] font-medium tracking-tight">
                Now serving 1,200+ customers
              </span>
              <ArrowRight className="h-3 w-3 text-[#1a4d3e] ml-1" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-[#1a1a1a] mb-6 leading-[1.1] tracking-tight">
              Property Financing for{" "}
              <span className="text-[#1a4d3e] relative inline-block whitespace-nowrap">
                Every Nigerian
                {/* SVG Underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 sm:h-4 text-[#d4a574]"
                  viewBox="0 0 200 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.00025 7.00005C50.0003 1.00005 150.003 -3.99995 198.003 5.00005"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-60"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-xl text-[#525252] mb-10 leading-relaxed max-w-lg lg:max-w-xl">
              Access quick and affordable loans for rent payments and land purchases.
              Simple application, fast approval, flexible repayment plans.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                asChild
                className="group text-base px-8 h-14 rounded-full bg-[#1a4d3e] hover:bg-[#143b30] text-white shadow-lg shadow-[#1a4d3e]/20 hover:shadow-xl hover:shadow-[#1a4d3e]/30 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
              >
                <Link href="/dashboard/apply">
                  Apply for Loan
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base px-8 h-14 rounded-full border-[#1a4d3e]/20 text-[#1a4d3e] bg-white/50 hover:bg-white backdrop-blur-sm transition-all duration-300 w-full sm:w-auto"
              >
                <Link href="/calculator">Calculate Payment</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-12 pt-8 border-t border-[#1a1a1a]/5 w-full lg:w-auto justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[
                  { initial: "AO", bg: "bg-[#1a4d3e]" },
                  { initial: "CB", bg: "bg-[#8b7355]" },
                  { initial: "EK", bg: "bg-[#2d5a4a]" },
                  { initial: "IF", bg: "bg-[#d4a574]" },
                ].map((user, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-[3px] border-[#fafaf8] ${user.bg} flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}
                  >
                    {user.initial}
                  </div>
                ))}
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
                  ))}
                </div>
                <p className="text-sm text-[#525252]">
                  <span className="text-[#1a1a1a] font-bold">4.9/5</span> from 800+ reviews
                </p>
              </div>
            </div>
          </div>

          {/* --- RIGHT VISUAL (PHONE) --- */}
          <div className="relative flex justify-center lg:justify-center   mt-8 lg:mt-0 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <div className="relative transform sm:scale-95 xl:scale-100 transition-transform">

              {/* Phone Frame */}
              <div className="relative w-[300px] sm:w-[340px] h-[640px] sm:h-[700px] bg-[#1a1a1a] rounded-[3rem] p-3 shadow-[0_30px_60px_-12px_rgba(26,77,62,0.3)] ring-1 ring-white/10">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-2xl z-20" />

                {/* Screen */}
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative flex flex-col">

                  {/* Internal Content */}
                  <div className="p-6 h-full flex flex-col bg-gradient-to-b from-white to-[#f8f9fa]">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center mb-6 pt-2 opacity-40">
                      <span className="text-[10px] font-bold">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2.5 bg-black rounded-[2px]" />
                      </div>
                    </div>

                    {/* Balance Card */}
                    <div className="bg-[#1a4d3e] rounded-2xl p-5 mb-5 relative overflow-hidden shadow-lg group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/15 transition-colors" />
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#d4a574]/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />

                      <p className="text-[11px] text-white/70 mb-1 font-medium uppercase tracking-wider">Available Credit</p>
                      <p className="text-3xl font-bold text-white tracking-tight mb-4">₦2,500,000</p>

                      <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/5 backdrop-blur-md px-2.5 py-1.5 rounded-lg">
                        <TrendingUp className="h-3 w-3 text-[#4ade80]" />
                        <span className="text-[10px] text-white font-medium">Pre-approved</span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                        <div className="w-8 h-8 bg-[#1a4d3e]/5 rounded-lg flex items-center justify-center mb-3">
                          <Banknote className="h-4 w-4 text-[#1a4d3e]" />
                        </div>
                        <p className="text-[10px] text-gray-500 mb-0.5">Monthly Payment</p>
                        <p className="text-base font-bold text-[#1a1a1a]">₦85,000</p>
                      </div>
                      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                        <div className="w-8 h-8 bg-[#1a4d3e]/5 rounded-lg flex items-center justify-center mb-3">
                          <Clock className="h-4 w-4 text-[#1a4d3e]" />
                        </div>
                        <p className="text-[10px] text-gray-500 mb-0.5">Tenure Duration</p>
                        <p className="text-base font-bold text-[#1a1a1a]">24 months</p>
                      </div>
                    </div>

                    {/* Active Loan */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-4 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-bold text-[#1a1a1a]">Rent Loan</span>
                        <span className="text-[10px] text-[#1a4d3e] bg-[#1a4d3e]/10 px-2 py-0.5 rounded-full font-bold">Active</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                        <div className="w-[33%] h-full bg-[#1a4d3e] rounded-full" />
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-500">
                        <span>₦340k paid</span>
                        <span>₦1.02M total</span>
                      </div>
                    </div>

                    {/* Phone CTA */}
                    <div className="mt-auto">
                      <div className="bg-[#1a1a1a] text-white rounded-xl p-4 text-center cursor-pointer shadow-lg hover:bg-black transition-colors">
                        <span className="text-sm font-semibold">Apply for New Loan</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Element 1 - Top Left */}
              <div className="absolute top-12 -left-4 sm:-left-12 bg-white/95 backdrop-blur rounded-2xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#e6f4f1] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#1a4d3e]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1a1a1a]">24hr Approval</p>
                    <p className="text-[10px] text-gray-500">Fast processing</p>
                  </div>
                </div>
              </div>

              {/* Floating Element 2 - Bottom Left */}
              <div className="absolute bottom-24 -left-8 sm:-left-16 bg-white/95 backdrop-blur rounded-2xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#fff8f0] rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-[#d4a574]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1a1a1a]">Secure</p>
                    <p className="text-[10px] text-gray-500">Bank-level security</p>
                  </div>
                </div>
              </div>

              {/* Decorative Sparkle */}
              <div className="absolute top-1/3 -right-6 bg-[#1a4d3e] p-2 rounded-full shadow-lg text-white animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}