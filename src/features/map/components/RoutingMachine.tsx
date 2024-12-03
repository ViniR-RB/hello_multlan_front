import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "../../../core/namespaces/leaflet-routing-machine.d.ts";

const RoutingMachine = ({
  start,
  end,
}: {
  start: [number, number];
  end: [number, number];
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !start || !end) return;

    // Adiciona a rota ao mapa
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]), // Ponto inicial
        L.latLng(end[0], end[1]), // Ponto final
      ],
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, end]);

  return null;
};

export default RoutingMachine;
