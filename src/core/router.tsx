import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../features/auth/pages/Auth";
import DashboardPage from "../features/dashboard/pages/Dashboard";
import MapPage from "../features/map/pages/MapPage";
import UserDetailPage from "../features/users/pages/UserDetailPage";
import UsersPage from "../features/users/pages/UsersPage";
import CoreLayout from "./layouts/CoreLayout";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./layouts/PrivateRouter";

const authRouters = {
  path: "login", // Rota para Login (fora do MainLayout)
  element: <AuthPage />,
};

const privateRouters = {
  path: "/",
  element: <PrivateRoute />,
  children: [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "dashboard",
          element: <DashboardPage />,
        },
        {
          path: "map",
          element: <MapPage />,
        },
        {
          path: "users",
          element: <UsersPage />,
          children: [
            {
              path: ":uuid",
              element: <UserDetailPage />,
            },
          ],
        },
      ],
    },
  ],
};

const router = createBrowserRouter([
  {
    path: "",
    element: <CoreLayout />,
    children: [privateRouters, authRouters],
  },
]);

export default router;
