// MapPage.tsx
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../core/context/AuthContext";
import routes from "../../../core/routes";
import ButtonLink from "../components/ButtonLink";
import MapController from "../controller/MapController";
// Configura o ícone do marcador
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapPage: React.FC = () => {
  const position: [number, number] = [-5.168096, -42.791906];
  const navigation = useNavigate();
  const { logout } = useAuth();
  const { data, error, isLoading } = MapController();
  const options = [
    { label: "Apple", id: 1 },
    { label: "Banana", id: 2 },
    { label: "Cherry", id: 3 },
    { label: "Date", id: 4 },
    { label: "Grape", id: 5 },
  ];

  const [value, setValue] = useState(null);

  const handleDetailBox = (boxId: string) => {
    console.log(boxId);
  };

  if (isLoading) {
    return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        ".leaft-pane": {
          transform: "translate3d(30px, 0px, 0px)",
        },
      }}
    >
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box component="span" sx={{ flexGrow: 1 }}>
            <img
              src={"/logo.svg"}
              alt="Logo Multlan"
              style={{ width: "100px", height: "auto" }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {routes.map(
              (route, index) =>
                route.path !== "/map" && (
                  <ButtonLink
                    key={index}
                    title={route.name}
                    onClick={() => navigation(route.path)}
                  />
                )
            )}
            <ButtonLink title={"Sair"} onClick={() => logout()} />
          </Box>
        </Box>
      </AppBar>
      <AppBar
        position="fixed"
        sx={{
          top: "92px",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo preto com opacidade 0.5
        }}
      >
        <Box my={1} mx={1}>
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label}
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a fruit"
                variant="outlined"
              />
            )}
            sx={{ width: 300 }}
          />
        </Box>
      </AppBar>

      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {data?.map((item, index) => {
          return (
            <Marker
              key={index}
              position={[Number(item.latitude), Number(item.longitude)]}
              icon={icon}
            >
              <Popup>
                <Typography variant="caption">Signal: {item.signal}</Typography>
                <br />
                <Typography variant="caption">label: {item.label}</Typography>
                <br />
                <Typography variant="caption">
                  Quantidade de Clientes: {item.listUser.length}
                </Typography>
                <br />
                <Button
                  onClick={() => handleDetailBox(item.id)}
                  variant="text"
                  size="small"
                >
                  Ver Detalhes
                </Button>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Box>
  );
};

export default MapPage;
