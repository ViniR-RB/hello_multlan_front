// LoginPage.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import {
  Box,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  keyframes,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import LogoMultlan from "../../../../public/logo.png";
import LoadingButton from "../../../core/components/LoadingButton";
import { useAuth } from "../../../core/context/AuthContext";
import { useSnackbar } from "../../../core/context/SnackBarContext";
const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  from { border-color: transparent }
  50% { border-color: black }
  to { border-color: transparent }
`;

// Typography component estilizado
const AnimatedTypography = styled(Typography)`
  display: inline-block;
  overflow: hidden;
  border-right: 3px solid;
  white-space: nowrap;
  margin: 0;
  animation: ${typewriter} 2s steps(20, end), ${blink} 0.75s step-end infinite;
  width: fit-content;
`;

const loginSchema = z.object({
  email: z.string().email({ message: "Digite um email válido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const { showError } = useSnackbar();
  const onSubmit = (data: LoginFormInputs) => {
    const { email, password } = data;
    (async () => {
      setIsLoading(true);
      const result = await login({ email, password });
      setIsLoading(false);
      if (result === true) {
        navigate("/dashboard");
      } else {
        showError("Erro ao fazer login");
      }
    })();
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img width={150} src={LogoMultlan} alt="Logo Multlan" />
              <AnimatedTypography variant="h4" gutterBottom>
                Hello Multlan
              </AnimatedTypography>
            </Box>

            <Box
              sx={{ maxWidth: 500 }}
              onSubmit={handleSubmit(onSubmit)}
              component="form"
            >
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
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  },
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
                Entrar
              </LoadingButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
