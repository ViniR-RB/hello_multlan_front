// DashboardPage.tsx
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PageContainer from "../../../core/components/PageContainer";
import MapController from "../controller/DashBoardController";

const DashboardPage = () => {
  const { summary } = MapController();
  const [totalBoxs, setTotalBoxs] = useState<string>("");
  const [totalCustomers, setTotalCustomers] = useState<string>("");

  useEffect(() => {
    summary().then((data) => {
      setTotalBoxs(data.totalBoxes);
      setTotalCustomers(data.totalCustomers);
    });

    (async () => {
    const data =  await summary()
    setTotalBoxs(data.totalBoxes);
      setTotalCustomers(data.totalCustomers);
      
  })();

  }, []);

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
                  {totalBoxs}
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
                  {totalCustomers}
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
