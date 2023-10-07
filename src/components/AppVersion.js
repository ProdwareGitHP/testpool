import { Box, Typography } from "@mui/material";
import packagejson from "../../package.json";
import React from "react";

export const AppVersion = () => {
  return (
    <Box
      style={{
        padding: 15,
        paddingBottom: 5,
        paddingTop: 5,
      }}
    >
      <Typography style={{ margin: "2px", color: "grey", fontSize: "12px" }}>
        {"Version " + packagejson.version}
      </Typography>
    </Box>
  );
};
