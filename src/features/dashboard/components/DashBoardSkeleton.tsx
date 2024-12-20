import { Box, Skeleton } from "@mui/material";
import PageContainer from "../../../core/components/PageContainer";

export default function DashBoardSkeleton() {
  return (
    <Box display={"flex"}>
      <PageContainer title="Resumo das Caixas">
        <Skeleton variant="rectangular" width={"100%"} height={42} />
      </PageContainer>
    </Box>
  );
}
