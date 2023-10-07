import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { EmployeeDetailModal } from "./EmployeeDetailModal";

import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../../redux/commonSlice";
import {
  dashboardList,
  getAllExpenditure,
  getAllTask,
} from "../../../services/api";
import { useGetAllProject } from "../../../services/timesheetSubmissionService";
import { dateConverter, sortPaycodes } from "../../../utils/commonService";
import { setCardValueByType } from "../../contants";
import { NoDataBox } from "../../../components/NoDataBox";

export const EmployeeTable = (props) => {
  const {
    setPagedata,
    pagedata,
    appStatus,
    setOriPagedata,
    handleLoading,
    headerArr,
    setHeaderArr,
  } = props;
  const classes = useStyles();

  const [project2, setProject2] = useState(false);
  const [snakeBarProps, setSnakeBarProps] = useState({});
  // const [getAllProjectDataArr, setGetAllProjectDataArr] = useState([]);
  const [getAllTaskDataArr, setGetAllTaskDataArr] = useState([]);
  const [getAllExpenditureDataArr, setGetAllExpenditureDataArr] = useState([]);
  const [projectEnableFlag, setProjectEnableFlag] = useState(true);
  const [taskEnableFlag, setTaskEnableFlag] = useState(true);
  const [expenditureEnableFlag, setExpenditureEnableFlag] = useState(true);
  const [hoveredItemId, setHoveredItemId] = useState();
  const [selectedItem, setItem] = useState();

  const commonReducer = useSelector((state) => state.commonReducer);
  const dispatch = new useDispatch();

  // const {
  //   data: getAllProjectData,
  //   error: getAllProjectError,
  //   isloading: getAllProjectIsloading,
  // } = useQuery(
  //   ["getAllProjectCall", pagedata?.countryID],
  //   () => getAllProject(),
  //   { enabled: projectEnableFlag, retry: false }
  // );

  // useEffect(() => {
  //   if (getAllProjectData) {
  //     setProjectEnableFlag(false);
  //     setGetAllProjectDataArr(getAllProjectData?.data?.data);
  //   }
  // }, [getAllProjectData]);

  const { data: getAllProjectDataArr } = useGetAllProject();
 // api constant not defined
  const {
    data: getAllTaskData,
    error: getAllTaskError,
    isloading: getAllTaskIsloading,
  } = useQuery(["getAllTaskCall", pagedata?.countryID], () => getAllTask(), {
    enabled: taskEnableFlag,
    retry: false,
  });

  useEffect(() => {
    if (getAllTaskData) {
      setTaskEnableFlag(false);
      setGetAllTaskDataArr(getAllTaskData?.data?.data);
    }
  }, [getAllTaskData]);

 //apiconstant not defined

  const {
    data: getAllExpenditureData,
    error: getAllExpenditureError,
    isloading: getAllExpenditureIsloading,
  } = useQuery(
    ["getAllExpenditureCall", pagedata?.countryID],
    () => getAllExpenditure(),
    { enabled: expenditureEnableFlag, retry: false }
  );

  useEffect(() => {
    if (getAllExpenditureData) {
      setExpenditureEnableFlag(false);
      setGetAllExpenditureDataArr(getAllExpenditureData?.data?.data);
    }
  }, [getAllExpenditureData]);

  const { mutate: dashboardListMutate } = useMutation(dashboardList, {
    onSuccess: (data, context, variables) =>
      onSuccessProjectList(data, context, variables),
    onError: (data, context, variables) =>
      onErrorProjectList(data, context, variables),
  });

  const onSuccessProjectList = (data) => {
    // console.log('first', data.data)
    // setPagedata(data.data.data);
    setOriPagedata(
      data.data.data.dashboardData.map((option) => ({
        ...option,
        checked: false,
      }))
    );
    setHeaderArr(data.data.data.timeSheetHeaders);
    handleLoading(false);
  };

  const onErrorProjectList = (data) => {
    handleLoading(false);
  };

  useEffect(() => {
    handleLoading(true);
    dashboardListMutate({
      userId: commonReducer.userId,
      startDate: dateConverter(commonReducer.startDate),
      endDate: dateConverter(commonReducer.endDate),
      profileId: commonReducer.selectedProjectObjTeam.profileId,
      viewedBy: "PM",
      appStatus: appStatus,
    });
  }, [
    commonReducer.startDate,
    commonReducer.endDate,
    appStatus,
    commonReducer.selectedProjectObjTeam.profileId,
  ]);

  const employeeiconclickhandler = (option) => {
    dispatch(updateState({ selectedEmployee: option }));
    setProject2(true);
  };

  const generateUniqueId = (index) => {
    return `paycodes-${index}`;
  };
  const getWidth = (id) => {
    const element = document.getElementById(generateUniqueId(id));
    if (element) {
      return element.getBoundingClientRect().width;
    } else {
      return "";
    }
  };
  const getNoOfDays = () => {
    return new Array(
      moment(dateConverter(commonReducer.endDate)).diff(
        moment(dateConverter(commonReducer.startDate)),
        "days"
      ) + 1
    ).fill({ status: null, value: 0 });
  };

  return (
    <>
      <Box py={2} style={{ backgroundColor: "#fff" }}>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={9} textAlign="right">
            <Box display="inline-block" mr={2}>
              <Box
                style={{
                  backgroundColor: "#FFCDD2",
                  width: "10px",
                  height: "10px",
                  display: "inline-block",
                  marginRight: 5,
                }}
              ></Box>
              <Typography variant="body">Not Submitted</Typography>
            </Box>
            <Box display="inline-block" mr={2}>
              <Box
                style={{
                  backgroundColor: "#FFE082",
                  width: "10px",
                  height: "10px",
                  display: "inline-block",
                  marginRight: 5,
                }}
              ></Box>
              <Typography variant="body">Pending Submitted</Typography>
            </Box>
            <Box display="inline-block" mr={2}>
              <Box
                style={{
                  backgroundColor: "#C8E6C9",
                  width: "10px",
                  height: "10px",
                  display: "inline-block",
                  marginRight: 5,
                }}
              ></Box>
              <Typography variant="body">Approved</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        className={classes.mainbox}
        style={{
          overflowX: pagedata.length === 0 ? "scroll" : "unset",
        }}
      >
        <Box
          className={classes.innermainbox}
          style={{ verticalAlign: pagedata.length > 0 ? "top" : "bottom" }}
        >
          <Box className={classes.innerboxemployee}>
            <Box className={classes.employeeboxparent}>
              <Typography className={classes.employeetext}>Employee</Typography>
            </Box>
            <Box className={classes.actionboxparent}>
              <Typography className={classes.actiontext}>Action</Typography>
            </Box>
            <Box className={classes.jobtitleboxparent}>
              <Typography className={classes.jobtitletext}>
                Job Title
              </Typography>
            </Box>
            <Box className={classes.shifttypeboxparent}>
              <Typography className={classes.header_text}>
                Shift Type
              </Typography>
            </Box>
            <Box className={classes.bandboxparent}>
              <Typography className={classes.header_text}>Band</Typography>
            </Box>
            {/* <Box className={classes.shifttypeboxparent}>
                        <Typography className={classes.header_text}></Typography>
                    </Box> */}
          </Box>
          {pagedata?.length > 0 &&
            pagedata?.map((item, parentIndex) => {
              return (
                <Box
                  className={classes.pagedatamainbox}
                  itemId={item?.employeeNumber}
                  selectedItemId={selectedItem?.employeeNumber}
                  hoveredItemId={hoveredItemId}
                  setHoveredItemId={setHoveredItemId}
                >
                  <>
                    <Box className={classes.employeeboxparent}>
                      <Typography className={classes.itemfullname}>
                        {item?.fullName} [{item?.employeeNumber}]
                      </Typography>
                    </Box>
                    <Box
                      className={classes.actionboxparent}
                      title="View Timesheet"
                    >
                      <MarkunreadMailboxIcon
                        className={classes.checkboxicon}
                        onClick={() => employeeiconclickhandler(item)}
                      />
                    </Box>
                    <Box className={classes.jobtitleboxparent}>
                      <Typography
                        title={item?.jobTitle}
                        className={classes.body_text}
                      >
                        {item?.jobTitle}
                      </Typography>
                    </Box>
                    <Box className={classes.shifttypeboxparent}>
                      <Typography className={classes.body_text}>
                        {item?.shiftType}
                      </Typography>
                    </Box>
                    <Box className={classes.bandboxparent}>
                      <Typography className={classes.body_text}>
                        {item?.band}
                      </Typography>
                    </Box>
                    {/* <Box className={classes.iconparent}>
                      <FileCopyIcon className={classes.FileCopyIcon} />
                      <DeleteIcon className={classes.deleteCopyIcon} />
                    </Box> */}
                  </>
                </Box>
              );
            })}
        </Box>

        <Box
          className={classes.dayArrmainbox}
          style={{
            overflowX: pagedata.length === 0 ? "unset" : "auto",
          }}
        >
          {/* <Box> */}
          {commonReducer?.dayArr?.length > 0 && (
            <Box
            // style={{
            //   minWidth:
            //     commonReducer?.dayArr?.length * 80 +
            //     (Object.keys(commonReducer.selectedProjectObjTeam)?.length >
            //       0 &&
            //     commonReducer.selectedProjectObjTeam.projectName != ""
            //       ? 660
            //       : 0),
            //   overflow: "auto",
            // }}
            >
              <Stack flexDirection={"row"}>
                <Stack
                  sx={{
                    backgroundColor: "#F1F1F1 !important",
                    borderTop: "1px solid silver",
                    borderBottom: "1px solid silver",
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "15px !important",
                      borderBottom: "1px solid silver",
                    }}
                  >
                    Status
                  </Typography>
                  <Box className={classes.dayarrboxparent}>
                    {
                      // Object.keys(commonReducer.selectedProjectObjTeam)?.length >
                      //   0 &&
                      commonReducer?.dayArr?.length > 0 &&
                        commonReducer?.dayArr?.map((option, index) => {
                          return (
                            <Box
                              className={classes.optionboxparent}
                              key={index}
                            >
                              <Typography className={classes.optiontext}>
                                {option}
                              </Typography>
                            </Box>
                          );
                        })
                    }
                  </Box>
                </Stack>
                <Stack
                  flexDirection="row"
                  sx={{
                    backgroundColor: "#F1F1F1 !important",
                    border: "1px solid silver",
                  }}
                >
                  {headerArr.length > 0 &&
                    sortPaycodes(
                      headerArr.filter((option) => {
                        return (
                          option.fixed ||
                          (!option.fixed &&
                            setCardValueByType(option.mappingKey, pagedata) > 0)
                        );
                      })
                    ).map((option, index) => {
                      return (
                        <Box
                          className={classes.wrkhrsbox}
                          key={index}
                          id={generateUniqueId(index)}
                        >
                          <Typography className={classes.floating_celltext}>
                            {option.label}
                          </Typography>
                        </Box>
                      );
                    })}
                </Stack>
              </Stack>
              {pagedata?.length > 0 &&
                pagedata?.map((item) => {
                  var localArr =
                    item?.days?.length === 0 ? getNoOfDays() : item?.days;

                  return (
                    <>
                      <Box
                        className={classes.pagedataarraymainbox}
                        itemId={item?.employeeNumber}
                        selectedItemId={selectedItem?.employeeNumber}
                        hoveredItemId={hoveredItemId}
                        setHoveredItemId={setHoveredItemId}
                      >
                        {localArr.map((option) => {
                          return (
                            <Box
                              className={[
                                classes.pagedataoptionmainbox,
                                classes[option.status],
                              ]}
                            >
                              <Typography className={classes.body_text}>
                                {option.value > 0 ? option.value : ""}
                              </Typography>
                            </Box>
                          );
                        })}
                        {headerArr.length > 0 &&
                          sortPaycodes(
                            headerArr.filter((option) => {
                              return (
                                option.fixed ||
                                (!option.fixed &&
                                  setCardValueByType(
                                    option.mappingKey,
                                    pagedata
                                  ) > 0)
                              );
                            })
                          ).map((option, index) => {
                            return (
                              <Box
                                className={classes.itemparent}
                                sx={{
                                  width: getWidth(index),
                                }}
                              >
                                <Typography className={classes.body_text}>
                                  {item[option.mappingKey]}
                                </Typography>
                              </Box>
                            );
                          })}
                      </Box>
                    </>
                  );
                })}
            </Box>
          )}
          {/* </Box> */}
        </Box>
        {pagedata?.length == 0 && (
          <NoDataBox />
        )}

        {project2 && (
          <EmployeeDetailModal
            togglerHandler={setProject2}
            setSnakeBarProps={setSnakeBarProps}
            getAllProjectDataArr={getAllProjectDataArr}
            getAllExpenditureDataArr={getAllExpenditureDataArr}
            getAllTaskDataArr={getAllTaskDataArr}
          />
        )}
      </Box>
    </>
  );
};

