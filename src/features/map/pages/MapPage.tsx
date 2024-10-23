// MapPage.tsx
import { Box } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
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
  const position: [number, number] = [-5.168096, -42.791906]; // Coordenadas do centro do mapa
  const controller = MapController();
  const [boxs, setBoxs] = useState<Array<any>>([]);
  useEffect(() => {
    const getBoxs = () => {
      controller.getBox().then((data) => setBoxs(data));
    };
    getBoxs();
  }, []);
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

        {boxs.map((item, index) => {
          console.log(item);
          return (
            <Marker
              key={index}
              position={[item.latitude, item.longitude]}
              icon={icon}
            >
              <Popup>Você está aqui!</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Box>
  );
};

export default MapPage;
