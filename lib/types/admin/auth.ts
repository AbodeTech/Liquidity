export interface Admin {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  access_token: string;
  admin: Admin;
}

export interface LoginRequestPayload {
  email: string;
  password: string;
}


export interface InviteUserPayload {
  email: string;
  name: string;
}


export interface acceptInvitationPayload {
  token: string;
  password: string;
}