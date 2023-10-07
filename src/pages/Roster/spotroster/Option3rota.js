import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

const Option3rota = (props) => {
  const stafdummy = [
    { id: "1", group: "Nursing 1", nmbr: "1" },
    { id: "2", group: "Nursing 2", nmbr: "1" },
    { id: "3", group: "Nursing 3", nmbr: "2" },
    { id: "4", group: "Nursing 4", nmbr: "5" },
  ];
  const staffdetdummy = [
    { id: "1", group: "demmy1", nmbr: "25663" },
    { id: "2", group: "demmy2", nmbr: "18756" },
    { id: "3", group: "demmy3", nmbr: "27445" },
    { id: "4", group: "demmy4", nmbr: "54575" },
  ];
  const [staffname, setStaffname] = useState(stafdummy[0].group);
  const changeStaffname = (e) => {
    setStaffname(e.target);
    console.log(e.target);
  };
  return (
    <Grid container style={{ marginTop: "10px" }}>
      <Grid
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Grid>
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "5px 20px",
              background: "#efebf9",
              width: "30em",
            }}
          >
            <Typography style={{ fontWeight: "bold", marginLeft: "10px" }}>
              Staff Groups
            </Typography>
          </Grid>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "5px 20px",
              width: "30em",
              marginLeft: "40px",
            }}
          >
            <Grid item xs={2}>
              <Typography>#</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography>Group</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>No of staff</Typography>
            </Grid>
          </Box>
          <Box
            style={{
              marginLeft: "40px",
            }}
          >
            {stafdummy?.length > 0 &&
              stafdummy?.map((item, index) => {
                return (
                  <Grid container alignItems="center">
                    <Grid item xs="2">
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          margin: "0px!important",
                        }}
                      >
                        {item?.id}
                      </Typography>
                    </Grid>
                    <Grid item xs="5">
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          margin: "0px!important",
                        }}
                      >
                        {item?.group}
                      </Typography>
                    </Grid>
                    <Grid item xs="3">
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          margin: "0px!important",
                        }}
                      >
                        {item?.nmbr}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })}
          </Box>
        </Grid>
        <Grid>
          <Grid
            style={{
              displa: "flex",
              flexDirection: "column",
              margin: "5px 20px",
              background: "#efebf9",
              width: "30em",
            }}
          >
            <Typography style={{ fontWeight: "bold", marginLeft: "10px" }}>
              Staff For {staffname}
            </Typography>
          </Grid>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "5px 20px",
              width: "30em",
              marginLeft: "40px",
            }}
          >
            <Grid item xs={2}>
              <Typography>#</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography>Employee Number</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>Employee</Typography>
            </Grid>
          </Box>
          <Box
            style={{
              marginLeft: "40px",
            }}
          >
            {staffdetdummy?.length > 0 &&
              staffdetdummy?.map((item, index) => {
                return (
                  <Grid container alignItems="center">
                    <Grid item xs="2">
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          margin: "0px!important",
                        }}
                      >
                        {item?.id}
                      </Typography>
                    </Grid>
                    <Grid item xs="5">
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          margin: "0px!important",
                        }}
                      >
                        {item?.nmbr}
                      </Typography>
                    </Grid>
                    <Grid item xs="3">
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          margin: "0px!important",
                        }}
                      >
                        {item?.group}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Option3rota;
