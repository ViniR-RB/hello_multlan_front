import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./core/components/MainLayout";
import { AuthProvider } from "./core/context/AuthContext";
import PrivateRoute from "./core/utils/PrivateRouter";
import AuthPage from "./features/auth/pages/Auth";
import DashboardPage from "./features/dashboard/pages/Dashboard";
import MapPage from "./features/map/pages/MapPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PrivateRoute />, // Protegendo as rotas com PrivateRoute
      children: [
        {
          path: "/",
          element: <MainLayout />, // Envolvendo o MainLayout
          children: [
            {
              path: "dashboard",
              element: <DashboardPage />,
            },
            {
              path: "map",
              element: <MapPage />, // Página do Mapa protegida
            },
          ],
        },
      ],
    },
    {
      path: "login", // Rota para Login (fora do MainLayout)
      element: <AuthPage />,
    },
  ],
  {}
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
