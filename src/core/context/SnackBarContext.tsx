import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

type SnackbarContextType = {
  showSuccess: (message: string, closeEvent?: () => void) => void;
  showError: (message: string, closeEvent?: () => void) => void;
  showInfo: (message: string, closeEvent?: () => void) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

type SnackbarState = {
  message: string;
  severity: AlertColor;
  open: boolean;
  closeEvent: (() => void) | null;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: "",
    severity: "success",
    open: false,
    closeEvent: null,
  });

  const showSnackbar = (
    message: string,
    severity: AlertColor,
    closeEvent: (() => void) | null
  ) => {
    setSnackbar({ message, severity, open: true, closeEvent });
  };

  const handleClose = () => {
    setSnackbar((prev) => {
      if (prev.closeEvent) {
        prev.closeEvent(); // Executa a função adicional (se houver)
      }
      return { ...prev, open: false, closeEvent: null }; // Reseta o estado
    });
  };

  const contextValue: SnackbarContextType = {
    showSuccess: (message, closeEvent) =>
      showSnackbar(message, "success", closeEvent ?? null), // Define `null` caso `closeEvent` seja `undefined`
    showError: (message, closeEvent) =>
      showSnackbar(message, "error", closeEvent ?? null),
    showInfo: (message, closeEvent) =>
      showSnackbar(message, "info", closeEvent ?? null),
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={snackbar.open}
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
