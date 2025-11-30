import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

import {
  createBookApi,
  type CreateBookRequest,
  type CreateBookResponse,
  getBookListApi,
  uploadImageApi,
} from "@/apis/https/books";
import { type ErrorResponse } from "@/types/errorResponse";

// 创建书籍API
export const useCreateBookMutation = (
  options?: UseMutationOptions<
    CreateBookResponse,
    AxiosError<CreateBookResponse>,
    CreateBookRequest
  >,
): UseMutationResult<
  CreateBookResponse,
  AxiosError<CreateBookResponse>,
  CreateBookRequest
> => {
  const { ...restOptions } = options || {};
  return useMutation({
    mutationFn: (data) => createBookApi(data),
    ...restOptions,
  });
};

// 上传图片API
export const useUploadImageMutation = (
  options?: UseMutationOptions<
    ErrorResponse | string,
    AxiosError<ErrorResponse | string>,
    File
  >,
): UseMutationResult<
  ErrorResponse | string,
  AxiosError<ErrorResponse | string>,
  File
> => {
  const { ...restOptions } = options || {};
  return useMutation({
    mutationFn: (data) => uploadImageApi(data),
    ...restOptions,
  });
};
// 获取书籍列表API

export const useGetBookListMutation = (options = {}) => {
  return useQuery({
    queryKey: ["bookList"],
    queryFn: () => getBookListApi(),
    ...options,
  });
};
