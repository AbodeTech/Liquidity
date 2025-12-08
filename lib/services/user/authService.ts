import { noAuthAxiosInstance } from "@/lib/axios";
import { ForgotPasswordRequestPayload, LoginRequestPayload, RegisterRequestPayload } from "@/lib/types/user/auth";




export const userAuthService = {
  login: (payload: LoginRequestPayload) => noAuthAxiosInstance.post("/api/auth/login", payload),
  signup: (payload: RegisterRequestPayload) => noAuthAxiosInstance.post("/api/auth/register", payload),
  forgotPassword: (payload: ForgotPasswordRequestPayload) => noAuthAxiosInstance.post("/api/auth/forgot-password", payload),
}