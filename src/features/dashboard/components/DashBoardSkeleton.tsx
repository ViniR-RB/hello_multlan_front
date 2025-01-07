import { Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PageContainer from "../../../core/components/PageContainer";

export default function DashBoardSkeleton() {
  return (
    <PageContainer title="Resumo das Caixas">
      <Grid
        sx={{
          width: "100%",
        }}
        container
        spacing={3}
      >
        {[0, 1, 2, 3].map((_, index) => (
          <Grid key={index} size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rectangular" width={"100%"} height={117} />
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
