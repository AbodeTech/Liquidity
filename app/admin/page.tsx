"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FileText, CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react"

// Mock data
const stats = [
  { title: "Total Applications", value: "248", icon: FileText, trend: "+12% from last month" },
  { title: "Pending Review", value: "42", icon: Clock, trend: "Needs attention", highlight: true },
  { title: "Approved Loans", value: "156", icon: CheckCircle2, trend: "+8% from last month" },
  { title: "Rejected", value: "50", icon: XCircle, trend: "20% of total" },
]

const statusData = [
  { name: "Pending", value: 42, percentage: 17, color: "bg-amber-500" },
  { name: "Approved", value: 156, percentage: 63, color: "bg-emerald-500" },
  { name: "Rejected", value: 50, percentage: 20, color: "bg-red-500" },
]

const loanTypeData = [
  { name: "Rent", value: 145, percentage: 58, color: "bg-slate-700" },
  { name: "Land", value: 103, percentage: 42, color: "bg-slate-500" },
]

const recentApplications = [
  {
    id: "APP-2024-001",
    name: "Adebayo Johnson",
    type: "Rent",
    amount: "₦2,500,000",
    date: "2024-01-15",
    status: "pending",
  },
  {
    id: "APP-2024-002",
    name: "Chioma Okafor",
    type: "Land",
    amount: "₦5,000,000",
    date: "2024-01-15",
    status: "approved",
  },
  {
    id: "APP-2024-003",
    name: "Ibrahim Musa",
    type: "Rent",
    amount: "₦1,800,000",
    date: "2024-01-14",
    status: "pending",
  },
  { id: "APP-2024-004", name: "Ngozi Eze", type: "Land", amount: "₦8,500,000", date: "2024-01-14", status: "approved" },
  {
    id: "APP-2024-005",
    name: "Oluwaseun Balogun",
    type: "Rent",
    amount: "₦3,200,000",
    date: "2024-01-13",
    status: "rejected",
  },
]

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of loan applications and activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className={stat.highlight ? "border-amber-500/50" : ""}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Applications by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statusData.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-muted-foreground">{item.value}</span>
                    </div>
                    <div className="relative h-8 w-full bg-muted rounded-md overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all duration-500 flex items-center justify-end px-3`}
                        style={{ width: `${item.percentage}%` }}
                      >
                        <span className="text-xs font-medium text-white">{item.percentage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 mt-6 pt-4 border-t">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-muted-foreground">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Applications by Loan Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {loanTypeData.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-muted-foreground">{item.value} applications</span>
                    </div>
                    <div className="relative h-12 w-full bg-muted rounded-md overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all duration-500 flex items-center justify-end px-3`}
                        style={{ width: `${item.percentage}%` }}
                      >
                        <span className="text-sm font-medium text-white">{item.percentage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Applications</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Latest loan applications submitted</p>
            </div>
            <Link href="/admin/applications">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-sm">{app.id}</p>
                      <Badge variant="outline" className="text-xs">
                        {app.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{app.name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="font-medium text-sm">{app.amount}</p>
                      <p className="text-xs text-muted-foreground">{app.date}</p>
                    </div>
                    <Badge
                      variant={
                        app.status === "approved" ? "default" : app.status === "rejected" ? "destructive" : "secondary"
                      }
                      className={
                        app.status === "approved" ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20" : ""
                      }
                    >
                      {app.status}
                    </Badge>
                    <Link href={`/admin/applications/${app.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
