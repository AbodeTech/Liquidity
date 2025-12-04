"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

export default function CalculatorPage() {
  // Rent Loan State
  const [rentAmount, setRentAmount] = useState(1500000)
  const rentTenure = 12 // Fixed for rent loans
  const rentInterestRate = 0.2 // 20% flat

  // Land Loan State
  const [landAmount, setLandAmount] = useState(5000000)
  const [landTenure, setLandTenure] = useState(24)
  const landInterestRate = 0.2 // 20% flat

  const processingFee = 5000
  const depositPercentage = 0.2

  // Calculate Rent Loan
  const rentDeposit = rentAmount * depositPercentage
  const rentLoanAmount = rentAmount - rentDeposit
  const rentTotalInterest = rentLoanAmount * rentInterestRate
  const rentTotalRepayment = rentLoanAmount + rentTotalInterest
  const rentMonthlyPayment = rentTotalRepayment / rentTenure

  // Calculate Land Loan
  const landDeposit = landAmount * depositPercentage
  const landLoanAmount = landAmount - landDeposit
  const landTotalInterest = landLoanAmount * landInterestRate * (landTenure / 12)
  const landTotalRepayment = landLoanAmount + landTotalInterest
  const landMonthlyPayment = landTotalRepayment / landTenure

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-foreground">
            Liquidity
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Loan Calculator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate your monthly repayment and see how much you need to pay upfront. Adjust the sliders to match your
            needs.
          </p>
        </div>

        <Tabs defaultValue="rent" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="rent">Rent Loan</TabsTrigger>
            <TabsTrigger value="land">Land Loan</TabsTrigger>
          </TabsList>

          {/* Rent Loan Calculator */}
          <TabsContent value="rent">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Loan Details</CardTitle>
                  <CardDescription>Adjust the slider to set your rent amount</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Rent Amount</Label>
                      <span className="text-2xl font-bold text-primary">{formatCurrency(rentAmount)}</span>
                    </div>
                    <Slider
                      value={[rentAmount]}
                      onValueChange={(value) => setRentAmount(value[0])}
                      min={500000}
                      max={5000000}
                      step={100000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₦500k</span>
                      <span>₦5M</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Loan Tenure</span>
                      <span className="font-medium">{rentTenure} months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Interest Rate</span>
                      <span className="font-medium">{rentInterestRate * 100}% flat p.a.</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span className="font-medium">{formatCurrency(processingFee)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">Your Repayment Summary</CardTitle>
                  <CardDescription className="text-primary-foreground/80">Here's what you'll pay</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-primary-foreground/80 mb-1">Monthly Payment</div>
                      <div className="text-4xl font-bold">{formatCurrency(rentMonthlyPayment)}</div>
                    </div>

                    <div className="pt-4 border-t border-primary-foreground/20 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-primary-foreground/80">Initial Deposit (20%)</span>
                        <span className="font-semibold">{formatCurrency(rentDeposit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-primary-foreground/80">Loan Amount</span>
                        <span className="font-semibold">{formatCurrency(rentLoanAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-primary-foreground/80">Total Interest</span>
                        <span className="font-semibold">{formatCurrency(rentTotalInterest)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-primary-foreground/20">
                        <span className="text-sm text-primary-foreground/80">Total Repayment</span>
                        <span className="font-bold text-lg">{formatCurrency(rentTotalRepayment)}</span>
                      </div>
                    </div>
                  </div>

                  <Button size="lg" variant="secondary" asChild className="w-full">
                    <Link href="/apply/rent">Apply for Rent Loan</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Land Loan Calculator */}
          <TabsContent value="land">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Loan Details</CardTitle>
                  <CardDescription>Adjust the sliders to set your land amount and tenure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Land Amount</Label>
                      <span className="text-2xl font-bold text-primary">{formatCurrency(landAmount)}</span>
                    </div>
                    <Slider
                      value={[landAmount]}
                      onValueChange={(value) => setLandAmount(value[0])}
                      min={2000000}
                      max={10000000}
                      step={500000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₦2M</span>
                      <span>₦10M</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Loan Tenure</Label>
                      <span className="text-xl font-bold text-primary">{landTenure} months</span>
                    </div>
                    <Slider
                      value={[landTenure]}
                      onValueChange={(value) => setLandTenure(value[0])}
                      min={12}
                      max={36}
                      step={12}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>12 months</span>
                      <span>24 months</span>
                      <span>36 months</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Interest Rate</span>
                      <span className="font-medium">{landInterestRate * 100}% flat p.a.</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span className="font-medium">{formatCurrency(processingFee)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">Your Repayment Summary</CardTitle>
                  <CardDescription className="text-primary-foreground/80">Here's what you'll pay</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-primary-foreground/80 mb-1">Monthly Payment</div>
                      <div className="text-4xl font-bold">{formatCurrency(landMonthlyPayment)}</div>
                    </div>

                    <div className="pt-4 border-t border-primary-foreground/20 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-primary-foreground/80">Initial Deposit (20%)</span>
                        <span className="font-semibold">{formatCurrency(landDeposit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-primary-foreground/80">Loan Amount</span>
                        <span className="font-semibold">{formatCurrency(landLoanAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-primary-foreground/80">Total Interest</span>
                        <span className="font-semibold">{formatCurrency(landTotalInterest)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-primary-foreground/20">
                        <span className="text-sm text-primary-foreground/80">Total Repayment</span>
                        <span className="font-bold text-lg">{formatCurrency(landTotalRepayment)}</span>
                      </div>
                    </div>
                  </div>

                  <Button size="lg" variant="secondary" asChild className="w-full">
                    <Link href="/apply/land">Apply for Land Loan</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
