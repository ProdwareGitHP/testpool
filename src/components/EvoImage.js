import React from "react";
import { Box } from "@mui/material";

function EvoImage({ name, height, width }) {
  return (
    <Box>
      <img
        style={{ height: width || "48px", height: height, marginLeft: 10 }}
        src={"/ews/assets/images/" + name + ".png"}
      />
    </Box>
  );
}

export default EvoImage;
