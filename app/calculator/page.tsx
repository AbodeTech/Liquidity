"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Calculator, Info, Sparkles } from "lucide-react"
import Image from "next/image"

export default function CalculatorPage() {
  // --- STATE ---
  const [rentAmount, setRentAmount] = useState(1500000)
  const rentTenure = 12 // Fixed for rent
  const rentInterestRate = 0.2 // 20% flat

  const [landAmount, setLandAmount] = useState(5000000)
  const [landTenure, setLandTenure] = useState(24)
  const landInterestRate = 0.2 // 20% flat

  const depositPercentage = 0.2

  // --- CALCULATIONS ---
  // Rent
  const rentDeposit = rentAmount * depositPercentage
  const rentLoanAmount = rentAmount - rentDeposit
  const rentTotalInterest = rentLoanAmount * rentInterestRate
  const rentTotalRepayment = rentLoanAmount + rentTotalInterest
  const rentMonthlyPayment = rentTotalRepayment / rentTenure

  // Land
  const landDeposit = landAmount * depositPercentage
  const landLoanAmount = landAmount - landDeposit
  const landTotalInterest = landLoanAmount * landInterestRate * (landTenure / 12)
  const landTotalRepayment = landLoanAmount + landTotalInterest
  const landMonthlyPayment = landTotalRepayment / landTenure

  // Helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-[#fafaf8] selection:bg-[#1a4d3e] selection:text-white font-sans text-[#1a1a1a]">

      {/* --- BACKGROUND TEXTURE --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1a4d3e]/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d4a574]/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#1a4d3e]/5 bg-[#fafaf8]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
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
          <Button variant="ghost" asChild className="text-[#666666] hover:text-[#1a4d3e] hover:bg-[#1a4d3e]/5 gap-2 rounded-full">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </Button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10 max-w-6xl">

        {/* Page Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 bg-[#1a4d3e]/5 text-[#1a4d3e] px-4 py-1.5 rounded-full mb-6 border border-[#1a4d3e]/10">
            <Calculator className="w-4 h-4" />
            <span className="text-sm font-semibold">Payment Estimator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Calculate Your Plan</h1>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
            See exactly how much you can access and what your repayment plan looks like.
            No hidden math, just transparency.
          </p>
        </div>

        {/* Calculator Widget */}
        <Tabs defaultValue="rent" className="w-full">

          {/* Custom Tabs Switcher */}
          <div className="flex justify-center mb-10">
            <TabsList className="bg-white p-1.5 rounded-full border border-[#e5e5e5] shadow-sm h-auto">
              <TabsTrigger
                value="rent"
                className="rounded-full px-8 py-3 text-sm font-medium data-[state=active]:bg-[#1a4d3e] data-[state=active]:text-white transition-all duration-300"
              >
                Rent Financing
              </TabsTrigger>
              <TabsTrigger
                value="land"
                className="rounded-full px-8 py-3 text-sm font-medium data-[state=active]:bg-[#1a4d3e] data-[state=active]:text-white transition-all duration-300"
              >
                Land Purchase
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* --- LEFT COLUMN: INPUTS --- */}
            <div className="lg:col-span-7 space-y-8">
              <TabsContent value="rent" className="mt-0 space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <InputCard
                  title="Rent Details"
                  description="How much is your annual rent?"
                >
                  <div className="space-y-8">
                    <CurrencyInput
                      label="Rent Amount"
                      value={rentAmount}
                      min={500000}
                      max={5000000}
                      onChange={setRentAmount}
                    />

                    <div className="p-4 bg-[#f5f5f3] rounded-2xl flex items-center justify-between border border-[#e5e5e5]">
                      <div>
                        <p className="text-xs font-bold text-[#666666] uppercase tracking-wider mb-1">Duration</p>
                        <p className="text-lg font-bold text-[#1a1a1a]">12 Months</p>
                      </div>
                      <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-[#1a4d3e]">
                        <ClockIcon />
                      </div>
                    </div>
                  </div>
                </InputCard>
              </TabsContent>

              <TabsContent value="land" className="mt-0 space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <InputCard
                  title="Land Details"
                  description="What is the value of the property?"
                >
                  <div className="space-y-8">
                    <CurrencyInput
                      label="Property Value"
                      value={landAmount}
                      min={2000000}
                      max={10000000}
                      step={500000}
                      onChange={setLandAmount}
                    />

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <label className="text-sm font-medium text-[#666666]">Repayment Period</label>
                        <span className="text-2xl font-bold text-[#1a4d3e]">{landTenure} Months</span>
                      </div>
                      <Slider
                        value={[landTenure]}
                        onValueChange={(val) => setLandTenure(val[0])}
                        min={12}
                        max={36}
                        step={12}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs font-medium text-[#999999]">
                        <span>1 Year</span>
                        <span>2 Years</span>
                        <span>3 Years</span>
                      </div>
                    </div>
                  </div>
                </InputCard>
              </TabsContent>

              {/* Static Info Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#e5e5e5] shadow-sm flex gap-4 items-start">
                <Info className="w-5 h-5 text-[#d4a574] shrink-0 mt-0.5" />
                <div className="text-sm text-[#666666] leading-relaxed">
                  <span className="font-semibold text-[#1a1a1a]">Note:</span> An initial equity contribution of 20% is required for all loans. This amount is deducted from your total loan value or paid upfront depending on the agreement.
                </div>
              </div>
            </div>

            {/* --- RIGHT COLUMN: RESULTS SUMMARY --- */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-28">
                <div className="relative bg-[#1a4d3e] rounded-[2.5rem] p-6 sm:p-8 text-white shadow-2xl shadow-[#1a4d3e]/20 overflow-hidden">
                  {/* Texture Overlay */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />

                  {/* Background Globs */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d4a574]/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Monthly Repayment</p>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                          {formatCurrency(rentMonthlyPayment || landMonthlyPayment)}
                        </h2>
                      </div>
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                        <Sparkles className="w-6 h-6 text-[#fbbf24]" />
                      </div>
                    </div>

                    {/* Receipt Card */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 space-y-4">
                      <SummaryRow
                        label="Initial Deposit (20%)"
                        value={formatCurrency(rentAmount === rentLoanAmount + rentDeposit ? rentDeposit : landDeposit)}
                      />
                      <SummaryRow
                        label="Loan Principal"
                        value={formatCurrency(rentAmount === rentLoanAmount + rentDeposit ? rentLoanAmount : landLoanAmount)}
                      />
                      <SummaryRow
                        label="Interest Rate"
                        value="20% Flat p.a."
                        highlight
                      />
                      <SummaryRow
                        label="Total Interest"
                        value={formatCurrency(rentAmount === rentLoanAmount + rentDeposit ? rentTotalInterest : landTotalInterest)}
                      />

                      <div className="h-px bg-white/10 my-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/80">Total Repayment</span>
                        <span className="text-lg font-bold text-[#fbbf24]">
                          {formatCurrency(rentAmount === rentLoanAmount + rentDeposit ? rentTotalRepayment : landTotalRepayment)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      <Button size="lg" className="w-full h-14 bg-white text-[#1a4d3e] hover:bg-white/90 font-bold rounded-xl text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" asChild>
                        <Link href="/dashboard/apply">
                          Start Application
                        </Link>
                      </Button>
                      <p className="text-center text-xs text-white/40">
                        *Figures are estimates. Final terms provided upon approval.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Tabs>
      </div>
    </div>
  )
}

// --- SUBCOMPONENTS ---

function InputCard({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-[#e5e5e5] shadow-lg shadow-[#1a4d3e]/5">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#1a1a1a]">{title}</h3>
        <p className="text-sm text-[#666666]">{description}</p>
      </div>
      {children}
    </div>
  )
}

function CurrencyInput({ label, value, min, max, step = 100000, onChange }: { label: string, value: number, min: number, max: number, step?: number, onChange: (val: number) => void }) {

  const format = (val: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(val)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <label className="text-sm font-medium text-[#666666]">{label}</label>
        <div className="text-2xl sm:text-3xl font-bold text-[#1a4d3e] tracking-tight">
          {format(value)}
        </div>
      </div>

      <Slider
        value={[value]}
        onValueChange={(val) => onChange(val[0])}
        min={min}
        max={max}
        step={step}
        className="py-2"
      />

      <div className="flex justify-between text-xs font-medium text-[#999999] px-1">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-white/60">{label}</span>
      <span className={`font-semibold ${highlight ? 'text-[#fbbf24]' : 'text-white'}`}>{value}</span>
    </div>
  )
}

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}