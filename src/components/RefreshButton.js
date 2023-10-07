import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import CachedIcon from "@mui/icons-material/Cached";
import React from "react";

export const RefreshButton = () => {
  const refresh = () => window.location.reload(true);

  const classes = makeStyles(() => ({
    grid4: {
      cursor: "pointer",
      verticalAlign: "middle",
      color: "black",
      height: 40,
      width: 40,
    },
  }))();

  return (
    <IconButton
      sx={{ "&:hover": { color: "#124590" } }}
      onClick={refresh}
      className={classes.grid4}
    >
      <CachedIcon />
    </IconButton>
  );
};
