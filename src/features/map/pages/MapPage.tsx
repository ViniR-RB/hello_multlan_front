// MapPage.tsx
import {
  Alert,
  AppBar,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import RulerIcon from "../../../../public/icons/ruler_icon.svg";
import { useAuth } from "../../../core/context/AuthContext";
import BoxModel from "../../../core/models/box_model";
import Location from "../../../core/models/location";
import routes from "../../../core/routes";
import AuxiliaryComponentsMap from "../components/AuxiliaryComponentsMap";
import BoxDetailButtomSheet from "../components/BoxDetailButtomSheet";
import ButtonLink from "../components/ButtonLink";
import { FlyToLocation } from "../components/FlyToLocation";
import RoutingMachine from "../components/RoutingMachine";
import MapController from "../controller/MapController";
import "../styles/rounting_machine.css";
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
  const { data, error, isLoading, getGeoByAddress } = MapController();

  const [placeOptions, setPlaceOptions] = useState<Location[]>([]);
  const [place, setPlace] = useState<Location>();
  const [address, setAddress] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const [startLocation, setStartLocation] = useState<[number, number] | null>(
    null
  );
  const [endLocation, setEndLocation] = useState<[number, number] | null>(null);

  const [selectedPoints, setSelectedPoints] = useState<number>(0);

  const [openModalBoxDetail, setOpenModalBoxDetail] = useState<boolean>(false);

  const [activeSearchRoute, setActiveSearchRoute] = useState<boolean>(false);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const [messageSnackBar, setMessageSnackBar] = useState<string>("");

  const handleShowSnackBar = (message: string) => {
    setMessageSnackBar(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackBar = () => {
    setMessageSnackBar("");
    setOpenSnackbar(false);
  };

  const handleDetailBox = (boxId: string) => {
    setOpenModalBoxDetail(true);

    console.log(boxId);
  };

  const handleMapClick = (event: BoxModel | Location) => {
    const { latitude, longitude } = event;
    const lat = Number(latitude);
    const long = Number(longitude);

    if (!startLocation) {
      setStartLocation([lat, long]);
    } else if (!endLocation) {
      setEndLocation([lat, long]);
    }

    // Incrementa o contador de pontos
    setSelectedPoints((prevCount) => prevCount + 1);
  };

  const handleClearPoints = () => {
    setStartLocation(null);
    setEndLocation(null);
    setSelectedPoints(0);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(address);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  });

  useEffect(() => {
    if (debouncedValue) {
      const fetchOptions = async () => {
        setSearchLoading(true);

        const results = await getGeoByAddress(debouncedValue);
        if (results.length === 1) {
          setPlace(results[0]);
        }
        setPlaceOptions(results);
        setSearchLoading(false);
      };
      fetchOptions();
    } else {
      setPlaceOptions([]);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (selectedPoints > 0) {
      handleShowSnackBar(`Pontos selecionados: ${selectedPoints}`);
    }
  }, [selectedPoints, openSnackbar]);

  const auxiliaryButtonsArray = useMemo(() => {
    return [
      {
        icon: RulerIcon,
        onClick: () => setActiveSearchRoute((prev) => !prev),

        active: activeSearchRoute,
      },
    ];
  }, [activeSearchRoute]);

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
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => {
            handleClearPoints();
            handleCloseSnackBar();
          }}
          severity={"info"}
          sx={{ width: "100%" }}
        >
          {messageSnackBar}
        </Alert>
      </Snackbar>

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
        <Box my={1} mx={1} sx={{ display: "flex", gap: 1 }}>
          <Autocomplete
            options={placeOptions || []}
            getOptionLabel={(option) => option?.label || ""}
            value={place || null}
            noOptionsText="Nenhum resultado encontrado"
            onInputChange={(event, newInputValue) => setAddress(newInputValue)}
            onChange={(event, newValue) => setPlace(newValue || undefined)}
            renderInput={(params) => (
              <TextField {...params} label="Procurar Local" variant="filled" />
            )}
            sx={{
              width: 300,
              "& .MuiFilledInput-root": {
                backgroundColor: "white",
              },
              "& .MuiFilledInput-root:hover": {
                backgroundColor: "#f3f3f3",
              },
              "& .MuiFilledInput-root.Mui-focused": {
                backgroundColor: "#ffffff",
              },
            }}
          />

          {auxiliaryButtonsArray.map((item, index) => (
            <AuxiliaryComponentsMap
              key={index}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
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
            <>
              <BoxDetailButtomSheet
                key={item.id}
                open={openModalBoxDetail}
                box={item}
                onClose={() => setOpenModalBoxDetail(false)}
              />
              <Marker
                key={index}
                position={[Number(item.latitude), Number(item.longitude)]}
                icon={icon}
                zIndexOffset={3000}
                // eventHandlers={{
                //   click: () => handleMapClick(item), // Aqui você chama a função ao clicar no marcador
                // }}
              >
                <Popup>
                  <Typography variant="caption">
                    Signal: {item.signal}
                  </Typography>
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
                  <Button
                    onClick={() => handleMapClick(item)}
                    variant="text"
                    size="small"
                  >
                    Adicionar na Rota
                  </Button>
                </Popup>
              </Marker>
            </>
          );
        })}

        {startLocation && endLocation && (
          <RoutingMachine start={startLocation} end={endLocation} />
        )}

        {place && (
          <>
            <FlyToLocation position={[place.latitude, place.longitude]} />
            <Marker position={[place.latitude, place.longitude]} icon={icon}>
              <Popup>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography textAlign={"center"} variant="subtitle1">
                    {place.label}
                  </Typography>
                  <Button
                    onClick={() => handleMapClick(place)}
                    variant="text"
                    size="small"
                  >
                    Adicionar a Rota
                  </Button>
                </Box>
              </Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </Box>
  );
};

export default MapPage;
