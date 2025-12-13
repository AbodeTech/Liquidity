"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { adminApplicationService } from "@/lib/services/admin/applicationService"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { format } from "date-fns"
import { Application } from "@/lib/types/admin/application"
import { useDebounce } from "@/hooks/use-debounce"

export default function ApplicationsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get filters from URL
  const page = Number(searchParams.get("page")) || 1
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || "all"
  const type = searchParams.get("type") || "all"

  // Local state for search input to handle debouncing
  const [searchTerm, setSearchTerm] = useState(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  // Update URL when filters change
  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    // Reset to page 1 on filter change
    if (key !== "page") {
      params.set("page", "1")
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  // Sync debounced search with URL
  useEffect(() => {
    if (debouncedSearch !== search) {
      updateFilters("search", debouncedSearch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  // Fetch applications
  const { data: applicationsData, isLoading } = useQuery({
    queryKey: ["applications", page, search, status, type],
    queryFn: () => adminApplicationService.getApplications({
      page,
      limit: 10,
      search: search || undefined,
      status: status !== "all" ? status : undefined,
      type: type !== "all" ? type : undefined,
    }),
  })

  console.log(applicationsData)

  const applications: Application[] = applicationsData?.data?.data || []
  const meta = applicationsData?.data?.pagination

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved": return "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20"
      case "rejected": return "bg-red-500/10 text-red-700 hover:bg-red-500/20"
      case "under_review": return "bg-amber-500/10 text-amber-700 hover:bg-amber-500/20"
      case "submitted": return "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20"
      case "draft": return "bg-slate-500/10 text-slate-700 hover:bg-slate-500/20"
      default: return "bg-slate-500/10 text-slate-700 hover:bg-slate-500/20"
    }
  }

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
              <Select value={type} onValueChange={(val) => updateFilters("type", val)}>
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
              <Select value={status} onValueChange={(val) => updateFilters("status", val)}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Desktop Table */}
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
                        {applications.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-muted-foreground">
                              No applications found matching your filters.
                            </td>
                          </tr>
                        ) : (
                          applications.map((app) => (
                            <tr key={app._id} className="hover:bg-muted/50 transition-colors">
                              <td className="p-4">
                                <Link href={`/admin/applications/${app._id}`} className="font-medium text-sm hover:underline">
                                  {app._id.substring(0, 8).toUpperCase()}
                                </Link>
                              </td>
                              <td className="p-4">
                                <div>
                                  <p className="font-medium text-sm">{app.personalInfo.fullName}</p>
                                  <p className="text-xs text-muted-foreground">{app.personalInfo.email}</p>
                                </div>
                              </td>
                              <td className="p-4">
                                <Badge variant="outline" className="text-xs capitalize">
                                  {app.loanPurpose}
                                </Badge>
                              </td>
                              <td className="p-4 font-medium text-sm">
                                {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(app.rentLoanDetails?.desiredLoanAmount || app.landLoanDetails?.desiredLoanAmount || 0)}
                              </td>
                              <td className="p-4 text-sm text-muted-foreground">
                                {app.submittedAt ? format(new Date(app.submittedAt), 'MMM dd, yyyy') : 'N/A'}
                              </td>
                              <td className="p-4">
                                <Badge
                                  variant="secondary"
                                  className={`${getStatusColor(app.status)} capitalize`}
                                >
                                  {app.status.replace("_", " ")}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <Link href={`/admin/applications/${app._id}`}>
                                  <Button variant="ghost" size="sm">
                                    View Details
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {applications.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No applications found.</p>
              ) : (
                applications.map((app) => (
                  <Card key={app._id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link href={`/admin/applications/${app._id}`} className="font-medium text-sm hover:underline">
                              {app._id.substring(0, 8).toUpperCase()}
                            </Link>
                            <p className="text-xs text-muted-foreground mt-1">
                              {app.submittedAt ? format(new Date(app.submittedAt), 'MMM dd, yyyy') : 'N/A'}
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className={`${getStatusColor(app.status)} capitalize`}
                          >
                            {app.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <div>
                          <p className="font-medium">{app.personalInfo.fullName}</p>
                          <p className="text-sm text-muted-foreground">{app.personalInfo.email}</p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs capitalize">
                              {app.loanPurpose}
                            </Badge>
                            <span className="font-medium text-sm">
                              {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(app.rentLoanDetails?.desiredLoanAmount || app.landLoanDetails?.desiredLoanAmount || 0)}
                            </span>
                          </div>
                          <Link href={`/admin/applications/${app._id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {(meta.page - 1) * meta.limit + 1}-{Math.min(meta.page * meta.limit, meta.total)} of {meta.total} applications
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={meta.page === 1}
                    onClick={() => updateFilters("page", (meta.page - 1).toString())}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={meta.page === meta.totalPages}
                    onClick={() => updateFilters("page", (meta.page + 1).toString())}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  )
}
