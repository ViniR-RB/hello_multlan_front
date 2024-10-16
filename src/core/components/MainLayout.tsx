import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import CustomDrawer from "./CustomDrawer"; // Importe seu componente AsideNavigation
const MainLayout: React.FC = () => {
  const drawerWidth = 240;
  const [open, setOpen] = useState<boolean>(false);

  // Função para abrir e fechar o Drawer
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
            Hello Multlan
          </Box>
        </Toolbar>
      </AppBar>
      <CustomDrawer open={open} drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, pt: 10 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
