import React, { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { Typography } from "@mui/material";
import better_messages from "../utils/messages.json";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert ref={ref} {...props} />;
});

export const SnackBar = ({ snakeBarProps }) => {
  const [snakeBarStates, setSnakeBarStates] = useState({ ...snakeBarProps });

  useEffect(() => {
    setSnakeBarStates({ ...snakeBarProps });
  }, [snakeBarProps]);

  const handleClose = (event, reason) => {
    setSnakeBarStates({});
    if (reason === "clickaway") {
      return;
    }
  };

  const { msz, type, details } = snakeBarStates;

  return (
    msz != undefined && (
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%" }}
        style={{ borderRadius: 0 }}
      >
        <Typography style={{ fontSize: "14px" }}>{msz}</Typography>

        {details?.map((value) => (
          <Typography style={{ fontSize: "13px" }}>
            {better_messages[value] || value}
          </Typography>
        ))}
      </Alert>
    )
  );
};
