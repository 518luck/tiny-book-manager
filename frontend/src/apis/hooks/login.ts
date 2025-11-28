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
} from "@/apis/https/login";

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
