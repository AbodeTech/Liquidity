"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, ArrowLeft, LogOut, User, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ApplicationDetailModal } from "@/components/dashboard/application-detail-modal"

// Mock data for user's applications
const allApplications = [
  {
    id: "LIQ-RENT-001",
    loanType: "Rent Loan",
    amount: 1500000,
    date: "2024-01-15",
    status: "approved" as const,
    tenure: 12,
    monthlyPayment: 135000,
    personalInfo: {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+234 801 234 5678",
      employment: "Employed",
      monthlyIncome: 350000,
    },
    rentDetails: {
      propertyAddress: "15 Admiralty Way, Lekki Phase 1, Lagos",
      landlordName: "Mr. Adebayo Williams",
      landlordContact: "+234 802 345 6789",
      rentAmount: 1500000,
      rentDuration: 12,
    },
    documents: [
      { name: "Driver's License", status: "verified" },
      { name: "Utility Bill", status: "verified" },
      { name: "Passport Photo", status: "verified" },
    ],
    statusHistory: [
      { status: "submitted", date: "2024-01-15", time: "10:30 AM" },
      { status: "in-review", date: "2024-01-16", time: "2:15 PM" },
      { status: "approved", date: "2024-01-18", time: "11:45 AM" },
    ],
  },
  {
    id: "LIQ-LAND-002",
    loanType: "Land Loan",
    amount: 3000000,
    date: "2024-01-20",
    status: "pending" as const,
    tenure: 24,
    personalInfo: {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+234 801 234 5678",
      employment: "Employed",
      monthlyIncome: 350000,
    },
    landDetails: {
      landLocation: "Epe, Lagos State",
      landSize: "600 sqm",
      landCost: 3000000,
      developerName: "Prime Properties Ltd",
      developerContact: "+234 804 567 8901",
    },
    documents: [
      { name: "Driver's License", status: "pending" },
      { name: "Utility Bill", status: "pending" },
      { name: "Passport Photo", status: "pending" },
    ],
    statusHistory: [{ status: "submitted", date: "2024-01-20", time: "9:00 AM" }],
  },
]

type StatusFilter = "all" | "pending" | "in-review" | "approved" | "rejected"

const statusConfig = {
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  "in-review": { label: "In Review", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  approved: { label: "Approved", className: "bg-green-500/10 text-green-600 border-green-500/20" },
  rejected: { label: "Rejected", className: "bg-red-500/10 text-red-600 border-red-500/20" },
}

export default function ApplicationsPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [loanTypeFilter, setLoanTypeFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<(typeof allApplications)[0] | null>(null)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }
    const name = localStorage.getItem("userName") || "User"
    setUserName(name)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
  }

  // Filter applications
  const filteredApplications = allApplications.filter((app) => {
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesLoanType = loanTypeFilter === "all" || app.loanType === loanTypeFilter
    const matchesSearch =
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) || app.amount.toString().includes(searchQuery)
    return matchesStatus && matchesLoanType && matchesSearch
  })

  // Count by status
  const statusCounts = {
    all: allApplications.length,
    pending: allApplications.filter((a) => a.status === "pending").length,
    "in-review": allApplications.filter((a) => a.status === "in-review").length,
    approved: allApplications.filter((a) => a.status === "approved").length,
    rejected: allApplications.filter((a) => a.status === "rejected").length,
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
              <p className="text-muted-foreground mt-1">Track and manage your loan applications</p>
            </div>
            <Button asChild>
              <Link href="/dashboard/apply">
                <Plus className="w-4 h-4 mr-2" />
                Apply for New Loan
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4 space-y-4">
            {/* Status Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All ({statusCounts.all})
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("pending")}
              >
                Pending ({statusCounts.pending})
              </Button>
              <Button
                variant={statusFilter === "in-review" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("in-review")}
              >
                In Review ({statusCounts["in-review"]})
              </Button>
              <Button
                variant={statusFilter === "approved" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("approved")}
              >
                Approved ({statusCounts.approved})
              </Button>
              <Button
                variant={statusFilter === "rejected" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("rejected")}
              >
                Rejected ({statusCounts.rejected})
              </Button>
            </div>

            {/* Search and Loan Type Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by ID or amount..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={loanTypeFilter} onValueChange={setLoanTypeFilter}>
                <SelectTrigger className="sm:w-[200px]">
                  <SelectValue placeholder="All Loan Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Loan Types</SelectItem>
                  <SelectItem value="Rent Loan">Rent Loans</SelectItem>
                  <SelectItem value="Land Loan">Land Loans</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No applications found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || statusFilter !== "all" || loanTypeFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Start by applying for your first loan"}
              </p>
              <Button asChild>
                <Link href="/dashboard/apply">Apply for Loan</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Mobile: Card View */}
            <div className="lg:hidden space-y-3">
              {filteredApplications.map((app) => (
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
                      className="w-full mt-4 bg-transparent"
                      onClick={() => setSelectedApplication(app)}
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
                      {filteredApplications.map((app) => (
                        <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                          <td className="p-4 text-sm font-medium">{app.id}</td>
                          <td className="p-4 text-sm">{app.loanType}</td>
                          <td className="p-4 text-sm">₦{app.amount.toLocaleString()}</td>
                          <td className="p-4 text-sm">{new Date(app.date).toLocaleDateString()}</td>
                          <td className="p-4">
                            <Badge variant="outline" className={statusConfig[app.status].className}>
                              {statusConfig[app.status].label}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedApplication(app)}>
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
          </>
        )}
      </main>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <ApplicationDetailModal application={selectedApplication} onClose={() => setSelectedApplication(null)} />
      )}
    </div>
  )
}
