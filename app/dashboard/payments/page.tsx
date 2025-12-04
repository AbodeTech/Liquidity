"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, AlertCircle, Calendar, Activity, Search, Download, CreditCard } from 'lucide-react'
import { StatCard } from "@/components/dashboard/stat-card"
import { EmptyState } from "@/components/dashboard/empty-state"
import { MakePaymentModal } from "@/components/dashboard/make-payment-modal"
import { RepaymentScheduleModal } from "@/components/dashboard/repayment-schedule-modal"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock payment history data
const mockPayments = [
  {
    id: "PAY001",
    date: "2025-01-20T10:30:00",
    type: "deposit" as const,
    loanRef: "ABX-RENT-001",
    amount: 300000,
    method: "card" as const,
    status: "completed" as const,
  },
  {
    id: "PAY002",
    date: "2025-01-15T14:22:00",
    type: "processing-fee" as const,
    loanRef: "ABX-RENT-001",
    amount: 5000,
    method: "transfer" as const,
    status: "completed" as const,
  },
  {
    id: "PAY003",
    date: "2025-01-05T09:15:00",
    type: "repayment" as const,
    loanRef: "ABX-LAND-002",
    amount: 45000,
    method: "card" as const,
    status: "completed" as const,
  },
  {
    id: "PAY004",
    date: "2024-12-20T16:45:00",
    type: "deposit" as const,
    loanRef: "ABX-LAND-002",
    amount: 600000,
    method: "transfer" as const,
    status: "completed" as const,
  },
  {
    id: "PAY005",
    date: "2024-12-15T11:20:00",
    type: "processing-fee" as const,
    loanRef: "ABX-LAND-002",
    amount: 5000,
    method: "card" as const,
    status: "completed" as const,
  },
  {
    id: "PAY006",
    date: "2024-12-05T13:10:00",
    type: "repayment" as const,
    loanRef: "ABX-RENT-001",
    amount: 45000,
    method: "transfer" as const,
    status: "pending" as const,
  },
]

const paymentTypeConfig = {
  "processing-fee": { 
    label: "Processing Fee", 
    className: "bg-purple-500/10 text-purple-600 border-purple-500/20" 
  },
  "deposit": { 
    label: "20% Deposit", 
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20" 
  },
  "repayment": { 
    label: "Monthly Repayment", 
    className: "bg-green-500/10 text-green-600 border-green-500/20" 
  },
}

const statusConfig = {
  completed: { 
    label: "Completed", 
    className: "bg-green-500/10 text-green-600 border-green-500/20" 
  },
  pending: { 
    label: "Pending", 
    className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" 
  },
  failed: { 
    label: "Failed", 
    className: "bg-red-500/10 text-red-600 border-red-500/20" 
  },
}

export default function PaymentsPage() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all-time")
  const [searchQuery, setSearchQuery] = useState("")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)

  // Filter payments
  const filteredPayments = mockPayments.filter((payment) => {
    const matchesType = selectedType === "all" || payment.type === selectedType
    const matchesSearch = payment.loanRef.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  // Calculate stats
  const totalPaid = mockPayments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-muted-foreground mt-1">
          Manage your loan payments and view transaction history
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={CheckCircle}
          value={`₦${totalPaid.toLocaleString()}`}
          label="Total Paid"
          subtext="All-time payments"
        />
        <StatCard
          icon={AlertCircle}
          value="₦1,955,000"
          label="Outstanding Balance"
          subtext="Remaining loan amount"
        />
        <StatCard
          icon={Calendar}
          value="₦45,000"
          label="Next Payment Due"
          subtext="Due on Feb 28, 2025"
          variant="warning"
        />
        <StatCard
          icon={Activity}
          value="On Track"
          label="Payment Status"
          subtext="All payments current"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setShowPaymentModal(true)}>
          <CreditCard className="w-4 h-4 mr-2" />
          Make a Payment
        </Button>
        <Button variant="outline" onClick={() => setShowScheduleModal(true)}>
          <Calendar className="w-4 h-4 mr-2" />
          View Repayment Schedule
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download Payment Summary
        </Button>
      </div>

      {/* Filters Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by loan reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Payment Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full lg:w-[200px]">
                <SelectValue placeholder="Payment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="processing-fee">Processing Fees</SelectItem>
                <SelectItem value="deposit">Deposits (20%)</SelectItem>
                <SelectItem value="repayment">Monthly Repayments</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range Filter */}
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="30-days">Last 30 Days</SelectItem>
                <SelectItem value="3-months">Last 3 Months</SelectItem>
                <SelectItem value="6-months">Last 6 Months</SelectItem>
                <SelectItem value="1-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        
        {filteredPayments.length === 0 ? (
          <EmptyState
            icon={CreditCard}
            title="No payments found"
            description="Try adjusting your filters or search query"
          />
        ) : (
          <>
            {/* Mobile: Card View */}
            <div className="lg:hidden space-y-3">
              {filteredPayments.map((payment) => (
                <Card key={payment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-lg">
                          ₦{payment.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {payment.loanRef}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={paymentTypeConfig[payment.type].className}
                      >
                        {paymentTypeConfig[payment.type].label}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>
                          {new Date(payment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Method:</span>
                        <span className="capitalize">{payment.method}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge 
                          variant="outline" 
                          className={statusConfig[payment.status].className}
                        >
                          {statusConfig[payment.status].label}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Download className="w-3 h-3 mr-2" />
                      Download Receipt
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop: Table View */}
            <Card className="hidden lg:block">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-semibold text-sm">
                          Date & Time
                        </th>
                        <th className="text-left p-4 font-semibold text-sm">
                          Payment Type
                        </th>
                        <th className="text-left p-4 font-semibold text-sm">
                          Loan Reference
                        </th>
                        <th className="text-left p-4 font-semibold text-sm">
                          Amount
                        </th>
                        <th className="text-left p-4 font-semibold text-sm">
                          Method
                        </th>
                        <th className="text-left p-4 font-semibold text-sm">
                          Status
                        </th>
                        <th className="text-left p-4 font-semibold text-sm">
                          Receipt
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayments.map((payment) => (
                        <tr 
                          key={payment.id} 
                          className="border-b border-border last:border-0 hover:bg-muted/50"
                        >
                          <td className="p-4 text-sm">
                            <div>
                              {new Date(payment.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(payment.date).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge 
                              variant="outline" 
                              className={paymentTypeConfig[payment.type].className}
                            >
                              {paymentTypeConfig[payment.type].label}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm font-medium">
                            {payment.loanRef}
                          </td>
                          <td className="p-4 text-sm font-semibold">
                            ₦{payment.amount.toLocaleString()}
                          </td>
                          <td className="p-4 text-sm capitalize">
                            {payment.method}
                          </td>
                          <td className="p-4">
                            <Badge 
                              variant="outline" 
                              className={statusConfig[payment.status].className}
                            >
                              {statusConfig[payment.status].label}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Make Payment Modal */}
      <MakePaymentModal 
        open={showPaymentModal} 
        onOpenChange={setShowPaymentModal}
      />

      {/* Repayment Schedule Modal */}
      <RepaymentScheduleModal 
        open={showScheduleModal} 
        onOpenChange={setShowScheduleModal}
        onMakePayment={() => setShowPaymentModal(true)}
      />
    </div>
  )
}
