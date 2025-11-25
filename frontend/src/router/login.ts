import { type RouteObject } from "react-router-dom";

export const loginRoutes: RouteObject[] = [
  {
    path: "/",
    lazy: async () => {
      const module = await import("@/views/login/login");
      return { Component: module.default };
    },
  },
];
