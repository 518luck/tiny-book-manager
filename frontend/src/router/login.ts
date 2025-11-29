import { type RouteObject } from "react-router-dom";

export const loginRoutes: RouteObject[] = [
  {
    path: "/",
    lazy: async () => {
      const module = await import("@/views/login/Login");
      return { Component: module.default };
    },
  },
  {
    path: "/register",
    lazy: async () => {
      const module = await import("@/views/login/Register");
      return { Component: module.default };
    },
  },
];
