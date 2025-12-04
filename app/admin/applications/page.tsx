"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search } from "lucide-react"
import { useState } from "react"

// Mock data - expanded list
const allApplications = [
  {
    id: "APP-2024-001",
    name: "Adebayo Johnson",
    email: "adebayo.j@email.com",
    type: "Rent",
    amount: "₦2,500,000",
    date: "2024-01-15",
    status: "pending",
  },
  {
    id: "APP-2024-002",
    name: "Chioma Okafor",
    email: "chioma.o@email.com",
    type: "Land",
    amount: "₦5,000,000",
    date: "2024-01-15",
    status: "approved",
  },
  {
    id: "APP-2024-003",
    name: "Ibrahim Musa",
    email: "ibrahim.m@email.com",
    type: "Rent",
    amount: "₦1,800,000",
    date: "2024-01-14",
    status: "pending",
  },
  {
    id: "APP-2024-004",
    name: "Ngozi Eze",
    email: "ngozi.e@email.com",
    type: "Land",
    amount: "₦8,500,000",
    date: "2024-01-14",
    status: "approved",
  },
  {
    id: "APP-2024-005",
    name: "Oluwaseun Balogun",
    email: "oluwaseun.b@email.com",
    type: "Rent",
    amount: "₦3,200,000",
    date: "2024-01-13",
    status: "rejected",
  },
  {
    id: "APP-2024-006",
    name: "Fatima Abubakar",
    email: "fatima.a@email.com",
    type: "Land",
    amount: "₦12,000,000",
    date: "2024-01-13",
    status: "pending",
  },
  {
    id: "APP-2024-007",
    name: "Emeka Nwosu",
    email: "emeka.n@email.com",
    type: "Rent",
    amount: "₦4,500,000",
    date: "2024-01-12",
    status: "approved",
  },
  {
    id: "APP-2024-008",
    name: "Aisha Mohammed",
    email: "aisha.m@email.com",
    type: "Land",
    amount: "₦6,800,000",
    date: "2024-01-12",
    status: "pending",
  },
]

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [loanTypeFilter, setLoanTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Applications</h1>
          <p className="text-muted-foreground">Manage and review all loan applications</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, name, or email..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Loan Type Filter */}
              <Select value={loanTypeFilter} onValueChange={setLoanTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Loan Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table - Desktop */}
        <div className="hidden md:block">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-sm">Application ID</th>
                      <th className="text-left p-4 font-medium text-sm">Applicant</th>
                      <th className="text-left p-4 font-medium text-sm">Type</th>
                      <th className="text-left p-4 font-medium text-sm">Amount</th>
                      <th className="text-left p-4 font-medium text-sm">Date Submitted</th>
                      <th className="text-left p-4 font-medium text-sm">Status</th>
                      <th className="text-left p-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {allApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-muted/50 transition-colors">
                        <td className="p-4">
                          <Link href={`/admin/applications/${app.id}`} className="font-medium text-sm hover:underline">
                            {app.id}
                          </Link>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-sm">{app.name}</p>
                            <p className="text-xs text-muted-foreground">{app.email}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="text-xs">
                            {app.type}
                          </Badge>
                        </td>
                        <td className="p-4 font-medium text-sm">{app.amount}</td>
                        <td className="p-4 text-sm text-muted-foreground">{app.date}</td>
                        <td className="p-4">
                          <Badge
                            variant={
                              app.status === "approved"
                                ? "default"
                                : app.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className={
                              app.status === "approved"
                                ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20"
                                : app.status === "pending"
                                  ? "bg-amber-500/10 text-amber-700 hover:bg-amber-500/20"
                                  : ""
                            }
                          >
                            {app.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Link href={`/admin/applications/${app.id}`}>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Cards - Mobile */}
        <div className="md:hidden space-y-4">
          {allApplications.map((app) => (
            <Card key={app.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link href={`/admin/applications/${app.id}`} className="font-medium text-sm hover:underline">
                        {app.id}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">{app.date}</p>
                    </div>
                    <Badge
                      variant={
                        app.status === "approved" ? "default" : app.status === "rejected" ? "destructive" : "secondary"
                      }
                      className={
                        app.status === "approved"
                          ? "bg-emerald-500/10 text-emerald-700"
                          : app.status === "pending"
                            ? "bg-amber-500/10 text-amber-700"
                            : ""
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium">{app.name}</p>
                    <p className="text-sm text-muted-foreground">{app.email}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {app.type}
                      </Badge>
                      <span className="font-medium text-sm">{app.amount}</span>
                    </div>
                    <Link href={`/admin/applications/${app.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 1-8 of 8 applications</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
