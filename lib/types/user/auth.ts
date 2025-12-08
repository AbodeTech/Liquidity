export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface RegisterRequestPayload {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

export interface ForgotPasswordRequestPayload {
  email: string;
}

export interface SetupPasswordRequestPayload {
  token: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
}