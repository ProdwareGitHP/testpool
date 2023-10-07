import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import { parseValue } from "../../utils/commonService";

const ReadOnlyElement = ({ type, value }) => (
  <Tooltip title={value || ""}>
    <Typography style={{ fontSize: "14px" }}>
      <Box>{parseValue(value, type)}</Box>
    </Typography>
  </Tooltip>
);

export default ReadOnlyElement;
