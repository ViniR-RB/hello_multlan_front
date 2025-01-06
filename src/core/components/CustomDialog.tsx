import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CustomDialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  handleClose: () => void;
}

export default function CustomDialog({
  open,
  title,
  children,
  handleClose,
}: CustomDialogProps) {
  const theme = useTheme();
  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth={`lg`}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      {children}
    </Dialog>
  );
}
