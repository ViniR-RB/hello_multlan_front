import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface AuxiliaryComponentsMapProps {
  icon: string;
  active: boolean;
  onClick: () => void;
}

function AuxiliaryComponentsMap({
  icon,
  onClick,
  active,
}: AuxiliaryComponentsMapProps) {
  const theme = useTheme();
  return (
    <IconButton
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        backgroundColor: "#fff",
        height: "56px",
        width: "56px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adiciona uma sombra sutil
        background: !active ? "#f0f0f0" : theme.palette.primary.main, // Usando a cor primary do tema
        "&:hover": {
          backgroundColor: "#f0f0f0", // Cor ao passar o mouse
        },
      }}
    >
      <img
        src={icon}
        alt="Ícone"
        style={{
          filter: active
            ? `invert(1) sepia(1) saturate(5) hue-rotate(180deg)`
            : "none", // Inverte a cor para dar contraste
          transition: "filter 0.3s", // Adiciona transição suave
        }}
      />
    </IconButton>
  );
}

export default AuxiliaryComponentsMap;
