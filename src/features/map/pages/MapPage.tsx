// MapPage.tsx
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
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
  const { data, error, isLoading } = MapController();

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
