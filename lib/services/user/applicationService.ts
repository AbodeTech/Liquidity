import { axiosInstance } from "@/lib/axios";
import { ApplicationRequestType, ApplicationSaveDraftRequestType, ApplicationUploadDocumentDeleteRequestType, ApplicationUploadDocumentRequestType, GetAplicationsFilterParams } from "@/lib/types/user/application";
import { uploadToCloudinary } from "./uploadToCloudinary";




export const applicationService = {
  submitApplication: (payload: ApplicationRequestType) => axiosInstance.post("/api/applications/submit", payload),
  uploadDocument: async (payload: ApplicationUploadDocumentRequestType) => {
    // First upload to Cloudinary
    const cloudinaryResponse = await uploadToCloudinary({
      file: payload.file,
      folder: "documents",
    });

    if (!cloudinaryResponse) {
      throw new Error("Failed to upload document to Cloudinary");
    }

    // Then send the documentUrl to the API
    return axiosInstance.post("/api/uploads/document", {
      documentUrl: cloudinaryResponse.secure_url,
      documentType: payload.documentType,
    });
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