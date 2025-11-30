import { service } from "@/apis/axios";
import { type ErrorResponse } from "@/types/errorResponse";

// 创建书籍API
export interface CreateBookRequest {
  name: string;
  author: string;
  description: string;
  cover: string;
}
export interface CreateBookResponse extends ErrorResponse {
  id: string;
  name: string;
  author: string;
  description: string;
  cover: string;
}
export const createBookApi = (
  data: CreateBookRequest,
): Promise<CreateBookResponse> => {
  return service.post("/book/create", data);
};

// 上传图片API
export const uploadImageApi = (data: File): Promise<ErrorResponse | string> => {
  const formData = new FormData();
  formData.append("file", data);
  return service.post("/book/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 获取书籍列表API
export type GetBookListResponse = ErrorResponse & CreateBookResponse[];
export const getBookListApi = (): Promise<GetBookListResponse> => {
  return service.get("/book/list");
};
