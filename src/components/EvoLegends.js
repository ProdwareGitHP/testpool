import { Box, Typography, Grid } from "@mui/material";
import React from "react";

function Legend({ item }) {
  const { status, blockColor, textColor, bgColor } = item;
  return (
    <Box display="inline-block" mr={1}>
      {blockColor && (
        <Box
          style={{
            backgroundColor: blockColor,
            width: "10px",
            height: "10px",
            display: "inline-block",
          }}
        ></Box>
      )}

      <Typography
        variant="body"
        sx={{
          color: textColor,
          fontSize: "14px",
          backgroundColor: bgColor,
          padding: "2px 6px",
          borderRadius: "5px",
        }}
      >
        {status}
      </Typography>
    </Box>
  );
}

function EvoLegends({ statuses }) {
  return (
    <Grid>
      {statuses.map((item) => (
        <Legend item={item} />
      ))}
    </Grid>
  );
}

export default EvoLegends;
