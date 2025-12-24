"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Home, Clock, Shield, Calculator, CheckCircle, Building2, Landmark } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import HeroSection from "@/components/LandingPage" // Assuming this is where you put the Hero code
import CtaSection from "@/components/CtaSection" // Assuming this is where you put the CTA code

const words = ["Home", "Land"]

export default function LandingPage() {
  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    // Applied the Off-White background globally to match Hero
    <div className="min-h-screen bg-[#fafaf8] selection:bg-[#1a4d3e] selection:text-white">

      {/* Navigation - Updated to match off-white theme */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 border-b border-[#1a4d3e]/5 bg-[#fafaf8]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#fafaf8]/60"
      >
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="inline-block transition-opacity hover:opacity-80">
            <div className="relative h-10 w-32 md:h-12 md:w-40">
              <Image
                src="/LIQUIDELogo.png"
                alt="Liquide Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
              className="text-sm font-medium text-[#666666] hover:text-[#1a4d3e] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#loan-types"
              onClick={(e) => handleSmoothScroll(e, "#loan-types")}
              className="text-sm font-medium text-[#666666] hover:text-[#1a4d3e] transition-colors"
            >
              Loan Types
            </a>
            <Link href="/calculator" className="text-sm font-medium text-[#666666] hover:text-[#1a4d3e] transition-colors">
              Calculator
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="text-[#1a4d3e] hover:text-[#1a4d3e] hover:bg-[#1a4d3e]/5">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-[#1a4d3e] hover:bg-[#153d32] text-white rounded-full px-6 shadow-lg shadow-[#1a4d3e]/20">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Add padding top to account for fixed nav */}
      <div className="pt-20">
        <HeroSection />
      </div>

      {/* Stats Section - High Contrast Dark Strip */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-[#1a4d3e] py-16 relative overflow-hidden"
      >
        {/* Background texture for the green section */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
            {[
              { value: "₦500k+", label: "Loans Disbursed" },
              { value: "1,200+", label: "Happy Customers" },
              { value: "24hrs", label: "Approval Time" },
              { value: "12-36", label: "Months Tenure" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works - Added Grid Background from Hero */}
      <section id="how-it-works" className="py-24 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 tracking-tight">How It Works</h2>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">Get your property financing sorted in 4 simple steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-[#1a4d3e]/20 to-transparent z-0" />

            {[
              {
                icon: Building2,
                title: "Choose Type",
                description: "Select rent financing or land purchase loan",
              },
              { icon: Clock, title: "Quick Apply", description: "Fill out our simple online form in 5 minutes" },
              { icon: Shield, title: "Fast Review", description: "Get your application reviewed within 24 hours" },
              {
                icon: CheckCircle,
                title: "Get Funded",
                description: "Funds disbursed directly to landlord or developer",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative z-10 text-center group"
              >
                <div className="w-16 h-16 bg-white border border-[#1a4d3e]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#1a4d3e]/5 group-hover:scale-110 group-hover:border-[#1a4d3e]/30 transition-all duration-300">
                  <step.icon className="h-7 w-7 text-[#1a4d3e]" />
                </div>
                <div className="text-xs font-bold text-[#1a4d3e] uppercase tracking-wider mb-2 bg-[#1a4d3e]/5 inline-block px-3 py-1 rounded-full">
                  Step {index + 1}
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{step.title}</h3>
                <p className="text-[#666666] leading-relaxed px-4">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Types - Bento Card Style */}
      <section id="loan-types" className="py-24 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 tracking-tight">Our Loan Products</h2>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">Flexible financing options designed for the Nigerian market</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Rent Loan Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#e5e5e5] shadow-sm hover:shadow-2xl hover:shadow-[#1a4d3e]/10 hover:border-[#1a4d3e]/20 transition-all duration-500">
                <div className="w-14 h-14 bg-[#1a4d3e]/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#1a4d3e] transition-colors duration-500">
                  <Home className="h-7 w-7 text-[#1a4d3e] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-3xl font-bold text-[#1a1a1a] mb-4">Rent Loan</h3>
                <p className="text-[#666666] mb-8 leading-relaxed text-lg">
                  Don't let bulk rent payments stress you. We pay your landlord upfront, and you repay us in convenient monthly installments.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Up to ₦5 Million", "Instant Pre-approval", "Flexible Repayment"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#525252]">
                      <div className="w-5 h-5 rounded-full bg-[#1a4d3e]/10 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-[#1a4d3e]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full h-12 rounded-xl bg-[#1a1a1a] hover:bg-[#1a4d3e] text-white transition-all duration-300">
                  <Link href="/dashboard/apply/rent">Apply for Rent Loan</Link>
                </Button>
              </div>
            </motion.div>

            {/* Land Loan Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#e5e5e5] shadow-sm hover:shadow-2xl hover:shadow-[#1a4d3e]/10 hover:border-[#1a4d3e]/20 transition-all duration-500">
                <div className="w-14 h-14 bg-[#d4a574]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#d4a574] transition-colors duration-500">
                  <Landmark className="h-7 w-7 text-[#d4a574] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-3xl font-bold text-[#1a1a1a] mb-4">Land Loan</h3>
                <p className="text-[#666666] mb-8 leading-relaxed text-lg">
                  Secure your plot of land today. We finance the purchase from verified developers while you pay over time.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Verified Titles", "Direct to Developer", "Up to 36 Months"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#525252]">
                      <div className="w-5 h-5 rounded-full bg-[#d4a574]/20 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-[#d4a574]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full h-12 rounded-xl bg-white border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300">
                  <Link href="/dashboard/apply/land">Apply for Land Loan</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Minimal Style */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6">Why Choose Liquide?</h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">
            We make homeownership accessible with transparent processes and a customer-first approach.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Clock,
              title: "Fast Approval",
              description: "Get approved within 24 hours. We value your time and make the process seamless.",
              color: "text-[#1a4d3e]",
              bg: "bg-[#1a4d3e]/10"
            },
            {
              icon: Shield,
              title: "Secure & Trusted",
              description: "Your data is protected with bank-level security. We are fully compliant with regulations.",
              color: "text-[#d4a574]",
              bg: "bg-[#d4a574]/10"
            },
            {
              icon: Calculator,
              title: "Transparent Pricing",
              description: "No hidden fees. Calculate your exact repayment amount before you even apply.",
              color: "text-[#1a1a1a]",
              bg: "bg-[#1a1a1a]/10"
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-[#1a4d3e]/5 transition-all duration-300"
            >
              <div className={`${feature.bg} p-4 rounded-2xl mb-6`}>
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{feature.title}</h3>
              <p className="text-[#666666] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />

      {/* Footer - Matched to Dark Green Theme */}
      <footer className="bg-[#1a4d3e] text-white pt-20 pb-10 rounded-t-[3rem] mt-[-2rem] relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                {/* Placeholder for White Logo version */}
                <span className="text-2xl font-bold">Liquide.</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Making home and land financing accessible to all Nigerians through technology and trust.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-[#d4a574]">Quick Links</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/calculator" className="hover:text-white transition-colors">Loan Calculator</Link></li>
                <li><Link href="/dashboard/apply" className="hover:text-white transition-colors">Apply for Loan</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-[#d4a574]">Legal</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-[#d4a574]">Contact</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex items-center gap-2">support@liquide.ng</li>
                <li>Lagos, Nigeria</li>
                <li className="pt-2 flex gap-4">
                  {/* Social Icons Placeholders */}
                  <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#d4a574] transition-colors cursor-pointer" />
                  <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#d4a574] transition-colors cursor-pointer" />
                  <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#d4a574] transition-colors cursor-pointer" />
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>© {new Date().getFullYear()} Liquide. All rights reserved.</p>
            <p>Designed for Nigerian Homes.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}