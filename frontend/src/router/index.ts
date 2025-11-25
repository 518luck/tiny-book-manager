import { createBrowserRouter } from "react-router-dom";

import { loginRoutes } from "@/router/login";

const router = createBrowserRouter([...loginRoutes]);

export default router;
