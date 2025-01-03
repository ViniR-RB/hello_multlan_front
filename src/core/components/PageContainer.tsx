import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const shouldShowBackButton =
    location.pathname.split("/").filter(Boolean).length > 2;
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Box
      sx={{
        mx: "auto",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: `flex`,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography variant="h6" color="textPrimary" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {shouldShowBackButton && (
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{ mr: 1 }}
            aria-label="voltar"
          >
            Voltar
          </Button>
        )}
      </Box>
      <Divider flexItem={true} orientation="horizontal" sx={{ mb: 2 }} />
      {children}
    </Box>
  );
};

export default PageContainer;
