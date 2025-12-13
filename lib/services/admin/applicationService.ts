import { adminAxiosInstance } from "@/lib/axios"
import { FilterParams } from "@/lib/types/admin/application"

export const adminApplicationService = {
  getApplication: (id: string) => adminAxiosInstance.get(`/admin/applications/${id}`),
  updateApplicationStatus: (id: string, status: "under_review") => adminAxiosInstance.patch(`/admin/applications/${id}/status`, { status }),
  approveApplication: (id: string, reviewNotes?: string) => adminAxiosInstance.post(`/admin/applications/${id}/approve`, { reviewNotes }),
  rejectApplication: (id: string, rejectionReason: string) => adminAxiosInstance.post(`/admin/applications/${id}/reject`, { rejectionReason }),
  addNotes: (id: string, reviewNotes: string) => adminAxiosInstance.post(`/admin/applications/${id}/notes`, { reviewNotes }),
  exportApplications: () => adminAxiosInstance.get(`/admin/applications/export`, { responseType: 'blob' }),
  getApplications: (filterParams: FilterParams) => adminAxiosInstance.get(`/admin/applications/search`, { params: filterParams }),
  getRecentApplications: () => adminAxiosInstance.get(`/admin/applications/recent?limit=10`),
}