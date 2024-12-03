import { createContext, ReactNode, useContext } from "react";

interface MapContextType {}

interface MapProviderProps {
  children: ReactNode;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  return <MapContext.Provider value={{}}>{children}</MapContext.Provider>;
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within an AuthProvider");
  }
  return context;
};
