import { zodResolver } from "@hookform/resolvers/zod";
import { Person } from "@mui/icons-material";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PageContainer from "../../../core/components/PageContainer";
import { useSnackbar } from "../../../core/context/SnackBarContext";
import AppQuery from "../../../core/querys/appQuery";
import UserCard from "../components/UserCard";
import UserPageSkeleton from "../components/UserPageSkeleton";
import UsersController from "../controller/UsersController";

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Insira um email válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

function UsersPage() {
  const queryClient = useQueryClient();
  const { users, isLoading, error, createUser } = UsersController();
  const { showSuccess, showError } = useSnackbar();
  const [openModalCreateUser, setOpenModalCreateUser] = useState(false);

  const handleClickModal = () => {
    setOpenModalCreateUser((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createUser(data);
      showSuccess("Usuário criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: [AppQuery.getUsers] });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 400 && error.response?.data.message) {
          showError(`Usuário já está registrado`);
        }
      }
    } finally {
      reset();
      handleClickModal();
    }
  };

  if (isLoading) {
    return <UserPageSkeleton />;
  }

  return (
    <PageContainer title="Usuários">
      <Modal open={openModalCreateUser} onClose={handleClickModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Criar Usuário
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={handleClickModal}>
                Cancelar
              </Button>
              <Button variant="contained" type="submit">
                Enviar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Box mt={1} mb={1}>
        <Button
          onClick={handleClickModal}
          endIcon={<Person />}
          variant="outlined"
        >
          Adicionar
        </Button>
      </Box>

      {users!.map((user) => {
        return <UserCard user={user} />;
      })}
    </PageContainer>
  );
}

export default UsersPage;
