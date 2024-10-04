import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import AsideNavigation from "./AsideNavigation"; // Importe seu componente AsideNavigation

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AsideNavigation /> {/* Componente de navegação lateral */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
