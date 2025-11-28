import { service } from "@/apis/axios";
import { type ErrorResponse } from "@/types/errorResponse";

// 登录API
export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse extends ErrorResponse {
  username: string;
  password: string;
}
export const loginApi = (data: LoginRequest): Promise<LoginResponse> => {
  return service.post("/user/login", data);
};

// 注册API
export interface RegisterRequest {
  username: string;
  password: string;
}
export interface RegisterResponse extends ErrorResponse {
  username: string;
  password: string;
}
export const registerApi = (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  return service.post("/user/register", data);
};
