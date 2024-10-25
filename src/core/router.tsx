import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../features/dashboard/pages/Dashboard";
import MainLayout from "./components/MainLayout";
import PrivateRoute from "./utils/PrivateRouter";
import MapPage from "../features/map/pages/MapPage";
import Layout from "./utils/Layout";
import AuthPage from "../features/auth/pages/Auth";

const authRouters = {
  path: "login", // Rota para Login (fora do MainLayout)
  element: <AuthPage />,
}


const privateRouters =  {
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
}




 const router = createBrowserRouter(
    [
      {
        path: '',
        element: <Layout />,
        children: [
         privateRouters,
         authRouters
          
        ]
      },
      
    ],
  );




  export default router