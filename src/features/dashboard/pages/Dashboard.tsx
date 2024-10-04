// DashboardPage.tsx
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import PageContainer from "../../../core/components/PageContainer";

const DashboardPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <PageContainer>
        <Typography variant="h4" gutterBottom>
          Resumo
        </Typography>

        {/* Grid de Cards */}
        <Grid container spacing={3}>
          {/* Card: Quantidade de Caixas */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Quantidade de Caixas
                </Typography>
                <Typography variant="h4" color="primary">
                  120 {/* Substitua pelo valor dinâmico */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card: Clientes Catalogados */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Clientes Catalogados
                </Typography>
                <Typography variant="h4" color="primary">
                  45 {/* Substitua pelo valor dinâmico */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PageContainer>
    </Box>
  );
};

export default DashboardPage;
