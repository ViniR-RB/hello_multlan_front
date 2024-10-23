import LogoutIcon from "@mui/icons-material/Logout";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import routes from "../routes";

interface CustomDrawerProps {
  open: boolean;
  drawerWidth: number;
}

function CustomDrawer({ open, drawerWidth }: CustomDrawerProps) {
  const navigation = useNavigate();
  const collapsedWidth = 60;
  const { logout } = useAuth();
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        overflowX: "hidden",
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        transition: "width 0.3s ease", // Transição suave na largura
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidth : collapsedWidth,
          overflowX: "hidden",
          boxSizing: "border-box",
          transition: "width 0.3s ease", // Transição suave na largura
        },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {routes.map((route) => (
          <Tooltip
            key={route.name}
            title={!open ? route.name : ""}
            placement="right"
          >
            <ListItem onClick={() => navigation(route.path)}>
              <ListItemIcon>{React.createElement(route.icon)}</ListItemIcon>
              {open && <ListItemText primary={route.name} />}
            </ListItem>
          </Tooltip>
        ))}

        <Tooltip title={!open ? "Logout" : ""} placement="right">
          <ListItem onClick={() => logout()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItem>
        </Tooltip>
      </List>
    </Drawer>
  );
}

export default CustomDrawer;
