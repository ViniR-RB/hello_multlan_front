import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

type SnackbarContextType = {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

type SnackbarState = {
  message: string;
  severity: AlertColor;
  open: boolean;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: "",
    severity: "success",
    open: false,
  });

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({ message, severity, open: true });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const contextValue: SnackbarContextType = {
    showSuccess: (message) => showSnackbar(message, "success"),
    showError: (message) => showSnackbar(message, "error"),
    showInfo: (message) => showSnackbar(message, "info"),
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Hook para usar o contexto
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar deve ser usado dentro de um SnackbarProvider");
  }
  return context;
};
