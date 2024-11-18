import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
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
  {
    name: "Usuários",
    icon: GroupIcon,
    path: "/users",
  },
];

export default routes;