const useStyles = makeStyles(() => ({
  floating_cell: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  header_text: {
    fontSize: "14px !important",
    fontWeight: "bold !important",
  },
  body_text: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  mainbox: {
    backgroundColor: "white",
    borderLeft: "1px solid #E9E9E9 !important",
    borderRight: "1px solid #E9E9E9 !important",
    borderBottom: "1px solid #E9E9E9 !important",
  },
  innermainbox: {
    display: "inline-block",
    width: "552px",
    // verticalAlign: "bottom",
    border: "1px solid silver",
  },
  dynamicWidth: {
    borderRight: "2px solid aqua",
    "&:hover": {
      cursor: "col-resize",
    },
  },
  innerboxemployee: {
    display: "flex !important",
    // padding: "15px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    minHeight: 50, //73,
  },
  checkboxparent: {
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRight: "1px solid #D6DFE6",
  },
  employeeboxparent: {
    width: 250,
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    borderRight: "1px solid #D6DFE6",
    paddingLeft: "10px",
  },
  employeetext: {
    fontSize: "14px !important",
    fontWeight: "bold !important",
  },
  actionboxparent: {
    width: "90px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRight: "1px solid #D6DFE6",
    paddingLeft: "10px",
  },
  actiontext: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    fontSize: "14px !important",
    fontWeight: "bold !important",
  },
  jobtitleboxparent: {
    width: "110px",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    borderRight: "1px solid #D6DFE6",
    paddingLeft: "10px",
  },
  jobtitletext: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    fontSize: "14px !important",
    fontWeight: "bold !important",
  },
  shifttypeboxparent: {
    width: 105,
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #D6DFE6",
    paddingLeft: "10px",
  },
  bandboxparent: {
    width: 105,
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #D6DFE6",
    paddingLeft: "10px",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    minHeight: "45px",
  },
  itemfullname: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    // width: "calc(100% - 60px) !important",
    fontSize: "14px !important",
  },
  checkboxicon: {
    color: "#124590 !important",
    fontSize: "small !important",
    // marginLeft: "15px !important",
    cursor: "pointer !important",
    // marginRight: "10px !important"
  },

  iconparent: {
    width: 80,
    justifyContent: "lef !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  FileCopyIcon: {
    color: "#124590 !important",
    fontSize: "small !important",
    marginLeft: "15px !important",
  },
  deleteCopyIcon: {
    color: "#D90000 !important",
    fontSize: "small !important",
    marginLeft: "15px !important",
  },
  dayArrmainbox: {
    width: "calc(100% - 552px) !important",
    display: "inline-block !important",
    border: "1px solid #E9E9E9",
  },
  dayarrboxparent: {
    display: "inline-flex !important",
    padding: "1px 0 !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#F1F1F1 !important",
    minHeight: 26, //73,
    textAlign: "right",
  },
  optionboxparent: {
    width: 60,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    borderRight: "1px solid #D6DFE6",
  },
  optiontext: {
    color: "black !important",
    fontWeight: "bold !important",
    fontSize: "12px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  wrkhrsbox: {
    width: "max-content",
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    borderRight: "1px solid #D6DFE6",
  },
  floating_celltext: {
    color: "black !important",
    fontWeight: "bold !important",
    fontSize: "12px !important",
  },
  floating_cellbox: {
    width: 80,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  pagedataarraymainbox: {
    display: "inline-flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    minHeight: "45px",
  },
  pagedataoptionmainbox: {
    width: 60,
    justifyContent: "flex-end !important",
    borderLeft: "1px solid rgb(233, 233, 233) !important",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  itemparent: {
    width: 80,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },

  itemprojecthrsparent: {
    width: 78,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  commonitemparent: {
    width: 80,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  P: {
    backgroundColor: "#FFE082",
  },
  N: {
    backgroundColor: "#FFCDD2",
  },
  A: {
    backgroundColor: "#C8E6C9",
  },
}));
