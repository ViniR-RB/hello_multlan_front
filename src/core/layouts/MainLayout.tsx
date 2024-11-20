import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import CustomDrawer from "../components/CustomDrawer";
const MainLayout: React.FC = () => {
  const drawerWidth = 240;
  const [open, setOpen] = useState<boolean>(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: "auto" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box component="span" sx={{ flexGrow: 1 }}>
            <img
              src="/logo.svg"
              alt="Logo Multlan"
              style={{ width: "100px", height: "auto" }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <CustomDrawer open={open} drawerWidth={drawerWidth} />

      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: { xs: "64px", sm: "64px" }, // Margem igual à altura da AppBar padrão do MUI
          p: 2, // Espaçamento interno
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
