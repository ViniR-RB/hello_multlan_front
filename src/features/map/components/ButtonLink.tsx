import { Button, useTheme } from "@mui/material";

interface ButtonLinkProps {
  title: string;
  onClick: () => void;
}

function ButtonLink({ title, onClick }: ButtonLinkProps) {
  const theme = useTheme();
  return (
    <Button
      onClick={onClick}
      variant="text"
      sx={{
        position: "relative", // Necessário para posicionar a barra
        color: theme.palette.primary.contrastText, // Cor inicial do texto
        overflow: "hidden",
        transition: "color 0.3s ease",
        "&:hover": {
          color: theme.palette.secondary.main, // Cor do texto ao passar o mouse (contraste com a barra)
        },
        "&::before": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "2px", // Altura da barra
          backgroundColor: theme.palette.primary.main, // Cor da barra
          transform: "scaleX(0)", // Começa oculta
          transformOrigin: "center",
          transition: "transform 0.3s ease", // Animação ao passar o mouse
        },
        "&:hover::before": {
          transform: "scaleX(1)", // Mostra a barra ao passar o mouse
        },
      }}
    >
      {title}
    </Button>
  );
}

export default ButtonLink;
