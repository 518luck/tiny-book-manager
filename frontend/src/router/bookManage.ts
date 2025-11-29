import { type RouteObject } from "react-router-dom";

export const bookManageRoutes: RouteObject[] = [
  {
    path: "/book-manage",
    lazy: async () => {
      const module = await import("@/views/BookManage/Library");
      return { Component: module.default };
    },
  },
];
