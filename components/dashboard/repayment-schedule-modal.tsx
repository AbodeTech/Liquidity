"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Download, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface RepaymentScheduleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMakePayment?: () => void
}

// Mock active loans with repayment schedules
const mockLoans = [
  {
    id: "ABX-RENT-001",
    type: "Rent Loan",
    totalAmount: 2500000,
    tenure: 12,
    monthlyPayment: 208333,
    startDate: "2025-02-01",
    endDate: "2026-01-01",
    schedule: Array.from({ length: 12 }, (_, i) => ({
      paymentNumber: i + 1,
      dueDate: new Date(2025, 1 + i, 28).toISOString(),
      principal: 208333,
      interest: 0,
      total: 208333,
      status: i === 0 ? "paid" : i === 1 ? "upcoming" : "pending",
      runningBalance: 2500000 - (208333 * (i + 1))
    }))
  },
  {
    id: "ABX-LAND-002",
    type: "Land Loan",
    totalAmount: 3000000,
    tenure: 24,
    monthlyPayment: 125000,
    startDate: "2024-12-01",
    endDate: "2026-11-01",
    schedule: Array.from({ length: 24 }, (_, i) => ({
      paymentNumber: i + 1,
      dueDate: new Date(2024, 11 + i, 28).toISOString(),
      principal: 125000,
      interest: 0,
      total: 125000,
      status: i < 2 ? "paid" : i === 2 ? "upcoming" : "pending",
      runningBalance: 3000000 - (125000 * (i + 1))
    }))
  },
]

const statusConfig = {
  paid: {
    label: "Paid",
    icon: CheckCircle,
    className: "bg-green-500/10 text-green-600 border-green-500/20"
  },
  upcoming: {
    label: "Upcoming",
    icon: Clock,
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20"
  },
  overdue: {
    label: "Overdue",
    icon: AlertCircle,
    className: "bg-red-500/10 text-red-600 border-red-500/20"
  },
  pending: {
    label: "Pending",
    icon: Calendar,
    className: "bg-gray-500/10 text-gray-600 border-gray-500/20"
  }
}

export function RepaymentScheduleModal({ 
  open, 
  onOpenChange,
  onMakePayment 
}: RepaymentScheduleModalProps) {
  const [selectedLoan, setSelectedLoan] = useState(mockLoans[0].id)

  const loanData = mockLoans.find(loan => loan.id === selectedLoan) || mockLoans[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Repayment Schedule</DialogTitle>
          <DialogDescription>
            View your complete loan repayment schedule and payment history
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Loan Selection (if multiple loans) */}
          {mockLoans.length > 1 && (
            <div className="space-y-2">
              <Label>Select Loan</Label>
              <Select value={selectedLoan} onValueChange={setSelectedLoan}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockLoans.map((loan) => (
                    <SelectItem key={loan.id} value={loan.id}>
                      {loan.id} - {loan.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Loan Summary */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Loan Amount</p>
                  <p className="text-xl font-bold">₦{loanData.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tenure</p>
                  <p className="text-xl font-bold">{loanData.tenure} months</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                  <p className="text-xl font-bold">₦{loanData.monthlyPayment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Loan Period</p>
                  <p className="text-sm font-medium">
                    {new Date(loanData.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' - '}
                    {new Date(loanData.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Schedule Table */}
          <div>
            <h3 className="font-semibold mb-4">Payment Schedule</h3>

            {/* Mobile: Card View */}
            <div className="lg:hidden space-y-3">
              {loanData.schedule.map((payment) => {
                const StatusIcon = statusConfig[payment.status as keyof typeof statusConfig].icon
                return (
                  <Card key={payment.paymentNumber}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold">
                            Payment {payment.paymentNumber} of {loanData.tenure}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(payment.dueDate).toLocaleDateString('en-NG', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={statusConfig[payment.status as keyof typeof statusConfig].className}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[payment.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Principal:</span>
                          <span className="font-medium">₦{payment.principal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Payment:</span>
                          <span className="font-semibold">₦{payment.total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Balance:</span>
                          <span>₦{payment.runningBalance.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Desktop: Table View */}
            <Card className="hidden lg:block">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-semibold text-sm">Payment</th>
                        <th className="text-left p-3 font-semibold text-sm">Due Date</th>
                        <th className="text-right p-3 font-semibold text-sm">Principal</th>
                        <th className="text-right p-3 font-semibold text-sm">Interest</th>
                        <th className="text-right p-3 font-semibold text-sm">Total</th>
                        <th className="text-center p-3 font-semibold text-sm">Status</th>
                        <th className="text-right p-3 font-semibold text-sm">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loanData.schedule.map((payment) => {
                        const StatusIcon = statusConfig[payment.status as keyof typeof statusConfig].icon
                        return (
                          <tr 
                            key={payment.paymentNumber} 
                            className="border-b border-border last:border-0 hover:bg-muted/50"
                          >
                            <td className="p-3 text-sm font-medium">
                              {payment.paymentNumber} of {loanData.tenure}
                            </td>
                            <td className="p-3 text-sm">
                              {new Date(payment.dueDate).toLocaleDateString('en-NG', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </td>
                            <td className="p-3 text-sm text-right">
                              ₦{payment.principal.toLocaleString()}
                            </td>
                            <td className="p-3 text-sm text-right">
                              ₦{payment.interest.toLocaleString()}
                            </td>
                            <td className="p-3 text-sm text-right font-semibold">
                              ₦{payment.total.toLocaleString()}
                            </td>
                            <td className="p-3 text-center">
                              <Badge 
                                variant="outline" 
                                className={statusConfig[payment.status as keyof typeof statusConfig].className}
                              >
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig[payment.status as keyof typeof statusConfig].label}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-right text-muted-foreground">
                              ₦{payment.runningBalance.toLocaleString()}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                // Mock download
                alert('Downloading repayment schedule PDF...')
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Schedule PDF
            </Button>
            <Button 
              className="flex-1"
              onClick={() => {
                onOpenChange(false)
                onMakePayment?.()
              }}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Make a Payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
