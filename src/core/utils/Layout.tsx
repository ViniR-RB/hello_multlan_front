import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
