import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import routes from "../routes";

function AsideNavigation() {
  const drawerWidth = 240; // Largura do Drawer
  const [open, setOpen] = useState(false); // Estado para controlar a abertura do Drawer

  // Função para alternar a expansão do menu
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent" // Drawer fixo
      open={open}
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidth : 60,
          boxSizing: "border-box",
          backgroundColor: "primary.main", // Cor de fundo primária
          color: "white", // Cor do texto
          transition: "width 0.3s ease", // Transição suave na largura
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: open ? "flex-end" : "center",
          alignItems: "center", // Alinhamento vertical
          p: 2,
          height: "64px", // Altura fixa para o cabeçalho
        }}
      >
        <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Divider />

      <List>
        {routes.map((route) => (
          <Tooltip
            onClick={() => {
              console.log(route.path);
            }}
            title={!open ? route.name : ""}
            placement="right"
            key={route.name}
          >
            <ListItem>
              <ListItemIcon sx={{ color: "white" }}>
                {React.createElement(route.icon)}
              </ListItemIcon>
              {open && <ListItemText primary={route.name} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
}

export default AsideNavigation;
