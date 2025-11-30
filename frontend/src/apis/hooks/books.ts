import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

import {
  createBookApi,
  type CreateBookRequest,
  type CreateBookResponse,
  deleteBookApi,
  type DeleteBookResponse,
  getBookApi,
  getBookListApi,
  type GetBookResponse,
  updateBookApi,
  type UpdateBookRequest,
  type UpdateBookResponse,
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
  const { onSuccess, ...restOptions } = options || {};
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createBookApi(data),
    onSuccess: (...data) => {
      queryClient.invalidateQueries({ queryKey: ["bookList"] });
      onSuccess?.(...data);
    },
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

// 修改书籍API
export const useUpdateBookMutation = (
  options?: UseMutationOptions<
    UpdateBookResponse,
    AxiosError<UpdateBookResponse>,
    UpdateBookRequest
  >,
): UseMutationResult<
  UpdateBookResponse,
  AxiosError<UpdateBookResponse>,
  UpdateBookRequest
> => {
  const { onSuccess, ...restOptions } = options || {};
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateBookApi(data),
    onSuccess: (...data) => {
      queryClient.invalidateQueries({ queryKey: ["bookList"] });
      onSuccess?.(...data);
    },
    ...restOptions,
  });
};

// 获取单本书籍API
export const useGetBookQuery = (
  id: string,
  options?: Partial<
    UseQueryOptions<GetBookResponse, AxiosError<GetBookResponse>>
  >,
) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookApi(id),
    ...options,
  });
};

// 删除书籍API
export const useDeleteBookMutation = (
  options?: UseMutationOptions<
    DeleteBookResponse,
    AxiosError<DeleteBookResponse>,
    string
  >,
): UseMutationResult<
  DeleteBookResponse,
  AxiosError<DeleteBookResponse>,
  string
> => {
  const { onSuccess, ...restOptions } = options || {};
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteBookApi(id),
    onSuccess: (...data) => {
      queryClient.invalidateQueries({ queryKey: ["bookList"] });
      onSuccess?.(...data);
    },
    ...restOptions,
  });
};
