import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { EmployeeDetailModal } from "./EmployeeDetailModal";

import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { makeStyles } from "@mui/styles";
import {
  dashboardList,
  getAllExpenditure,
  getAllProject,
  getAllTask,
} from "../../services/api";
import CustomCheckBox from "../../components/CustomCheckBox";
import { updateState } from "../../redux/commonSlice";
import { NoDataBox } from "../../components/NoDataBox";
import { useGet } from "../../services/service";
import { useGetAllExpenditure, useGetAllProject, useGetAllTask} from "../../services/rosterapi";

export const EmployeeTable = (props) => {
  const { setPagedata, pagedata, appStatus, setOriPagedata } = props;
  const classes = useStyles();

  const [project2, setProject2] = useState(false);
  const [getAllProjectDataArr, setGetAllProjectDataArr] = useState([]);
  const [getAllTaskDataArr, setGetAllTaskDataArr] = useState([]);
  const [getAllExpenditureDataArr, setGetAllExpenditureDataArr] = useState([]);
  const commonReducer = useSelector((state) => state.commonReducer);
  const dispatch = new useDispatch();

  

// apiconstant not defined  
  // const { data :getAllProjectData, } = useGetAllProject();


  const {
    data: getAllProjectData,
    error: getAllProjectError,
    isloading: getAllProjectIsloading,
  } = useQuery(
    ["getAllProjectCall", pagedata?.countryID],
    () => getAllProject(),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllProjectData) {
      setGetAllProjectDataArr(getAllProjectData?.data?.data);
    }
  }, [getAllProjectData]);



  const {
    data: getAllTaskData,
    error: getAllTaskError,
    isloading: getAllTaskIsloading,
  } = useQuery(["getAllTaskCall", pagedata?.countryID], () => getAllTask(), {
    enabled: true,
    retry: false,
  });

   //const { data : getAllTaskData } = useGetAllTask();   apiconstant not defined

  useEffect(() => {
    if (getAllTaskData) {
      setGetAllTaskDataArr(getAllTaskData?.data?.data);
    }
  }, [getAllTaskData]);

  // not defined

  const {
    data: getAllExpenditureData,
    error: getAllExpenditureError,
    isloading: getAllExpenditureIsloading,
  } = useQuery(
    ["getAllExpenditureCall", pagedata?.countryID],
    () => getAllExpenditure(),
    { enabled: true, retry: false }
  );
  
  //const { data : getAllExpenditureCall } = useGetAllExpenditure();
  useEffect(() => {
    if (getAllExpenditureData) {
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
    // setPagedata(data.data.data);
    setOriPagedata(data.data.data);
  };

  const onErrorProjectList = (data) => {};

  useEffect(() => {
    Object.keys(commonReducer.selectedProjectObj)?.length > 0 &&
      dashboardListMutate({
        userId: commonReducer.userId,
        startDate: commonReducer.startDate,
        endDate: commonReducer.endDate,
        profileId: commonReducer.selectedProjectObj.projectId,
        viewedBy: "PM",
        appStatus: appStatus,
      });
  }, [
    commonReducer.startDate,
    commonReducer.endDate,
    appStatus,
    commonReducer.selectedProjectObj.projectId,
  ]);

  const employeeiconclickhandler = (option) => {
    dispatch(updateState({ selectedEmployee: option }));
    setProject2(true);
  };

  const setCardValueByType = (type) => {
    return pagedata?.length > 0 &&
      pagedata.reduce(
        (acc, val) => acc + (val?.[type] == null ? 0 : val?.[type]),
        0
      ) > 0
      ? true
      : false;
  };

  return (
    <>
      <Box className={classes.mainbox}>
        {/* <Title/> */}
        <Box className={classes.innermainbox}>
          <Box className={classes.innerboxemployee}>
            <Box className={classes.employeeboxparent}>
              <Typography className={classes.employeetext}>Employee</Typography>
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
            pagedata?.map((item) => {
              return (
                <>
                  <Box className={classes.pagedatamainbox}>
                    <Box className={classes.checkboxparent}>
                      <CustomCheckBox />
                      <Typography
                        title={item?.fullName}
                        className={classes.itemfullname}
                      >
                        {item?.fullName}
                      </Typography>
                      <MarkunreadMailboxIcon
                        className={classes.checkboxicon}
                        onClick={() => employeeiconclickhandler(item)}
                      />
                    </Box>
                    <Box className={classes.itemjobtitleparent}>
                      <Typography
                        title={item?.jobTitle}
                        className={classes.body_text}
                      >
                        {item?.jobTitle}
                      </Typography>
                    </Box>
                    <Box className={classes.itemshifttypeparent}>
                      <Typography className={classes.body_text}>
                        {item?.shiftType}
                      </Typography>
                    </Box>
                    <Box className={classes.itembandparent}>
                      <Typography className={classes.body_text}>
                        {item?.band}
                      </Typography>
                    </Box>
                    <Box className={classes.iconparent}>
                      <FileCopyIcon className={classes.FileCopyIcon} />
                      <DeleteIcon className={classes.deleteCopyIcon} />
                    </Box>
                  </Box>
                </>
              );
            })}
        </Box>
        <Box className={classes.dayArrmainbox}>
          <Box>
            {commonReducer?.dayArr?.length > 0 && (
              <Box
                style={{
                  minWidth:
                    commonReducer?.dayArr?.length * 50 +
                    (Object.keys(commonReducer.selectedProjectObj)?.length >
                      0 && commonReducer.selectedProjectObj.projectName != ""
                      ? 530
                      : 0),
                  overflow: "auto",
                }}
              >
                <Box className={classes.dayarrboxparent}>
                  {Object.keys(commonReducer.selectedProjectObj)?.length > 0 &&
                    commonReducer?.dayArr?.length > 0 &&
                    commonReducer?.dayArr?.map((option) => {
                      return (
                        <Box className={classes.optionboxparent}>
                          <Typography className={classes.optiontext}>
                            {option}
                          </Typography>
                        </Box>
                      );
                    })}
                  {Object.keys(commonReducer.selectedProjectObj)?.length > 0 &&
                    commonReducer.selectedProjectObj.projectName != "" && (
                      <>
                        <Box className={classes.wrkhrsbox}>
                          <Typography className={classes.floating_celltext}>
                            Sch Hrs
                          </Typography>
                        </Box>
                        <Box className={classes.wrkhrsbox}>
                          <Typography className={classes.floating_celltext}>
                            Wrk Hrs
                          </Typography>
                        </Box>
                        {setCardValueByType("regularHrs") && (
                          <Box className={classes.floating_cellbox}>
                            <Typography className={classes.floating_celltext}>
                              Regular hrs
                            </Typography>
                          </Box>
                        )}
                        {setCardValueByType("lapsHours") && (
                          <Box className={classes.floating_cellbox}>
                            <Typography className={classes.floating_celltext}>
                              Lapse hrs
                            </Typography>
                          </Box>
                        )}
                        <Box className={classes.floating_cellbox}>
                          <Typography className={classes.floating_celltext}>
                            Paid Lve hrs
                          </Typography>
                        </Box>
                        <Box className={classes.floating_cellbox}>
                          <Typography className={classes.floating_celltext}>
                            Unpd Lve hrs
                          </Typography>
                        </Box>
                        <Box className={classes.floating_cellbox}>
                          <Typography className={classes.floating_celltext}>
                            Missing punch
                          </Typography>
                        </Box>
                        <Box className={classes.floating_cellbox}>
                          <Typography className={classes.floating_celltext}>
                            Depart Early
                          </Typography>
                        </Box>
                        <Box className={classes.floating_cellbox}>
                          <Typography className={classes.floating_celltext}>
                            Arrive late
                          </Typography>
                        </Box>
                        <Box className={classes.floating_cellbox}>
                          <Typography className={classes.floating_celltext}>
                            Total Voliation
                          </Typography>
                        </Box>
                      </>
                    )}
                </Box>
                {
                  pagedata?.length > 0 &&
                    pagedata?.map((item) => {
                      return (
                        <>
                          <Box className={classes.pagedataarraymainbox}>
                            {item?.days?.length > 0 &&
                              item?.days.map((option) => {
                                return (
                                  <Box
                                    className={classes.pagedataoptionmainbox}
                                  >
                                    <Typography className={classes.body_text}>
                                      {option > 0 ? option : ""}
                                    </Typography>
                                  </Box>
                                );
                              })}
                            {Object.keys(commonReducer.selectedProjectObj)
                              ?.length > 0 &&
                              commonReducer.selectedProjectObj.projectName !=
                                "" && (
                                <>
                                  <Box className={classes.itemparent}>
                                    <Typography className={classes.body_text}>
                                      {item?.schHrs == null
                                        ? " "
                                        : item?.schHrs}
                                    </Typography>
                                  </Box>
                                  <Box className={classes.itemparent}>
                                    <Typography className={classes.body_text}>
                                      {item?.wrkHrs == null
                                        ? " "
                                        : item?.wrkHrs}
                                    </Typography>
                                  </Box>
                                  {setCardValueByType("regularHrs") && (
                                    <Box className={classes.commonitemparent}>
                                      <Typography className={classes.body_text}>
                                        {item?.regularHrs == null
                                          ? " "
                                          : item?.regularHrs}
                                      </Typography>
                                    </Box>
                                  )}
                                  {setCardValueByType("lapsHours") && (
                                    <Box className={classes.commonitemparent}>
                                      <Typography className={classes.body_text}>
                                        {item?.lapsHours == null
                                          ? " "
                                          : item?.lapsHours}
                                      </Typography>
                                    </Box>
                                  )}
                                  <Box className={classes.commonitemparent}>
                                    <Typography className={classes.body_text}>
                                      {item?.projectHrs == null
                                        ? " "
                                        : item?.paidLeaveHrs}
                                    </Typography>
                                  </Box>
                                  <Box className={classes.commonitemparent}>
                                    <Typography className={classes.body_text}>
                                      {item?.unpaidLeaveHrs == null
                                        ? " "
                                        : item?.unpaidLeaveHrs}
                                    </Typography>
                                  </Box>
                                  <Box className={classes.commonitemparent}>
                                    <Typography className={classes.body_text}>
                                      {item?.missingHrs == null
                                        ? " "
                                        : item?.missingHrs}
                                    </Typography>
                                  </Box>
                                  <Box className={classes.commonitemparent}>
                                    <Typography className={classes.body_text}>
                                      {item?.departEarlyHrs == null
                                        ? " "
                                        : item?.departEarlyHrs}
                                    </Typography>
                                  </Box>
                                  <Box className={classes.commonitemparent}>
                                    <Typography className={classes.body_text}>
                                      {item?.arriveLateHrs == null
                                        ? " "
                                        : item?.arriveLateHrs}
                                    </Typography>
                                  </Box>
                                  <Box className={classes.commonitemparent}>
                                    <Typography className={classes.body_text}>
                                      {item?.totalViolations == null
                                        ? " "
                                        : item?.totalViolations}
                                    </Typography>
                                  </Box>
                                </>
                              )}
                          </Box>
                        </>
                      );
                    })                  
                }
              </Box>
            )}
          </Box>
        </Box>
        {pagedata?.length == 0 && (
          <NoDataBox />
        )}

        {project2 && (
          <EmployeeDetailModal
            togglerHandler={setProject2}
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
  },
  body_text: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
  },
  innermainbox: {
    display: "inline-block",
    width: "552px",
    verticalAlign: "top",
  },
  innerboxemployee: {
    display: "flex !important",
    padding: "15px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
  },
  employeeboxparent: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    width: 200,
  },
  employeetext: {
    fontSize: "14px !important",
  },
  jobtitleboxparent: {
    width: 150,
    justifyContent: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  jobtitletext: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    fontSize: "14px !important",
  },
  shifttypeboxparent: {
    width: 80,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  bandboxparent: {
    width: 50,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff !important",
  },
  checkboxparent: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    width: 200,
    display: "flex !important",
    alignItems: "center !important",
    padding: "0 0 0 15px !important",
  },
  itemfullname: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "calc(100% - 60px) !important",
    fontSize: "14px !important",
  },
  checkboxicon: {
    color: "#124590 !important",
    fontSize: "small !important",
    marginLeft: "15px !important",
    cursor: "pointer !important",
    // marginRight: "10px !important"
  },
  itemjobtitleparent: {
    width: 150,
    justifyContent: "flex-start !important",
    textAlign: "left !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  itemshifttypeparent: {
    width: 80,
    justifyContent: "left !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  itembandparent: {
    width: 50,
    justifyContent: "left !important",
    alignItems: "center !important",
    paddingLeft: 10,
    display: "flex !important",
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
    overflow: "auto !important",
    display: "inline-block !important",
  },
  dayarrboxparent: {
    display: "inline-flex !important",
    padding: "1px 0 !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#F1F1F1 !important",
    minHeight: 73,
    textAlign: "right",
  },
  optionboxparent: {
    width: 60,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
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
    width: 65,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  floating_celltext: {
    color: "black !important",
    fontWeight: "bold !important",
    fontSize: "14px !important",
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
    backgroundColor: "#fff !important",
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
    width: 65,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  itemparent: {
    width: 65,
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
}));
