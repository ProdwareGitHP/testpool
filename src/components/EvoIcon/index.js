import { makeStyles } from "@mui/styles";
import React from "react";

export const EvoIcon = ({ Icon, onClick }) => {
  const classes = makeStyles(() => ({
    icon: {
      color: "#124590",
      fontSize: "small",
      cursor: "pointer",
    },
  }))();

  return <Icon className={classes.icon} onClick={onClick} />;
};
