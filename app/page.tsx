"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Home, Clock, Shield, Calculator, CheckCircle, Building2, Landmark } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image src="/Logo.svg" alt="Liquidity Logo" fill className="object-contain" />
            </div>
            <span className="text-2xl font-bold text-foreground">Liquidity</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              How It Works
            </a>
            <a
              href="#loan-types"
              onClick={(e) => handleSmoothScroll(e, "#loan-types")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Loan Types
            </a>
            <Link href="/calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Calculator
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWord}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  currentWord === 0
                    ? `url('/modern-nigerian-luxury-apartments-at-sunset.jpg')`
                    : `url('/modern-nigerian-housing-estate-gated-community.jpg')`,
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Get Your{" "}
                <span className="relative inline-block">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWord}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-primary inline-block"
                    >
                      {words[currentWord]}
                    </motion.span>
                  </AnimatePresence>
                </span>{" "}
                Financing Today
              </h1>
              <p className="text-gray-600 dark:text-gray-300">We&apos;re here to help you every step of the way.</p>           <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
                Access quick and affordable loans for rent payments and land purchases. Simple application, fast
                approval, flexible repayment plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8">
                  <Link href="/apply">
                    Apply for Loan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Link href="/calculator">Calculate Payment</Link>
                </Button>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12 flex flex-wrap gap-6"
            >
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>24-Hour Approval</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Low Interest Rates</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>No Hidden Fees</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="bg-linear-to-br from-muted/80 to-muted/40 py-12 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "₦500k+", label: "Loans Disbursed" },
              { value: "1,200+", label: "Happy Customers" },
              { value: "24hrs", label: "Approval Time" },
              { value: "12-36", label: "Months Tenure" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Get your loan in 4 simple steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Building2,
                title: "Choose Loan Type",
                description: "Select rent financing or land purchase loan",
              },
              { icon: Clock, title: "Quick Application", description: "Fill out our simple online form in minutes" },
              { icon: Shield, title: "Fast Review", description: "Get your application reviewed within 24 hours" },
              {
                icon: CheckCircle,
                title: "Receive Funds",
                description: "Funds disbursed directly to landlord or developer",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm text-primary font-medium mb-2">Step {index + 1}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section id="loan-types" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Loan Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Choose the financing option that suits your needs</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Rent Loan */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <Home className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Rent Loan</h3>
                  <p className="text-muted-foreground mb-6">
                    Get financing for your annual rent payment. We pay your landlord directly while you repay in
                    comfortable monthly installments.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/dashboard/apply/rent">Apply for Rent Loan</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Land Loan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <Landmark className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Land Loan</h3>
                  <p className="text-muted-foreground mb-6">
                    Finance your land purchase with flexible payment options. We work with verified developers to secure
                    your property.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/dashboard/apply/land">Apply for Land Loan</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Liquidity?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We make homeownership accessible with transparent processes and customer-first approach.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Clock,
              title: "Fast Approval",
              description: "Get approved within 24 hours. We value your time and make the process seamless.",
            },
            {
              icon: Shield,
              title: "Secure & Trusted",
              description: "Your data is protected with bank-level security. We are fully compliant with regulations.",
            },
            {
              icon: Calculator,
              title: "Transparent Pricing",
              description: "No hidden fees. Calculate your exact repayment amount before you apply.",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="relative py-20 overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-accent z-10" />
          <Image
            src="/modern-nigerian-housing-estate-gated-community.jpg"
            alt="Nigerian Housing Estate"
            fill
            className="object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-white">Ready to Get Started?</h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto text-pretty leading-relaxed">
            Join thousands of Nigerians who have achieved their property goals with Liquidity. Apply today and get
            approved in 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="shadow-xl">
              <Link href="/apply">Start Your Application</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-transparent border-white/40 text-white hover:bg-white/10 backdrop-blur"
            >
              <Link href="/calculator">Try Our Calculator</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Liquidity</h3>
              <p className="text-background/70 text-sm">Making home and land financing accessible to all Nigerians.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <Link href="/about" className="hover:text-background">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/calculator" className="hover:text-background">
                    Loan Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/apply" className="hover:text-background">
                    Apply for Loan
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <Link href="/terms" className="hover:text-background">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-background">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>support@liquidity.ng</li>
                <li>Lagos, Nigeria</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm text-background/60">
            © {new Date().getFullYear()} Liquidity. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
