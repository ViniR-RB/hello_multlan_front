import { Box } from "@mui/material";
import React from "react";

const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        maxWidth: "1024px", // Limita a largura máxima
        width: "100%", // Garante que a largura ocupe 100% do espaço disponível
        mx: "auto", // Centraliza horizontalmente
        p: 3, // Adiciona um padding ao redor do conteúdo
      }}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
