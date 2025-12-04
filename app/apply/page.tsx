"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, MapPin, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ApplyPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-foreground">
            Liquidity
          </a>
          <Button variant="outline" asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Apply for a Loan</h1>
            <p className="text-muted-foreground text-lg">Choose the type of loan you want to apply for</p>
          </div>

          {/* Loan Type Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Rent Loan Card */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Rent Loan</h2>
                <p className="text-muted-foreground mb-6">
                  Cover your annual rent with our flexible payment plans. No more scrambling for lump sum rent payments.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Loan Amount: ₦500,000 - ₦5,000,000</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Tenure: 12 months</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Interest Rate: 20% flat per annum</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Processing Fee: ₦5,000</span>
                  </div>
                </div>

                <Button className="w-full" onClick={() => router.push("/apply/rent")}>
                  Apply for Rent Loan
                </Button>
              </CardContent>
            </Card>

            {/* Land Loan Card */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Land Loan</h2>
                <p className="text-muted-foreground mb-6">
                  Purchase land and secure your future. Build your dream home on your own property with our support.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Loan Amount: ₦2,000,000 - ₦10,000,000</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Tenure: 12, 24, or 36 months</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Interest Rate: 20% flat per annum</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Processing Fee: ₦5,000</span>
                  </div>
                </div>

                <Button className="w-full" onClick={() => router.push("/apply/land")}>
                  Apply for Land Loan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
