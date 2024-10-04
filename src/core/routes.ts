import DashboardIcon from "@mui/icons-material/Dashboard";
import MapIcon from "@mui/icons-material/Map";
interface Route {
  name: string;
  icon: React.ElementType;
  path: string;
}

const routes: Route[] = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/dashboard",
  },
  {
    name: "Mapa",
    icon: MapIcon,
    path: "/map",
  },
];

export default routes;
