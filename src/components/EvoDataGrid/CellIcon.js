import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { EvoHBox } from "../EvoBox";

function CellIcon({ onClick, tooltip, Icon, color, size }) {
  return (
    <EvoHBox justifyContent="center">
      <IconButton disableRipple onClick={onClick}>
        <Tooltip title={tooltip}>
          <Icon
            style={{ fontSize: size || "18px", color: color || "#124590" }}
          />
        </Tooltip>
      </IconButton>
    </EvoHBox>
  );
}

export default CellIcon;
