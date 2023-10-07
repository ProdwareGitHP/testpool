import { Grid, Typography } from "@mui/material";
import React from "react";

export const ErrorFallback = (props) => {
  const { componentStack, error } = props;

  return (
    <Grid item xs={8} m={1}>
      <Typography
        variant="h5"
        style={{
          color: "red",
          display: "flex",
        }}
      >
        Oops! Something went wrong
      </Typography>

      <div style={{ overflowY: "auto", marginTop: 10 }}>
        {error && error.toString()}
        {componentStack}
      </div>
    </Grid>
  );
};

export const ErrorFallback2 = (props) => {
  const {  error } = props;

  return (
    <div style={{ overflowY: "auto", border: 1, fontSize: 12 }}>
      {error && error.toString()}
    </div>
  );
};
