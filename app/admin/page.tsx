
"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Loader2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { adminDashboardStaticsServices } from "@/lib/services/admin/dashboardStaticsServices"
import { OverviewCards } from "@/components/admin/dashboard/OverviewCards"
import { StatusBreakdownChart } from "@/components/admin/dashboard/StatusBreakdownChart"
import { TypeBreakdownChart } from "@/components/admin/dashboard/TypeBreakdownChart"
import { RecentApplications } from "@/components/admin/dashboard/RecentApplications"

export default function AdminDashboard() {
  const { data: overviewData, isLoading: isLoadingOverview } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: adminDashboardStaticsServices.getDashboardStatics,
  })

  const { data: statusData, isLoading: isLoadingStatus } = useQuery({
    queryKey: ["dashboard-status"],
    queryFn: adminDashboardStaticsServices.getDashboardStatusStatistics,
  })

  const { data: typeData, isLoading: isLoadingType } = useQuery({
    queryKey: ["dashboard-type"],
    queryFn: adminDashboardStaticsServices.getDashboardApplicationStatistics,
  })

  const isLoading = isLoadingOverview || isLoadingStatus || isLoadingType

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    )
  }

  const overview = overviewData?.data?.overview
  const trends = overviewData?.data?.trends
  const rejectedPercentage = statusData?.data?.breakdown.find(i => i.status === "REJECTED")?.percentage || 0

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of loan applications and activity</p>
        </div>

        {/* Stats Cards */}
        {overview && trends && (
          <OverviewCards
            overview={overview}
            trends={trends}
            rejectedPercentage={rejectedPercentage}
          />
        )}

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          {statusData?.data?.breakdown && (
            <StatusBreakdownChart data={statusData.data.breakdown} />
          )}
          {typeData?.data?.breakdown && (
            <TypeBreakdownChart data={typeData.data.breakdown} />
          )}
        </div>

        {/* Recent Applications */}
        <RecentApplications />
      </div>
    </AdminLayout>
  )
}

