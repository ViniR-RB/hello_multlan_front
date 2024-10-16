// App.tsx
import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./core/components/MainLayout";
import AuthPage from "./features/auth/pages/Auth";
import DashboardPage from "./features/dashboard/pages/Dashboard";
import MapPage from "./features/map/pages/MapPage";

const router = createBrowserRouter(
  [
    {
      path: "/",

      element: <MainLayout />, // Usando o layout comum

      children: [
        {
          path: "", // Rota para Dashboard
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: "dashboard", // Rota para Dashboard
          element: <DashboardPage />,
        },
        {
          path: "map", // Rota para o mapa
          element: <MapPage />,
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
  return <RouterProvider router={router} />;
};

export default App;
