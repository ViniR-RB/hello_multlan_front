import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

interface FlyToLocationProps {
  position: number[];
}

export const FlyToLocation = ({ position }: FlyToLocationProps) => {
  const map = useMap(); // Hook acessa o contexto do mapa
  const lastPositionRef = useRef<[number, number] | null>(null);

  useEffect(() => {
    // Verifica se a posição mudou
    if (
      lastPositionRef.current === null || // Primeira execução
      position[0] !== lastPositionRef.current[0] ||
      position[1] !== lastPositionRef.current[1]
    ) {
      map.flyTo([position[0], position[1]], map.getZoom());
      lastPositionRef.current = [position[0], position[1]]; // Atualiza a última posição
    }
  }, [map, position]);

  return null; // Este componente apenas manipula o estado do mapa
};
