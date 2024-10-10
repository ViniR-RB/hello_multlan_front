import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { FC } from "react";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string; 
}
const LoadingButton: FC<LoadingButtonProps> = ({
  loading = false,
  loadingText = "Carregando...", 
  children, 
  disabled, 
  ...props 
}) => {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      size="large"
      endIcon={loading ? <CircularProgress size={20} /> : props.startIcon} 
    >
      {loading ? loadingText : children}{" "}
      
    </Button>
  );
};

export default LoadingButton;
