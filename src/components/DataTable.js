import { Grid } from "@mui/material";
import React from "react";
import { NoDataBox } from "./NoDataBox";

export const DataTable = ({ data, DataItemComponent }) => {
  return (
    <Grid className="data-table-full">
      {data?.length > 0 ? data.map(DataItemComponent) : <NoDataBox />}
    </Grid>
  );
};
