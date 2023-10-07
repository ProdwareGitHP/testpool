import { Box } from "@mui/material";
import * as React from "react";

import EvoToggleButton from "../../../components/EvoButton/toggle";

const list = [
  { value: "cost/center", label: "Cost Center View" },
  { value: "person", label: "Person View" },
];

export default function ViewSelector({ status, setStatus }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <EvoToggleButton status={status} handlechange={setStatus} list={list} />
    </Box>
  );
}
