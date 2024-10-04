// LoginPage.tsx
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

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Estado para controlar se é cadastro ou login

  // Função para alternar entre Login e Sign Up
  const handleSignUpToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Lado esquerdo com a imagem de fundo */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: "url(https://via.placeholder.com/600)", // Substitua pela URL da sua imagem
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Lado direito com o card de login/cadastro */}
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: "#f0f0f0" }} // Cor de fundo suave
      >
        <Card sx={{ maxWidth: 400, p: 4 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Hello Multlan
            </Typography>

            <Box component="form">
              {/* Campo de nome (aparece apenas se for cadastro) */}
              {isSignUp && (
                <TextField
                  fullWidth
                  label="Nome"
                  variant="outlined"
                  margin="normal"
                  required
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
                margin="normal"
                type="email"
                required
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
                variant="outlined"
                margin="normal"
                type="password"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                {isSignUp ? "Criar Conta" : "Entrar"}
              </Button>
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

export default LoginPage;
