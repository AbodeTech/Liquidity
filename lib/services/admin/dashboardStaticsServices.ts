import { adminAxiosInstance } from "@/lib/axios"
import {
  DashboardOverviewResponse,
  DashboardStatusStatisticsResponse,
  DashboardApplicationStatisticsResponse
} from "@/lib/types/admin/dashboard"

export const adminDashboardStaticsServices = {
  getDashboardStatics: () => adminAxiosInstance.get<DashboardOverviewResponse>("/admin/dashboard/statistics"),
  getDashboardStatusStatistics: () => adminAxiosInstance.get<DashboardStatusStatisticsResponse>("/admin/statistics/status"),
  getDashboardApplicationStatistics: () => adminAxiosInstance.get<DashboardApplicationStatisticsResponse>("/admin/statistics/type"),
}