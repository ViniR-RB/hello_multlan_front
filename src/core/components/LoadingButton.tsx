import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { FC } from "react";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  loadingText?: string;
}

const LoadingButton: FC<LoadingButtonProps> = ({
  loading: loading,
  loadingText = "Carregando...",
  children,
  disabled,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={disabled || loading} // Desativa o botão quando `loading` é true
      size="large"
      endIcon={loading ? <CircularProgress size={20} /> : props.endIcon} // Usa o `endIcon` se `loading` for false
    >
      {loading ? loadingText : children}
    </Button>
  );
};

export default LoadingButton;
