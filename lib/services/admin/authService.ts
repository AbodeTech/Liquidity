import { acceptInvitationPayload, InviteUserPayload, LoginRequestPayload } from "@/lib/types/admin/auth";
import { adminAxiosInstance, noAuthAxiosInstance } from "../../axios";

export const adminAuthService = {
  login: (payload: LoginRequestPayload) => noAuthAxiosInstance.post("/admin/login", payload),
  inviteUser: (payload: InviteUserPayload) => adminAxiosInstance.post("/admin/invite", payload),
  acceptInvitation: (payload: acceptInvitationPayload) => noAuthAxiosInstance.post("/admin/accept-invite", payload),
}