import { Box, Grid } from "@mui/material";
import React from "react";
import PublishedRosters from "./PublishedRosters";
import MyRequests from "./myrequests";
import MyTeam from "./myteam";
import Timecard from "./timecardDetails";
import SelfRoster from "./SelfRoster";
import { EvoHBox, EvoVBox } from "../../components/EvoBox";

const Dashboard = () => {
  return (
    <EvoHBox alignItems="start" gap={2}>
      <EvoVBox style={{ width: "50%" }} gap={2}>
        <Timecard />
        <SelfRoster />
      </EvoVBox>

      <EvoVBox style={{ width: "50%" }} gap={2}>
        <MyRequests />
        <MyTeam />
        <PublishedRosters />
      </EvoVBox>
    </EvoHBox>
  );
};

export default Dashboard;
