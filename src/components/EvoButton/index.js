import { Button } from "@mui/material";
import React from "react";

export const EvoButton = (props) => {
  const { btnText, startIcon, endIcon, btnClass, styles } = props;

  return (
    <Button
      size={"small"}
      style={{ textTransform: "none", ...btnClass, ...styles }}
      startIcon={startIcon && startIcon}
      endIcon={endIcon && endIcon}
      {...props}
    >
      {btnText}
    </Button>
  );
};

EvoButton.defaultProps = {
  variant: "contained",
};
