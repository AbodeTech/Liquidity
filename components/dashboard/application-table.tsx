"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { EmptyState } from "./empty-state"
import { FileText } from 'lucide-react'

interface Application {
  id: string
  loanType: string
  amount: number
  date: string
  status: "pending" | "approved" | "rejected" | "in-review"
}

interface ApplicationTableProps {
  applications: Application[]
  showViewAll?: boolean
}

const statusConfig = {
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  approved: { label: "Approved", className: "bg-green-500/10 text-green-600 border-green-500/20" },
  rejected: { label: "Rejected", className: "bg-red-500/10 text-red-600 border-red-500/20" },
  "in-review": { label: "In Review", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
}

export function ApplicationTable({ applications, showViewAll = false }: ApplicationTableProps) {
  const router = useRouter()

  if (applications.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No applications yet"
        description="Start by applying for your first loan"
        actionLabel="Apply for Loan"
        actionHref="/dashboard/apply"
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Mobile: Card View */}
      <div className="lg:hidden space-y-3">
        {applications.map((app) => (
          <Card key={app.id} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold">{app.loanType}</p>
                  <p className="text-sm text-muted-foreground">ID: {app.id}</p>
                </div>
                <Badge variant="outline" className={statusConfig[app.status].className}>
                  {statusConfig[app.status].label}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">₦{app.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{new Date(app.date).toLocaleDateString()}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={() => router.push(`/dashboard/applications/${app.id}`)}
              >
                View Details
              </Button>
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
                  <th className="text-left p-4 font-semibold text-sm">Application ID</th>
                  <th className="text-left p-4 font-semibold text-sm">Loan Type</th>
                  <th className="text-left p-4 font-semibold text-sm">Amount</th>
                  <th className="text-left p-4 font-semibold text-sm">Date</th>
                  <th className="text-left p-4 font-semibold text-sm">Status</th>
                  <th className="text-left p-4 font-semibold text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="p-4 text-sm">{app.id}</td>
                    <td className="p-4 text-sm font-medium">{app.loanType}</td>
                    <td className="p-4 text-sm">₦{app.amount.toLocaleString()}</td>
                    <td className="p-4 text-sm">{new Date(app.date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <Badge variant="outline" className={statusConfig[app.status].className}>
                        {statusConfig[app.status].label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/dashboard/applications/${app.id}`)}
                      >
                        View Details
                      </Button>
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
          <Link href="/dashboard/applications">
            <Button variant="outline">View All Applications</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
