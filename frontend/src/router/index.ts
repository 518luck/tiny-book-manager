import { createBrowserRouter } from "react-router-dom";

import { bookManageRoutes } from "@/router/bookManage";
import { loginRoutes } from "@/router/login";

const router = createBrowserRouter([...loginRoutes, ...bookManageRoutes]);

export default router;
