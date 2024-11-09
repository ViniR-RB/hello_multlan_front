// DashboardPage.tsx
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import PageContainer from "../../../core/components/PageContainer";
import DashBoardSkeleton from "../components/DashBoardSkeleton";
import MapController from "../controller/DashBoardController";
const DashboardPage = () => {
  const { data, error, isLoading } = MapController();

  if (isLoading) {
    return <DashBoardSkeleton />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <PageContainer>
        <Typography variant="h4">Resumo</Typography>

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
                  {data.totalBoxes}
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
                  {data.totalCustomers}
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
