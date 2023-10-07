import { Box, Tooltip } from "@mui/material";
import React from "react";

const CustomTooltip = (data) => {
  return (
    <Tooltip
      title={
        <React.Fragment>
          <p>{`Series: Scheduled`}</p>
          <p>{`Group: ${data.name}`}</p>
          <p>{`Value: ${data.Scheduled}`}</p>
        </React.Fragment>
      }
      placement="top"
    >
      <Box sx={{ bgcolor: "white", p: 1, border: "1px solid #ccc" }}>
        <p>{data.name}</p>
        <p>Scheduled: {data.Scheduled}</p>
        <p>Actual: {data.Actual}</p>
      </Box>
    </Tooltip>
  );
};

export default CustomTooltip;
