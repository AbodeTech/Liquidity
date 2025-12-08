"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, ArrowLeft, LogOut, User, FileText, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ApplicationDetailModal } from "@/components/dashboard/application-detail-modal"
import { useQuery } from "@tanstack/react-query"
import { applicationService } from "@/lib/services/user/applicationService"

type StatusFilter = "all" | "pending" | "in-review" | "approved" | "rejected"

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  "in-review": { label: "In Review", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  approved: { label: "Approved", className: "bg-green-500/10 text-green-600 border-green-500/20" },
  rejected: { label: "Rejected", className: "bg-red-500/10 text-red-600 border-red-500/20" },
  submitted: { label: "Submitted", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
}

export default function ApplicationsPage() {
  const router = useRouter()
  // const [userName, setUserName] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [loanTypeFilter, setLoanTypeFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null)

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['applications', statusFilter],
    queryFn: async () => {
      const response = await applicationService.getApplications({
        status: statusFilter === "all" ? undefined : statusFilter
      })
      return response.data || []
    }
  })

  // Filter applications client-side for loanType and search (since API might only support status)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredApplications = applications.filter((app: any) => {
    // Status is already filtered by API if not 'all', but double check if we want to rely on that or client filter
    // For now, let's assume API handles status, but we can double check. 
    // Actually, if we refetch on status change, we trust the API. 
    // But we still need to filter by loanType and search
    const matchesLoanType = loanTypeFilter === "all" || app.loanDetails?.loanPurpose === loanTypeFilter
    const matchesSearch =
      app._id?.toLowerCase().includes(searchQuery.toLowerCase()) || app.loanDetails?.loanAmount?.toString().includes(searchQuery)
    return matchesLoanType && matchesSearch
  })

  // Count by status - Note: getting accurate counts for ALL statuses might require a separate API call or 
  // just counting what we have if we fetched 'all'. 
  // For simpler implementation, we might simulate counts or remove them if API doesn't support aggregate.
  // For now, let's try to calculate from the current list if 'all' is selected, otherwise it might be inaccurate.
  // Ideally we fetch 'all' and filter client side if the dataset is small.
  // Let's stick to API filtering for status to be performant, 
  // but this means counts won't update for all tabs unless we fetch statistics.
  // We will hide the counts for now or keep them as '?' if not 'all'.

  // Actually, better approach for now: Fetch ALL and filter client side since traffic is low?
  // Let's stick to the previous implementation's logic of filtering client side which suggests fetching all.
  // But wait, the previous code filtered `allApplications`.

  // Let's modify: Fetch ALL applications, then filter client side. This restores the counters too.

  const { data: allFetchedApplications = [], isLoading: isLoadingAll } = useQuery({
    queryKey: ['applications', 'all'],
    queryFn: async () => {
      const response = await applicationService.getApplications({})
      return response.data || []
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clientFilteredApplications = allFetchedApplications.filter((app: any) => {
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesLoanType = loanTypeFilter === "all" || app.loanDetails?.loanPurpose === loanTypeFilter
    const matchesSearch =
      app._id?.toLowerCase().includes(searchQuery.toLowerCase()) || app.loanDetails?.loanAmount?.toString().includes(searchQuery)
    return matchesStatus && matchesLoanType && matchesSearch
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statusCounts = {
    all: allFetchedApplications.length,
    pending: allFetchedApplications.filter((a: any) => a.status === "pending").length,
    "in-review": allFetchedApplications.filter((a: any) => a.status === "in-review").length,
    approved: allFetchedApplications.filter((a: any) => a.status === "approved").length,
    rejected: allFetchedApplications.filter((a: any) => a.status === "rejected").length,
  }

  const handleLogout = () => {
    // Auth handled in parent/topbar
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-muted/30">
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
        {isLoadingAll ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : allFetchedApplications.length === 0 ? (
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
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {allFetchedApplications.map((app: any) => (
                <Card key={app._id} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{app.loanDetails?.loanPurpose}</p>
                        <p className="text-sm text-muted-foreground">ID: {app._id}</p>
                      </div>
                      <Badge variant="outline" className={statusConfig[app.status]?.className}>
                        {statusConfig[app.status]?.label || app.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">₦{Number(app.loanDetails?.loanAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{new Date(app.date || app.createdAt).toLocaleDateString()}</span>
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
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {clientFilteredApplications.map((app: any) => (
                        <tr key={app._id} className="border-b border-border last:border-0 hover:bg-muted/50">
                          <td className="p-4 text-sm font-medium">{app._id}</td>
                          <td className="p-4 text-sm">{app.loanDetails?.loanPurpose}</td>
                          <td className="p-4 text-sm">₦{Number(app.loanDetails?.loanAmount).toLocaleString()}</td>
                          <td className="p-4 text-sm">{new Date(app.date || app.createdAt).toLocaleDateString()}</td>
                          <td className="p-4">
                            <Badge variant="outline" className={statusConfig[app.status]?.className}>
                              {statusConfig[app.status]?.label || app.status}
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
        <ApplicationDetailModal
          isOpen={!!selectedApplication}
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  )
}

