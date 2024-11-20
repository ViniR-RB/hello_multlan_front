import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import PageContainer from "../../../core/components/PageContainer";
function UserDetailPage() {
  const { id, name, email } = useParams();

  const [editUser, setEditUser] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    // resolver: zodResolver(schema),
  });

  const handleClickEditUser = async () => {
    setEditUser((prev) => !prev);
  };

  const handleClickSaveUser = async (data: any) => {
    handleClickEditUser();
  };

  return (
    <PageContainer title={`Detalhes de ${name}`}>
      <Box
        sx={{
          overflowX: "hidden",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          borderRadius: "8px",
          py: 2,
        }}
      >
        <form onSubmit={handleSubmit(handleClickSaveUser)}>
          <Box
            sx={{
              gap: 2,
              padding: 2,
              display: "flex",
              flexWrap: "warp",
            }}
          >
            <Avatar sx={{ width: 48, height: 48, bgcolor: "primary.main" }}>
              {name![0]}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {email}
              </Typography>
            </Box>
            <Button
              type={editUser === false ? "button" : "submit"}
              sx={{ marginLeft: { sm: "auto" } }}
              color="primary"
              variant="outlined"
              endIcon={<EditIcon />}
              size="small"
              aria-label="Editar usuário"
              onClick={
                editUser === false ? handleClickEditUser : handleClickSaveUser
              }
            >
              {editUser ? "Salvar" : "Editar Usuário"}
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              px: 2,
              gap: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  {...register("name")}
                  value={name}
                  disabled={!editUser}
                  label={"Nome"}
                  fullWidth
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  value={email}
                  disabled={true}
                  label={"E-mail"}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  {...register("password")}
                  type="password"
                  value={email}
                  disabled={!editUser}
                  label={"Senha"}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </PageContainer>
  );
}

export default UserDetailPage;
