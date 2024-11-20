import { Box, Divider, Typography } from "@mui/material";
import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, title }) => {
  return (
    <Box
      sx={{
        mx: "auto",
        p: 3,
      }}
    >
      <Typography variant="h6" color="textPrimary" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Divider flexItem={true} orientation="horizontal" sx={{ mb: 2 }} />
      {children}
    </Box>
  );
};

export default PageContainer;
