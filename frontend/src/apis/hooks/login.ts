import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

import {
  loginApi,
  type LoginRequest,
  type LoginResponse,
  registerApi,
  type RegisterRequest,
  type RegisterResponse,
} from "@/apis/https/login";
// 登录API
export const useLoginMutation = (
  options?: UseMutationOptions<
    LoginResponse,
    AxiosError<LoginResponse>,
    LoginRequest
  >,
): UseMutationResult<
  LoginResponse,
  AxiosError<LoginResponse>,
  LoginRequest
> => {
  const { ...restOptions } = options || {};
  return useMutation({
    mutationFn: (data) => loginApi(data),
    ...restOptions,
  });
};
// 注册API
export const useRegisterMutation = (
  options?: UseMutationOptions<
    RegisterResponse,
    AxiosError<RegisterResponse>,
    RegisterRequest
  >,
): UseMutationResult<
  RegisterResponse,
  AxiosError<RegisterResponse>,
  RegisterRequest
> => {
  const { ...restOptions } = options || {};
  return useMutation({
    mutationFn: (data) => registerApi(data),
    ...restOptions,
  });
};
