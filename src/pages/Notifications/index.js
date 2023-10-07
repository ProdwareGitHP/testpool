import { Grid } from "@mui/material";
import React from "react";
import Timesheet from "./timesheet";
import AllNotifications from "./all";

const Notifications = () => {
  return (
      <Grid container>
        <Grid item xs={6}>
          <AllNotifications />
        </Grid>
        <Grid item xs={6}>
          <Timesheet />
        </Grid>
      </Grid>
  );
};

export default Notifications;
