import { service } from "@/apis/axios";
import { type ErrorResponse } from "@/types/errorResponse";

// 登录API
interface LoginRequest {
  username: string;
  password: string;
}
interface LoginResponse {
  username: string;
  password: string;
}
export const login = (
  data: LoginRequest,
): Promise<LoginResponse | ErrorResponse> => {
  return service.post("/user/login", data);
};

// 注册API
interface RegisterRequest {
  username: string;
  password: string;
}
interface RegisterResponse {
  username: string;
  password: string;
}
export const register = (
  data: RegisterRequest,
): Promise<RegisterResponse | ErrorResponse> => {
  return service.post("/user/register", data);
};
