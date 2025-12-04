"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { EmptyState } from "./empty-state"
import { CreditCard } from 'lucide-react'

interface Payment {
  id: string
  dueDate: string
  amount: number
  loanRef: string
  status: "upcoming" | "overdue" | "paid"
}

interface PaymentTableProps {
  payments: Payment[]
  showViewAll?: boolean
}

const statusConfig = {
  upcoming: { label: "Upcoming", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  overdue: { label: "Overdue", className: "bg-red-500/10 text-red-600 border-red-500/20" },
  paid: { label: "Paid", className: "bg-green-500/10 text-green-600 border-green-500/20" },
}

export function PaymentTable({ payments, showViewAll = false }: PaymentTableProps) {
  // const router = useRouter()

  if (payments.length === 0) {
    return (
      <EmptyState
        icon={CreditCard}
        title="No upcoming payments"
        description="You're all caught up with your payments"
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Mobile: Card View */}
      <div className="lg:hidden space-y-3">
        {payments.map((payment) => (
          <Card key={payment.id} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold">₦{payment.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Loan: {payment.loanRef}</p>
                </div>
                <Badge variant="outline" className={statusConfig[payment.status].className}>
                  {statusConfig[payment.status].label}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Date:</span>
                  <span>{new Date(payment.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop: Table View */}
      <Card className="hidden lg:block border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm">Due Date</th>
                  <th className="text-left p-4 font-semibold text-sm">Amount</th>
                  <th className="text-left p-4 font-semibold text-sm">Loan Reference</th>
                  <th className="text-left p-4 font-semibold text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="p-4 text-sm">{new Date(payment.dueDate).toLocaleDateString()}</td>
                    <td className="p-4 text-sm font-medium">₦{payment.amount.toLocaleString()}</td>
                    <td className="p-4 text-sm">{payment.loanRef}</td>
                    <td className="p-4">
                      <Badge variant="outline" className={statusConfig[payment.status].className}>
                        {statusConfig[payment.status].label}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showViewAll && (
        <div className="text-center">
          <Link href="/dashboard/payments">
            <Button variant="outline">View Payment History</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
