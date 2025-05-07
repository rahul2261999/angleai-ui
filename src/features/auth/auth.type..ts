export interface SignupRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  tenantId: string;
  id: string;
  name: string;
  email: string;
  status: string;
  verificationStatus: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignInResponse {
  token: string;
  user: AuthenticatedUser;
}


