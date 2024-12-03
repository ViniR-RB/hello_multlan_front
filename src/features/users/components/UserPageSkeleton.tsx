import { Box, Divider, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PageContainer from "../../../core/components/PageContainer";

function UserPageSkeleton() {
  const arrayFake = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <PageContainer title="Usuários">
      <Box mt={1} mb={1}>
        <Skeleton variant="rectangular" width={133} height={37} />
      </Box>
      <>
        {arrayFake.map((index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: 400,
              minWidth: 400,
              height: 150,
              ml: "auto",
              mr: "auto",
            }}
          >
            <Grid
              container
              sx={{ height: "70%", width: "100%", alignItems: "center" }}
            >
              <Grid size={4}>
                <Skeleton variant="circular" width={66} height={66} />
              </Grid>

              <Grid size={8}>
                <Skeleton variant="rectangular" height={28} />
                <Skeleton variant="rectangular" height={28} />
                <Skeleton variant="rectangular" height={28} />
                <Skeleton variant="rectangular" height={28} />
              </Grid>
            </Grid>
            <Skeleton
              sx={{ mr: "auto", mx: 1 }}
              variant="circular"
              width={24}
              height={24}
            />
            <Divider flexItem={true} orientation="horizontal" />
          </Box>
        ))}
      </>
    </PageContainer>
  );
}

export default UserPageSkeleton;
