"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calculator, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#fafaf8]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden bg-[#1a4d3e] px-6 py-16 sm:px-12 sm:py-24 text-center shadow-2xl shadow-[#1a4d3e]/20"
        >
          {/* --- Background Effects --- */}
          <div className="absolute inset-0 z-0">
            {/* 1. Grain Texture for premium feel */}
            <div
              className="absolute inset-0 opacity-20 mix-blend-soft-light"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* 2. Abstract Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* 3. Glowing Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#d4a574]/20 rounded-full blur-[100px]" />
          </div>

          {/* --- Content --- */}
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">

            {/* Floating Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-8 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span className="text-sm font-medium text-white/90">Fast Approval Guaranteed</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Ready to own your <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a574] to-[#fcd34d]">
                dream property?
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl">
              Join thousands of Nigerians who have achieved their property goals with Liquide.
              Apply today and get funded in as little as 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-white text-[#1a4d3e] hover:bg-gray-100 text-base font-semibold px-8 h-14 rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/dashboard/apply">
                  Start Your Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm text-base px-8 h-14 rounded-full transition-all duration-300"
                asChild
              >
                <Link href="/calculator">
                  <Calculator className="mr-2 h-5 w-5" />
                  Try Calculator
                </Link>
              </Button>
            </div>

            {/* Bottom Note */}
            <p className="mt-8 text-sm text-white/40 font-medium">
              No hidden fees • cancel anytime • secure encryption
            </p>

          </div>
        </motion.div>
      </div>
    </section>
  );
}