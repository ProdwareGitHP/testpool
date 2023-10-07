import { Box, Typography } from "@mui/material";
import React from "react";

export const NoDataBox = ({style}) => {
  return (
    <Box style={{ marginTop: "15px", marginLeft: "15px", ...style }}>
      <Typography>No data to display</Typography>
    </Box>
  );
};
