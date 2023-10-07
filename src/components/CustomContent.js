import { LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { PanelContext } from "./CustomContent/context";
import { EvoVBox } from "./EvoBox";
import { SnackBar } from "./Snackbar";

export const CustomContent = ({
  children,
  isLoading,
  isSaving,
  snakeBarProps,
  style,
  divider,
}) => {
  const [isLoading2, setLoading] = useState(false);
  const [snakeBarProps2, setSnakeBar] = useState({});

  return (
    <PanelContext.Provider value={{ setLoading, setSnakeBar }}>
      {(isLoading || isSaving || isLoading2) && (
        <LinearProgress sx={{ height: 3 }} />
      )}
      <SnackBar snakeBarProps={{ ...snakeBarProps, ...snakeBarProps2 }} />
      <EvoVBox
        divider={divider ?? true}
        style={{
          padding: "8px 12px",
          flex: 1,
          overflow: "auto",
          ...style,
        }}
      >
        {children}
      </EvoVBox>
    </PanelContext.Provider>
  );
};
