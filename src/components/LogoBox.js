import { Box } from "@mui/material";
import React from "react";
import EvoImage from "./EvoImage";

export const LogoBox = () => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "end",
      }}
    >
      <EvoImage name={"evosys-logo"} />
      <EvoImage name={"wf-logo"} />
    </Box>
  );
};
