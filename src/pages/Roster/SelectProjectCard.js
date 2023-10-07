import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { EvoButton } from "../../components/EvoButton";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { DateWidget } from "../shared/datewidget";

export const SelectProjectCard = (props) => {
  const classes = useStyles();
  const { oriPagedata } = props;
  const commonReducer = useSelector((state) => state.commonReducer);

  const [project, setProject] = useState(false);

  const setCardValueByType = (type) => {
    return oriPagedata.length > 0
      ? oriPagedata.reduce(
          (acc, val) => acc + (val?.[type] == null ? 0 : val?.[type]),
          0
        ) > 0
        ? oriPagedata
            .reduce(
              (acc, val) => acc + (val?.[type] == null ? 0 : val?.[type]),
              0
            )
            .toFixed(2)
        : 0
      : 0;
  };
  const selectprojectclickhandler = () => {
    setProject(true);
  };

  return (
    <>
      <Box className={classes.paper}>
        <Grid container className={classes.container}>
          <Grid item xs="12">
            <EvoButton
              btnText="select Profile"
              //variant="contained"
              onClick={selectprojectclickhandler}
              // btnClass={{
              //   backgroundColor: "#124590",
              //   color: "#fff",
              //   fontSize: "12px",
              // }}
            />
            {Object.keys(commonReducer.selectedProjectObj).length > 0 && (
              <Typography className={classes.projectname}>
                {" "}
                {commonReducer.selectedProjectObj.projectName}{" "}
              </Typography>
            )}
          </Grid>
          {Object.keys(commonReducer.selectedProjectObj).length > 0 && (
            <>
              <Grid item xs="12" className={classes.startdate}>
                <DateWidget durationFilter={true} {...props} />
              </Grid>
              <Grid item xs="12" className={classes.Wrap}>
                <Box px={2} className={classes.totalpersonbox}>
                  <Typography className={classes.totalpersonboxtext1}>
                    {oriPagedata.length}
                  </Typography>
                  <Typography variant="h7">Total Person</Typography>
                </Box>
                <Box px={2} className={classes.totalpersonbox}>
                  <Typography className={classes.totalpersonboxtext2}>
                    {setCardValueByType("schHrs")}
                  </Typography>
                  <Typography variant="h7">Sch Hours</Typography>
                </Box>
                <Box px={2} className={classes.totalpersonbox}>
                  <Typography className={classes.totalpersonboxtext3}>
                    {setCardValueByType("wrkHrs")}
                  </Typography>
                  <Typography variant="h7">Working Hours</Typography>
                </Box>
                {setCardValueByType("regularHrs") === 0 ? (
                  ""
                ) : (
                  <Box px={2} className={classes.totalpersonbox}>
                    <Typography className={classes.totalpersonboxtext5}>
                      {setCardValueByType("regularHrs")}
                    </Typography>
                    <Typography variant="h7">Regular Hrs</Typography>
                  </Box>
                )}

                {setCardValueByType("lapsHours") === 0 ? (
                  ""
                ) : (
                  <Box px={2} className={classes.totalpersonbox}>
                    <Typography className={classes.totalpersonboxtext5}>
                      {setCardValueByType("lapsHours")}
                    </Typography>
                    <Typography variant="h7">Lapse Hours</Typography>
                  </Box>
                )}

                <Box px={2} className={classes.totalpersonbox}>
                  <Typography className={classes.totalpersonboxtext5}>
                    {setCardValueByType("paidLeaveHrs")}
                  </Typography>
                  <Typography variant="h7">Paid Leave Hrs</Typography>
                </Box>
                <Box px={2}>
                  <Typography className={classes.totalpersonboxtext6}>
                    {setCardValueByType("unpaidLeaveHrs")}
                  </Typography>
                  <Typography variant="h7">Unpaid Leave Hrs</Typography>
                </Box>
                <Box px={2}>
                  <Typography className={classes.totalpersonboxtext6}>
                    {setCardValueByType("holidayHours")}
                  </Typography>
                  <Typography variant="h7">Holiday Hrs</Typography>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Box>

      {project && <ProjectDetailModal togglerHandler={setProject} />}
    </>
  );
};

const useStyles = makeStyles(() => ({
  paper: {
    margin: "15px 0px 15px 0px",
    borderRadius: "0px !important",
    border: "1px solid rgb(233, 233, 233)",
    backgroundColor: "white !important",
  },
  container: {
    padding: "20px",
  },
  body_text: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  projectname: {
    color: "#6F6F6F !important",
    display: "inline-block !important",
    marginLeft: "20px !important",
    marginTop: "10px !important",
    textOverflow: "ellipsis !important",
    overflow: "hidden !important",
    width: "calc(100% - 190px)",
    whiteSpace: "nowrap !important",
    fontSize: "14px !important",
    verticalAlign: "sub !important",
  },
  startdate: {
    display: "flex",
    alignItems: "center !important",
    marginTop: "10px !important",
    fontSize: "14px !important",
    borderRadius: "0px !important",
  },
  totalpersonbox: {
    borderRight: "1px solid rgb(233, 233, 233)",
  },
  Wrap: {
    display: "flex",
    marginTop: "20px !important",
    "& p": {
      fontWeight: "bold",
      marginLeft: "10px",
      textAlign: "center",
      fontSize: "14px !important",
    },
  },
  totalpersonboxtext1: {
    color: "#3CAF85 !important",
  },
  totalpersonboxtext2: {
    color: "#47BDEF !important",
  },
  totalpersonboxtext3: {
    color: "#4a85c5 !important",
  },
  totalpersonboxtext4: {
    color: "#af3c66 !important",
  },
  totalpersonboxtext5: {
    color: "#ed6647 !important",
  },
  totalpersonboxtext6: {
    color: "#A0A0A0 !important",
  },
}));
