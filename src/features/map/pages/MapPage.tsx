// MapPage.tsx
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// Configura o ícone do marcador
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapPage: React.FC = () => {
  const position: [number, number] = [51.505, -0.09]; // Coordenadas do centro do mapa

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* AppBar do MUI */}
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mapa com AppBar
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Mapa */}
      <Box sx={{ flexGrow: 1 }}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={icon}>
            <Popup>Você está aqui!</Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Box>
  );
};

export default MapPage;
