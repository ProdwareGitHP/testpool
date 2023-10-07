import React from "react";
import { CustomPanel } from "../components/CustomPanel";
import { Grid, Typography } from "@mui/material";

const PageNotFound = (props) => {
  return (
    <CustomPanel title={"404"}>
      <Typography>{`Page Not Found`}</Typography>
    </CustomPanel>
  );
};

const Index = () => {
  return (
    <Grid container>
      <PageNotFound />
    </Grid>
  );
};

export default Index;
