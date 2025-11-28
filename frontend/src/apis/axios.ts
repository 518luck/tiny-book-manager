// /src/api/axios.ts
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: "/api", // 你的后端接口基础地址
  timeout: 10000, // 超时时间 10 秒
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
service.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 你可以统一处理返回数据
    return response.data;
  },
  (error) => {
    // 统一错误处理
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          console.error("未授权，请登录");
          break;
        case 403:
          console.error("没有权限");
          break;
        case 500:
          console.error("服务器错误");
          break;
        default:
          console.error(error.response.data.message || "请求出错");
      }
    } else {
      console.error(error.message);
    }
    return Promise.reject(error);
  },
);

export { service };
