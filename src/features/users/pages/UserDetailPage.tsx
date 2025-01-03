import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import PageContainer from "../../../core/components/PageContainer";
import { useSnackbar } from "../../../core/context/SnackBarContext";
import UserModel from "../../../core/models/user_model";
import {
  ResetPasswordInputs,
  resetPasswordSchema,
} from "../../../core/schemas/reset_password_schema";
import UsersController from "../controller/UsersController";
function UserDetailPage() {
  const { uuid, name, email } = useParams();
  console.log(useParams());
  const { updatePassword } = UsersController();
  const [editUser, setEditUser] = useState<boolean>(false);
  const { showSuccess, showError } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleClickEditUser = () => {
    setEditUser((prev) => {
      return !prev;
    });
  };

  const handleClickSaveUser = async (data: ResetPasswordInputs) => {
    console.log(data);
    const payload = {
      id: uuid,
      password: data.password,
    };
    try {
      await updatePassword(payload as Pick<UserModel, "id" | "password">);
      showSuccess("Senha atualizada com sucesso");
      handleClickEditUser();
    } catch (error) {
      console.error(error);
      showError("Erro em atualizar a senha");
    }
  };

  return (
    <PageContainer title={`Detalhes de ${name}`}>
      <Box
        component={"form"}
        onSubmit={handleSubmit(handleClickSaveUser)}
        sx={{
          overflowX: "hidden",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          borderRadius: "8px",
          py: 2,
        }}
      >
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
            onClick={() => {
              return editUser === false
                ? handleClickEditUser()
                : handleSubmit(handleClickSaveUser);
            }}
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
                value={name}
                disabled={true}
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
            <Grid size={6}>
              <TextField
                {...register("password")}
                type="password"
                disabled={!editUser}
                error={!!errors.password}
                helperText={errors.password?.message}
                label={"Senha"}
                fullWidth
              />
            </Grid>
            <Grid size={6}>
              <TextField
                {...register("confirmPassword")}
                type="password"
                disabled={!editUser}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                label={"Confirmar Senha"}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageContainer>
  );
}

export default UserDetailPage;
