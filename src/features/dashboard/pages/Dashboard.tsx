// DashboardPage.tsx
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import PageContainer from "../../../core/components/PageContainer";
import DashBoardSkeleton from "../components/DashBoardSkeleton";
import MapController from "../controller/DashBoardController";

const DashboardPage = () => {
  const { data, error, isLoading } = MapController();

  if (isLoading) {
    return <DashBoardSkeleton />;
  }

  return (
    <PageContainer title="Resumo das Caixas">
      <Box sx={{ display: "flex" }}>
        {/* Grid de Cards */}
        <Grid width={"100%"} container spacing={3}>
          {/* Card: Quantidade de Caixas */}
          <Grid size={{ xs: 12, md: 6 }}>
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
          <Grid size={{ xs: 12, md: 6 }}>
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
      </Box>
    </PageContainer>
  );
};

export default DashboardPage;
