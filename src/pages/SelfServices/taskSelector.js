import { Grid, Typography } from "@mui/material";
import React from "react";
import Dropdown from "../../../components/EvoDropDown";
import { useTaskData } from "../../services/selfservice";

export default function TaskSelector({ classes, task, setTask }) {
  const { data: tasksData } = useTaskData();

  return (
    <Grid className={classes.contentBox}>
      <Typography
        style={{
          padding: "10px",
          fontSize: "14px",
          fontFamily: "Inter",
          fontWeight: "bold",
        }}
      >
        Task
      </Typography>

      <Dropdown
        data={tasksData}
        caller={setTask}
        month={task}
        getoptionlabelkey="payPeriodName"
      />
    </Grid>
  );
}
