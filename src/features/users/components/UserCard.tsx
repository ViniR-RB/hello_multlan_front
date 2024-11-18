import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import UserModel from "../../../core/models/user_model";
import render_date_br from "../../../core/utils/renders";

interface UserCardProps {
  user: UserModel;
}

const UserCard: React.FC<UserCardProps> = ({
  user: { id, name, email, createdAt, updatedAt },
}) => {
  return (
    <Box
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
          <AccountCircleIcon
            sx={{
              fontSize: 80,
            }}
          />
        </Grid>

        <Grid size={8}>
          <Typography variant="subtitle1" color="textPrimary" noWrap>
            {name}
          </Typography>

          <Typography variant="subtitle1" color="textSecondary" noWrap>
            {email}
          </Typography>

          <Typography variant="subtitle1" color="textSecondary" noWrap>
            {render_date_br(createdAt)}
          </Typography>

          <Typography variant="subtitle1" color="textSecondary" noWrap>
            {render_date_br(updatedAt)}
          </Typography>
        </Grid>
      </Grid>
      <Tooltip sx={{ mr: "auto" }} title="Perfil do usuário">
        <IconButton color="default" component={Link} to={`/users/${id}`}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Divider flexItem={true} orientation="horizontal" />
    </Box>
  );
};

export default UserCard;
