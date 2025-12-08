import { axiosInstance } from "@/lib/axios";
import { ApplicationRequestType, ApplicationSaveDraftRequestType, ApplicationUploadDocumentDeleteRequestType, ApplicationUploadDocumentRequestType, GetAplicationsFilterParams } from "@/lib/types/user/application";




export const applicationService = {
  submitApplication: (payload: ApplicationRequestType) => axiosInstance.post("/api/applications/submit", payload),
  uploadDocument: (payload: ApplicationUploadDocumentRequestType) => {
    const formData = new FormData()
    formData.append("file", payload.file)
    formData.append("documentType", payload.documentType)

    return axiosInstance.post("/api/uploads/document", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  deleteDocument: (payload: ApplicationUploadDocumentDeleteRequestType) => axiosInstance.delete("/api/uploads/document", { data: payload }),
  saveDraft: (payload: ApplicationSaveDraftRequestType) => axiosInstance.post("/api/drafts", payload),
  getDraft: (draftId: string) => axiosInstance.get(`/api/drafts/${draftId}`),
  updateDraft: (draftId: string, payload: ApplicationSaveDraftRequestType) => axiosInstance.patch(`/api/drafts/${draftId}`, payload),
  deleteDraft: (draftId: string) => axiosInstance.delete(`/api/drafts/${draftId}`),
  getDrafts: () => axiosInstance.get("/api/drafts"),
  getApplications: (params: GetAplicationsFilterParams) => axiosInstance.get("/api/applications", { params }),
  getApplication: (applicationId: string) => axiosInstance.get(`/api/applications/${applicationId}`),
}