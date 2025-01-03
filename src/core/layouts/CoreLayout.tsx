import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { SnackbarProvider } from "../context/SnackBarContext";
const queryClient = new QueryClient();

export default function CoreLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
