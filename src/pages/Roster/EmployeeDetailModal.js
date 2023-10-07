import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Grid, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomDialog } from "../../components/CustomDialog";
import { DataTable } from "../../components/DataTable";
import { useDetailById } from "../../services/api.hooks";
import { dateConverter } from "../../utils/commonService";
import { NoDataBox } from "../../components/NoDataBox";

const array = [
  {
    TimeHours: "Time (Hours)",
    Department: "Project Name",
    Job: "Task",
    PayCode: "PayCode",
    Comments: "Comments",
    Hours: "Hours",
  },
];

const useStyles = makeStyles(() => ({
  maincontainer: {
    backgroundColor: "#EEEEEE !important",
    marginBottom: "10px !important",
  },
  innercontainer: {
    display: "flex !important",
    justifyContent: "space-between !important",
    padding: "10px !important",
  },
  totalhourstext: {
    fontSize: "14px !important",
  },
  gettotalhourstext: {
    fontWeight: "bold !important",
    fontSize: "16px !important",
  },
  text: {
    fontSize: "14px !important",
    textAlign: "center !important",
  },
  gettext: {
    fontWeight: "bold !important",
    textAlign: "center !important",
    fontSize: "16px !important",
  },
  innerContainer2: {
    justifyContent: "flex-end !important",
  },
  wrapdata: {
    backgroundColor: "#EBF3FF !important",
    padding: "12px 10px !important",
    margin: "10px 0px 0 !important",
  },
  wrapdatainner: {
    justifyContent: "space-between !important",
    alignItems: "center !important",
  },
  wrappadding: {
    padding: "0px 0px 0px 12px  !important",
  },
  commonpadding: {
    padding: "1px !important",
  },
  arraycontainer: {
    justifyContent: "center !important",
  },
  arraycontainerdata: {
    textAlign: "left !important",
    fontSize: "14px !important",
    color: "#000000 !important",
    fontWeight: "bold !important",
  },
  currentdatacontainer: {
    backgroundColor: "#EBF3FF !important",
    padding: "0px !important",
    margin: "0!important",
  },
  innercurrentdatacontainer: {
    justifyContent: "space-between !important",
    alignItems: "center !important",
  },
  innercurrentdatabackground: {
    justifyContent: "space-between !important",
    alignItems: "center !important",
    backgroundColor: "white !important",
    paddingLeft: "10px !important",
  },
  shiftTimingactual: {
    color: "#107C41 !important",
    fontSize: "14px !important",
  },
  shiftTimingschedule: {
    color: "#D90000 !important",
    fontSize: "14px !important",
  },
  eventdatepadding: {
    padding: "px 0px 6px 0px !important",
  },
  eventdatebox: {
    // backgroundColor: "#fff !important",
    // borderColor: "#124590 !important",
    // borderWidth: 1,
    // borderStyle: "solid !important"
  },
  eventdate: {
    color: "#124590 !important",
    paddingLeft: "10px !important",
  },
  eventhoursbox: {
    //   backgroundColor: "#fff !important",
    // padding: "2px 15px !important",
    minHeight: 34,
    // borderColor: "#E3E3E3 !important",
    // borderWidth: 1,
    // borderStyle: "solid !important"
  },
  eventhours: {
    color: "#000 !important",
    fontSize: 14,
    lineHeight: "28px !important",
  },
  getAllProjectDataArrparent: {
    // backgroundColor: "#fff !important",
    // padding: "2px 15px !important",
    minHeight: 34,

    // borderColor: "#E3E3E3 !important",
    // borderWidth: 1,
    // borderStyle: "solid !important"
  },
  getAllProjectDataEllipses: {
    textOverflow: "ellipsis !important",
    whiteSpace: "nowrap !important",
    overflow: "hidden !important",
  },
  getAllProjectDataArrchild: {
    color: "#000 !important",
    fontSize: 14,
    lineHeight: "28px !important",
  },

  getAllTaskDataArrparent: {
    // backgroundColor: "#fff !important",
    // padding: "2px 15px !important",
    minHeight: 34,
    // borderColor: "#E3E3E3 !important",
    // borderWidth: 1,
    // borderStyle: "solid !important"
  },
  getAllTaskDataArrchild: {
    color: "#000 !important",
    fontSize: 14,
    lineHeight: "28px !important",
    textOverflow: "ellipsis !important",
    overflow: "hidden !important",
    whiteSpace: "nowrap !important",
  },
  payCodebox: {
    // backgroundColor: "#fff !important",
    // padding: "2px 5px !important",
    minHeight: 34,
    // borderColor: "#E3E3E3 !important",
    // borderWidth: 1,
    // borderStyle: "solid !important"
  },
  payCode: {
    textOverflow: "ellipsis !important",
    whiteSpace: "nowrap !important",
    overflow: "hidden !important",
    color: "#000 !important",
    fontSize: "14px !important",
    lineHeight: "28px !important",
    marginRight: "10px !important",
    "& p": {
      fontSize: "14px !important",
    },
  },
  commentbox: {
    // backgroundColor: "#fff !important",
    // padding: "2px 15px !important",
    minHeight: 34,
    // borderColor: "#E3E3E3 !important",
    // borderWidth: 1,
    // borderStyle: "solid !important"
  },
  comment: {
    color: "#000 !important",
    fontSize: 14,
    lineHeight: "28px !important",
    textOverflow: "ellipsis !important",
    overflow: "hidden !important",
    whiteSpace: "nowrap !important",
  },
  eventshiftDetailsbox: {
    // padding: "2px 0px !important",
    minHeight: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  eventshiftdetailText: {
    color: "#124590 !important",
    fontSize: "14px !important",
    fontWeight: 600,
    textAlign: "right !important",
    marginRight: "10px !important",
  },
  cursor_manage: {
    cursor: "pointer",
    fontSize: "14px !important",
  },
  header_manage: {
    marginRight: "30px",
  },
}));

export const EmployeeDetailModal = (props) => {
  const classes = useStyles();
  const {
    togglerHandler,
    personData,
    firstDate,
    lastDate,
    getAllProjectDataArr,
    getAllExpenditureDataArr,
    getAllTaskDataArr,
  } = props;

  const commonReducer = useSelector((state) => state.commonReducer);
  const dispatch = new useDispatch();

  const [manageicon, setManageicon] = useState(true);
  const [expandFlag, setExpandFlag] = useState(false);
  const [expandPanel, setExpandPanel] = useState(null);

  console.log("props", props);
  const [pagedata, setpagedata] = useState({
    username: "",
    date: "",
    departmentObject: {},
    jobObject: {},
    paycodeObject: {},
  });

  // const [currentdata, setcurrentdata] = useState(dummyData);
  const handleClose = () => {
    togglerHandler(false);
  };
  // const {
  //   data: stateData,
  //   error: stateError,
  //   isloading: stateIsloading,
  // } = useQuery(
  //   ["EmployeeDetailModal", pagedata?.countryID],
  //   () =>
  //     getDetailById({
  //       personId: commonReducer.selectedEmployee.personId,
  //       startDate: commonReducer.startDate,
  //       endDate: commonReducer.endDate,
  //     }),
  //   { enabled: true, retry: false }
  // );

  // useEffect(() => {
  //   if (stateData) {
  //     console.log(stateData?.data?.data);
  //     // setcurrentdata(dummyData.data)
  //     setcurrentdata(stateData?.data?.data);
  //   }
  // }, [stateData]);
  const { data: currentdata } = useDetailById({
    personId: commonReducer.selectedEmployee.personId,
    startDate: commonReducer.startDate,
    endDate: commonReducer.endDate,
  });
  const getTotalHour = () => {
    var count = 0;
    currentdata.length > 0 &&
      currentdata.map((option) => {
        option.shiftDetails.map((item) => {
          count += parseFloat(item.hours);
        });
      });
    return count;
  };
  const getLapsedHours = () => {
    var count = 0;
    currentdata.length > 0 &&
      currentdata.map((option) => {
        option.shiftDetails.map((item) => {
          count += item.payCode == "Lapse Hours" ? parseFloat(item.hours) : 0;
        });
      });
    return count;
  };
  const getRegularHours = () => {
    var count = 0;
    currentdata.length > 0 &&
      currentdata.map((option) => {
        option.shiftDetails.map((item) => {
          count += item.payCode == "Regular Hours" ? parseFloat(item.hours) : 0;
        });
      });
    return count;
  };
  const getProjectHours = () => {
    var count = 0;
    currentdata.length > 0 &&
      currentdata.map((option) => {
        option.shiftDetails.map((item) => {
          count += item.payCode == "Project Hours" ? parseFloat(item.hours) : 0;
        });
      });
    return count;
  };

  return (
    <CustomDialog
      maxWidth="lg"
      title={`Timesheet of ${
        commonReducer.selectedEmployee.fullName
      } from ${dateConverter(commonReducer.startDate)} To ${dateConverter(
        commonReducer.endDate
      )}`}
      open="true"
      handleClose={handleClose}
    >
      <Box>
        <Grid container className={classes.maincontainer}>
          <Grid container item xs="8" className={classes.innercontainer}>
            <Box className={classes.cursor_manage}>
              <Typography className={classes.totalhourstext}>
                Total Hours&nbsp;&nbsp;
                <Typography
                  component="span"
                  className={classes.gettotalhourstext}
                >
                  {getTotalHour()}
                </Typography>
              </Typography>
            </Box>
            <Box className={classes.cursor_manage}>
              <Typography className={classes.text}>
                Lapsed Hours&nbsp;&nbsp;
                <Typography component="span" className={classes.gettext}>
                  {getLapsedHours()}
                </Typography>
              </Typography>
            </Box>
            <Box className={classes.cursor_manage}>
              <Typography className={classes.text}>
                Regular Hours&nbsp;&nbsp;
                <Typography component="span" className={classes.gettext}>
                  {getRegularHours()}
                </Typography>
              </Typography>
            </Box>
            <Box className={classes.cursor_manage}>
              <Typography className={classes.text}>
                Project Hours&nbsp;&nbsp;
                <Typography component="span" className={classes.gettext}>
                  {getProjectHours()}
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs="4"
            textAlign="right"
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {!expandFlag ? (
              <Typography
                onClick={() => {
                  setExpandFlag(!expandFlag);
                  setExpandPanel(null);
                }}
                className={classes.cursor_manage}
              >
                Expand All
              </Typography>
            ) : (
              <Typography
                onClick={() => {
                  setExpandFlag(!expandFlag);
                  setExpandPanel(null);
                }}
                className={classes.cursor_manage}
              >
                Collapse All
              </Typography>
            )}
          </Grid>
        </Grid>

        <Grid container item className={classes.currentdatacontainer} py={1}>
          <Grid
            item
            container
            xs="3"
            md={2}
            className={classes.innercurrentdatacontainer}
          ></Grid>
          <Grid item xs="9" md={10} py={1}>
            <Grid container item xs="12">
              {array.length > 0 &&
                array.map((item, index) => {
                  return (
                    <Grid container>
                      <Grid item container xs="1.7">
                        <Grid item xs="11">
                          <Box textAlign="right">
                            <Typography className={classes.arraycontainerdata}>
                              {item.TimeHours}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item xs="3.5">
                        <Grid item xs="11">
                          <Box textAlign="left">
                            <Typography className={classes.arraycontainerdata}>
                              {item.Department}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item xs="2">
                        <Grid item xs="11">
                          <Box textAlign="left">
                            <Typography className={classes.arraycontainerdata}>
                              {item.Job}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item xs="2">
                        <Grid item xs="11">
                          <Box textAlign="left">
                            <Typography className={classes.arraycontainerdata}>
                              {item.PayCode}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item xs="2">
                        <Grid item xs="11">
                          <Box textAlign="left">
                            <Typography className={classes.arraycontainerdata}>
                              {item.Comments}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
        <Box className="timesheet-table">
          <DataTable
            data={currentdata}
            DataItemComponent={(event, index) => {
              return (
                <Accordion
                  expanded={
                    expandFlag
                      ? true
                      : expandPanel == null
                      ? false
                      : expandPanel == `Panel${index}`
                  }
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        onClick={() => {
                          setExpandFlag(false);
                          setExpandPanel(`Panel${index}`);
                        }}
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ marginTop: "4px" }}
                  >
                    <Grid
                      container
                      className={classes.currentdatacontainer}
                      style={{ margin: "10px 0px" }}
                    >
                      <Grid
                        item
                        xs="10"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Box className={classes.eventdatebox}>
                          <Typography className={classes.eventdate}>
                            {event.date}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs="2">
                        {event.shiftDetails.length > 0 &&
                          event.shiftDetails.map((item, index) => {
                            return (
                              index == 0 && (
                                <Box
                                  textAlign="right"
                                  className={classes.eventshiftDetailsbox}
                                >
                                  {event.shiftDetails.reduce(
                                    (acc, val) =>
                                      acc +
                                      (val?.hours == null
                                        ? 0
                                        : parseFloat(val?.hours)),
                                    0
                                  ) > 0 && (
                                    <Typography
                                      className={classes.eventshiftdetailText}
                                    >
                                      {event.shiftDetails.reduce(
                                        (acc, val) =>
                                          acc +
                                          (val?.hours == null
                                            ? 0
                                            : parseFloat(val?.hours)),
                                        0
                                      )}{" "}
                                      Hours
                                    </Typography>
                                  )}
                                </Box>
                              )
                            );
                          })}
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      item
                      className={classes.currentdatacontainer}
                    >
                      {event.shiftDetails.length == 0 ? (
                        <Grid item xs="12" style={{ backgroundColor: "white" }}>
                          <Grid item xs="12" className={classes.commonpadding}>
                           <NoDataBox />
                          </Grid>
                        </Grid>
                      ) : (
                        <>
                          <Grid
                            item
                            container
                            xs="3"
                            md={2}
                            style={{ backgroundColor: "white" }}
                            className={classes.innercurrentdatabackground}
                          >
                            <Grid item xs="10">
                              <Grid
                                item
                                xs="12"
                                className={classes.eventdatepadding}
                              ></Grid>
                              <Typography className={classes.shiftTimingactual}>
                                {event.shiftTiming.actual}
                              </Typography>
                              <Typography
                                className={classes.shiftTimingschedule}
                              >
                                {event.shiftTiming.schedule}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs="9"
                            md={10}
                            style={{
                              backgroundColor: "white",
                              padding: "10px 0px 10px 0px",
                            }}
                          >
                            <Grid container item xs="12">
                              {event.shiftDetails.length > 0 &&
                                event.shiftDetails.map((item, index) => {
                                  return (
                                    <Grid container>
                                      <Grid item container xs="1.7">
                                        <Grid item xs="9">
                                          <Box
                                            textAlign="right"
                                            className={classes.eventhoursbox}
                                          >
                                            <Typography
                                              className={classes.payCode}
                                            >
                                              {item.hours}
                                            </Typography>
                                          </Box>
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        item
                                        xs="3.5"
                                        className={classes.commonpadding}
                                      >
                                        <Grid item xs="11">
                                          <Box
                                            textAlign="left"
                                            className={
                                              classes.getAllProjectDataArrparent
                                            }
                                          >
                                            <Typography
                                              title={
                                                getAllProjectDataArr.length > 0
                                                  ? getAllProjectDataArr.filter(
                                                      (option) =>
                                                        option.projectId ==
                                                        item?.projectId
                                                    ).length > 0
                                                    ? getAllProjectDataArr.filter(
                                                        (option) =>
                                                          option.projectId ==
                                                          item?.projectId
                                                      )[0].projectName
                                                    : ""
                                                  : ""
                                              }
                                              className={classes.payCode}
                                            >
                                              {getAllProjectDataArr.length > 0
                                                ? getAllProjectDataArr.filter(
                                                    (option) =>
                                                      option.projectId ==
                                                      item?.projectId
                                                  ).length > 0
                                                  ? getAllProjectDataArr.filter(
                                                      (option) =>
                                                        option.projectId ==
                                                        item?.projectId
                                                    )[0].projectName
                                                  : ""
                                                : ""}
                                            </Typography>
                                          </Box>
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        item
                                        xs="2"
                                        className={classes.commonpadding}
                                      >
                                        <Grid item xs="11">
                                          <Box
                                            textAlign="left"
                                            className={
                                              classes.getAllTaskDataArrparent
                                            }
                                          >
                                            <Typography
                                              title={
                                                getAllTaskDataArr.length > 0
                                                  ? getAllTaskDataArr.filter(
                                                      (option) =>
                                                        option.taskId ==
                                                        item?.taskId
                                                    ).length > 0
                                                    ? getAllTaskDataArr.filter(
                                                        (option) =>
                                                          option.taskId ==
                                                          item?.taskId
                                                      )[0].task
                                                    : " "
                                                  : " "
                                              }
                                              className={classes.payCode}
                                            >
                                              {getAllTaskDataArr.length > 0
                                                ? getAllTaskDataArr.filter(
                                                    (option) =>
                                                      option.taskId ==
                                                      item?.taskId
                                                  ).length > 0
                                                  ? getAllTaskDataArr.filter(
                                                      (option) =>
                                                        option.taskId ==
                                                        item?.taskId
                                                    )[0].task
                                                  : " "
                                                : " "}
                                            </Typography>
                                          </Box>
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        item
                                        xs="2"
                                        className={classes.commonpadding}
                                      >
                                        <Grid item xs="11">
                                          <Box
                                            textAlign="left"
                                            className={classes.payCodebox}
                                          >
                                            <Typography
                                              className={classes.payCode}
                                            >
                                              {item.payCode}
                                            </Typography>
                                          </Box>
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        item
                                        xs="2"
                                        className={classes.commonpadding}
                                      >
                                        <Grid item xs="11">
                                          <Box
                                            textAlign="left"
                                            className={classes.commentbox}
                                          >
                                            <Typography
                                              title={item.comment}
                                              className={classes.comment}
                                            >
                                              {item.comment}
                                            </Typography>
                                          </Box>
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        item
                                        xs="1.5"
                                        className={classes.commonpadding}
                                      ></Grid>
                                    </Grid>
                                  );
                                })}
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              );
            }}
          />
        </Box>
      </Box>
    </CustomDialog>
  );
};
