import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getCurrentTime } from "../utils/commonService";

function Clock() {
  const [date, setDate] = useState(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(getCurrentTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Typography style={{ fontSize: "16px", color: "grey", fontWeight: "bold" }}>
      {date}
    </Typography>
  );
}

export default Clock;
