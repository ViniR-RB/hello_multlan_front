// LoginPage.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import LoadingButton from "../../../core/components/LoadingButton";
import { useAuth } from "../../../core/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email({ message: "Digite um email válido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

const signupSchema = loginSchema.extend({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;
type SignupFormInputs = z.infer<typeof signupSchema>;

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUpToggle = () => {
    setIsSignUp(!isSignUp);
  };
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs | SignupFormInputs>({
    resolver: zodResolver(isSignUp ? signupSchema : loginSchema),
  });
  const navigate = useNavigate();
  const onSubmit = (data: LoginFormInputs | SignupFormInputs) => {
    setIsLoading(true);

    if (isSignUp) {
      console.log("Cadastro: ", data);
    } else {
      const { email, password } = data;

      login({ email, password }).finally(() => setIsLoading(false));
      navigate("/dashboard");
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Lado esquerdo com a imagem de fundo */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          backgroundImage: "linear-gradient(to right, #3a7bd5, #00d2ff)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
        }}
      />

      {/* Lado direito com o card de login/cadastro */}
      <Grid item xs={12} md={6} sm={12}>
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "full",
            height: "100%",
            p: 4,
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Hello Multlan
            </Typography>

            <Box
              sx={{ maxWidth: 500 }}
              onSubmit={handleSubmit(onSubmit)}
              component="form"
            >
              {/* Campo de nome (aparece apenas se for cadastro) */}
              {isSignUp && (
                <TextField
                  fullWidth
                  {...register("name" as const)}
                  label="Nome"
                  error={!!(errors as FieldErrors<SignupFormInputs>).name}
                  helperText={
                    (errors as FieldErrors<SignupFormInputs>).name?.message
                  }
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              {/* Campo de email com ícone */}
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                margin="normal"
                {...register("email")}
                type="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Campo de senha com ícone */}
              <TextField
                fullWidth
                label="Password"
                error={!!errors.password}
                helperText={errors.password?.message}
                variant="outlined"
                margin="normal"
                {...register("password")}
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <LoadingButton
                fullWidth
                loading={isLoading}
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                {isSignUp ? "Criar Conta" : "Entrar"}
              </LoadingButton>
            </Box>

            {/* Botão para alternar entre Login e Cadastro */}
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              {isSignUp ? "Já tem uma conta?" : "Ainda não tem conta?"}&nbsp;
              <Button
                onClick={handleSignUpToggle}
                variant="text"
                color="primary"
              >
                {isSignUp ? "Fazer login" : "Criar agora"}
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
