import Close from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import BoxModel from "../../../core/models/box_model";
interface BoxDetailButtomSheetProps {
  box: BoxModel;
  open: boolean;
  onClose: () => void;
}

function BoxDetailButtomSheet({ box }: BoxDetailButtomSheetProps) {
  return (
    <Box
      component={"form"}
      sx={{
        p: 2,
        maxHeight: "60vh",
        background: "#fff",
        borderRadius: "16px 16px 0 0",
        overflowY: "auto",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          ml: "auto",
          mr: "auto",
          maxWidth: "1024px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box width={300} height={300}>
          <img
            src={box.image}
            alt={box.id}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
            }}
          />
        </Box>

        <Grid container width={"100%"} spacing={1}>
          <Grid size={6}>
            <TextField
              variant="outlined"
              fullWidth
              value={box.label}
              label="Rótulo"
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              value={box.freeSpace}
              label="Total de Clientes"
            />
          </Grid>
        </Grid>

        <Grid container width={"100%"} spacing={1}>
          <Grid size={6}>
            <TextField
              variant="outlined"
              fullWidth
              value={box.filledSpace}
              label="Clientes Ativos"
            />
          </Grid>
          <Grid size={6}>
            <TextField fullWidth value={box.signal} label="Sinal" />
          </Grid>
        </Grid>
        <Box width={`100%`}>
          {box.listUser.length > 0 ? (
            <>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant="h6">Clientes</Typography>
                <Button>Adicionar Clientes</Button>
              </Box>

              <Grid container spacing={1}>
                {box.listUser.map((client, index) => (
                  <Grid key={index} size={12}>
                    <TextField
                      fullWidth
                      value={client}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="description for action"
                                onClick={() => {}}
                              >
                                <Close />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Typography variant="h6">Nenhum cliente cadastrado</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default BoxDetailButtomSheet;
