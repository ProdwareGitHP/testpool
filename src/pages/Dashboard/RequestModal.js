import { Box, Grid, Input, Typography } from "@mui/material";
import EvoTimePicker from "../../components/EvoDateTime/time";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import EvoDatePicker from "../../components/EvoDateTime/date";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import CustomCheckBox from "../../components/CustomCheckBox";
import { CustomDialog } from "../../components/CustomDialog";
import { EvoButton } from "../../components/EvoButton";
import Dropdown from "../../components/EvoDropDown";
import EvoDayPicker from "../../components/EvoDateTime/day";

import {
  createRequestData,
  getDestinationRoster,
  getRequestTypeList,
  getResionList,
  getSourceRoaster,
} from "../../services/api";
import { dateConverter } from "../../utils/commonService";
import { useGet } from "../../services/service";
import {
  useGetResionList,
  useGetSourceRoaster,
  useGetDestinationRoster,
} from "../../services/dashboard";

export const RequestCreateModal = (props) => {
  const {
    togglerhandler,
    refetchFunction,
    setSnakeBarProps,
    dataArr,
    oriPagedata,
    item,
  } = props;
  console.log(item);
  // window.alert(dateEffectiveshift);
  // console.log(dateEffectiveshift, "data");
  const classes = useStyles();
  const commonReducer = useSelector((state) => state.commonReducer);
  const [isLoadingBut, setIsLoadingBut] = useState(false);
  const [check, setCheck] = useState(false);
  const [removeData, setRemoveData] = useState([]);
  const [dropdown, setDropdown] = useState({
    reasonArray: [],
    reasonObj: {},
    Startvalue: null,
    reasonID: "",
  });
  const [sourceRosterData, setSourceRosterData] = useState({
    rosterArray: [],
    rosterObj: {},
    personRosterId: "",
  });
  console.log(sourceRosterData);
  const [destinationRosterData, setDestinationRosterData] = useState({
    destinationArray: [],
    destinationObj: {},
    destinationRoster: "",
  });

  const [pagedata, setPagedata] = useState({
    requestArray: [],
    requestObj: {},
    requestId: "",
  });
  console.log(pagedata.requestId);
  const [startDate, setStartDate] = useState(
    item?.effective
      ? new Date(moment(item?.effectiveDate).format("DD-MMM-YYYY"))
      : new Date()
  );
  const [endDate, setEndDate] = useState(
    item?.effective
      ? new Date(moment(item?.effectiveDate).format("DD-MMM-YYYY"))
      : new Date()
  );
  const [effectiveDate, seteffectiveDate] = useState(
    item?.effective
      ? new Date(moment(item?.effectiveDate).format("DD-MMM-YYYY"))
      : new Date()
  );

  const inputRef = useRef(null);
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState("");
  // const [effectiveDate, seteffectiveDate] = useState(new Date());

  const [commentValue, setCommentValue] = useState("");
  const [onBlurFlag, setOnBlurFlag] = useState(false);
  const [CheckDays, setCheckDays] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });

  const [startTime, setStartTime] = useState(
    item?.schTimeStart ? moment(item?.schTimeStart).format("hh:mm A") : ""
  );
  const [endTime, setEndTime] = useState(
    item?.schTimeEnd ? moment(item?.schTimeEnd).format("hh:mm A") : ""
  );
  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");

  const [startNewTime, setNewStartTime] = useState("");
  const [endNewTime, setNewEndTime] = useState("");

  useEffect(() => {
    requestTypeMutate({ personId: commonReducer.personId });
    // requestReasonMutate({ requestMasterId: pagedata?.requestId });
  }, []);

  const { mutate: requestTypeMutate } = useMutation(getRequestTypeList, {
    onSuccess: (data, context, variables) =>
      onSuccessProjectList(data, context, variables),
    onError: (data, context, variables) =>
      onErrorProjectList(data, context, variables),
  });

  const onSuccessProjectList = (data) => {
    if (data) {
      setPagedata({
        ...pagedata,
        requestArray: data?.data?.data,
        requestObj: data?.data?.data[1],
        requestId: data?.data?.data[1]?.requestMasterId,
      });
    }
  };
  const onErrorProjectList = () => {};

  const requestMasterId = pagedata.requestId;
  const { data: getReason } = useGetResionList({ requestMasterId });
  // const { data: getReason } = useQuery(
  //   ["Reason", requestMasterId],
  //   () =>
  //     getResionList({
  //       requestMasterId,
  //     }),
  //   { enabled: true, retry: false }
  // );
  useEffect(() => {
    if (getReason) {
      setDropdown({ ...dropdown, reasonArray: getReason?.data?.data });
    }
  }, [getReason]);

  const handleClose = () => {
    togglerhandler(false);
  };

  const { mutate: CreateRequestMutate } = useMutation(createRequestData, {
    onSuccess: (data, context, variables) =>
      onSuccessCreateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorCreateRequest(data, context, variables),
  });

  const onSuccessCreateRequest = (data) => {
    setIsLoadingBut(false);
    if (data) {
      setSnakeBarProps({
        msz: "Request created successfully",
        type: "success",
      });
      togglerhandler(false);
      refetchFunction();
    }
  };

  const onErrorCreateRequest = (error, data) => {
    setIsLoadingBut(false);
    if (error) {
      setSnakeBarProps({
        msz: "Unable to create request!",
        details: [error.response?.data?.status?.description],
        type: "error",
      });
      // togglerhandler(false);
    }
  };

  const sourceRosterDate = dateConverter(
    effectiveDate
      ? moment(effectiveDate).format("DD-MM-YYYY")
      : moment().format("DD-MM-YYYY")
  );
  // const { data: sourceRoster } = useQuery(
  //   ["sourceRoster", sourceRosterDate],
  //   () =>
  //     getSourceRoaster({
  //       personId: commonReducer?.personId,
  //       effectiveDate: sourceRosterDate,
  //     }),
  //   { enabled: true, retry: false }
  // );
  const { data: sourceRoster } = useGetSourceRoaster({
    personId: commonReducer?.personId,
    effectiveDate: sourceRosterDate,
  });

  useEffect(() => {
    if (sourceRoster) {
      setSourceRosterData({
        ...sourceRosterData,
        rosterArray: sourceRoster?.data?.data,
        rosterObj: {},
      });
    }
  }, [sourceRoster]);
  console.log(sourceRosterData, "sourceRosterDate");
  console.log(sourceRosterData, "sourceRosterData");
  const destinationRosterId = sourceRosterData?.personRosterId;
  // const { data: destinationRoster } = useQuery(
  //   ["destinationRoster", destinationRosterId],
  //   () =>
  //     getDestinationRoster({
  //       personRosterId: destinationRosterId,
  //       personId: commonReducer?.personId,
  //     }),
  //   { enabled: true, retry: false }
  // );
  const { dara: destinationRoster } = useGetDestinationRoster({
    personRosterId: destinationRosterId,
    personId: commonReducer?.personId,
  });
  // useEffect(() => {
  //   if (destinationRoster) {
  //     setDestinationRosterData({
  //       ...destinationRosterData,
  //       destinationArray: destinationRoster?.data?.data,
  //       destinationObj: {},
  //     });
  //   }
  // }, [destinationRoster]);
  console.log(destinationRoster, "destinationRoster");
  const onChangeCheck = () => {
    setCheck(!check);
  };

  const removeClickHandler = (index) => {
    var localArray = removeData?.filter(
      (option, deleteIndex) => index != deleteIndex
    );
    setRemoveData(localArray);
  };

  const cancelclickhandler = () => {
    togglerhandler(false);
  };

  const submitclickhandler = () => {
    //refetchFunction();
    var pData = {
      timeHour: "T",
      personId: commonReducer?.personId,
      createdBy: commonReducer?.personId,
      // createdOn: dateConverter(moment(new Date()).format('DD-MM-YYYY')),
      lastUpdatedBy: commonReducer?.userId,
      // lastUpdateDate: dateConverter(moment(new Date()).format('DD-MM-YYYY')),
      status: "SUBMIT",
      dmlMode: "INS",
    };

    if (pagedata?.requestObj?.requestName == "Change Day Off") {
      if (effectiveDate <= new Date() || effectiveDate == new Date()) {
        setSnakeBarProps({
          msz: "Past dated Change Day Off not allowed.",

          type: "error",
        });
        return;
      }
      if (startTime == "" && endTime == "") {
        setSnakeBarProps({
          msz: "Time start and Time end are required!",
          type: "error",
        });
        return;
      }
      if (startTime == "") {
        setSnakeBarProps({
          msz: "Time start  are required!",
          type: "error",
        });
        return;
      }
      if (endTime == "") {
        setSnakeBarProps({
          msz: "End time are required!",
          type: "error",
        });
        return;
      }
      pData = {
        ...pData,
        requestMasterId: pagedata?.requestId,

        effectiveDate: dateConverter(
          moment(effectiveDate).format("DD-MM-YYYY")
        ),
        timeStart: startTime,
        timeEnd: endTime,
      };
    }

    if (pagedata?.requestObj?.requestName == "Official Permission") {
      if (endDate == "") {
        setSnakeBarProps({
          msz: "End date are required!",
          type: "error",
        });
        return;
      }
      if (endDate < startDate) {
        setSnakeBarProps({
          msz: "End date cannot be smaller than start date!",
          type: "error",
        });
        return;
      }
      if (startTime == "" && endTime == "") {
        setSnakeBarProps({
          msz: ": Time start and Time end are required!",
          type: "error",
        });
        return;
      }
      if (startTime == "") {
        setSnakeBarProps({
          msz: "Time start  are required!",
          type: "error",
        });
        return;
      }
      if (endTime == "") {
        setSnakeBarProps({
          msz: "End time are required!",
          type: "error",
        });
        return;
      }
      pData = {
        ...pData,
        requestMasterId: pagedata?.requestId,

        dateStart: dateConverter(moment(startDate).format("DD-MM-YYYY")),
        dateEnd: dateConverter(moment(endDate).format("DD-MM-YYYY")),
        timeStart: startTime,
        timeEnd: endTime,
        comments: commentValue,
        requestReasonId: dropdown.reasonID,
        specificDays: check ? "S" : "A",
        mon: CheckDays.mon ? "Y" : "N",
        tue: CheckDays.tue ? "Y" : "N",
        wed: CheckDays.wed ? "Y" : "N",
        thu: CheckDays.thu ? "Y" : "N",
        fri: CheckDays.fri ? "Y" : "N",
        sat: CheckDays.sat ? "Y" : "N",
        sun: CheckDays.sun ? "Y" : "N",
      };
    }

    if (pagedata?.requestObj?.requestName == "Personal Permission") {
      if (endDate == "") {
        setSnakeBarProps({
          msz: "End date are required!",
          type: "error",
        });
        return;
      }
      if (endDate <= startDate) {
        setSnakeBarProps({
          msz: "End date cannot be smaller than start date!",
          type: "error",
        });
        return;
      }
      if (startTime == "" && endTime == "") {
        setSnakeBarProps({
          msz: "Time start and Time end are required!",
          type: "error",
        });
        return;
      }
      if (startTime == "") {
        setSnakeBarProps({
          msz: "Time start  are required!",
          type: "error",
        });
        return;
      }
      if (endTime == "") {
        setSnakeBarProps({
          msz: "End time are required!",
          type: "error",
        });
        return;
      }
      pData = {
        ...pData,
        requestMasterId: pagedata?.requestId,

        dateStart: dateConverter(moment(startDate).format("DD-MM-YYYY")),
        dateEnd: dateConverter(moment(endDate).format("DD-MM-YYYY")),
        timeStart: startTime,
        timeEnd: endTime,
        comments: commentValue,
        specificDays: check ? "S" : "A",
        mon: CheckDays.mon ? "Y" : "N",
        tue: CheckDays.tue ? "Y" : "N",
        wed: CheckDays.wed ? "Y" : "N",
        thu: CheckDays.thu ? "Y" : "N",
        fri: CheckDays.fri ? "Y" : "N",
        sat: CheckDays.sat ? "Y" : "N",
        sun: CheckDays.sun ? "Y" : "N",
      };
    }

    if (pagedata?.requestObj?.requestName == "Punch Request") {
      if (effectiveDate >= new Date() || effectiveDate == new Date()) {
        setSnakeBarProps({
          msz: "Punch request can not be raised for future dates.",

          type: "error",
        });
        return;
      }
      if (startTime == "" && endTime == "") {
        setSnakeBarProps({
          msz: "Time start and Time end are required!",
          type: "error",
        });
        return;
      }
      if (startTime == "") {
        setSnakeBarProps({
          msz: "Time start  are required!",
          type: "error",
        });
        return;
      }
      if (endTime == "") {
        setSnakeBarProps({
          msz: "End time are required!",
          type: "error",
        });
        return;
      }
      pData = {
        ...pData,
        requestMasterId: pagedata?.requestId,

        effectiveDate: dateConverter(
          moment(effectiveDate).format("DD-MM-YYYY")
        ),
        timeStart: startTime,
        timeEnd: endTime,
        comments: commentValue,
        requestReasonId: dropdown.reasonID,
      };
    }

    if (pagedata?.requestObj?.requestName == "Shift Time Change") {
      // if (startTime == "" && endTime == "") {
      //   setSnakeBarProps({
      //
      //     msz: "Time start and Time end are required!",
      //     type: "error",
      //   });
      //   return;
      // }
      if (startTime == "") {
        setSnakeBarProps({
          msz: "Time start is required!",
          type: "error",
        });
        return;
      }
      if (endTime == "") {
        setSnakeBarProps({
          msz: "End time is required!",
          type: "error",
        });
        return;
      }
      // if (startNewTime == "" && endNewTime == "") {
      //   setSnakeBarProps({
      //
      //     msz: "Time start and Time end are required!",
      //     type: "error",
      //   });
      //   return;
      // }
      if (startNewTime == "") {
        setSnakeBarProps({
          msz: "New Time Start is required!",
          type: "error",
        });
        return;
      }
      if (endNewTime == "") {
        setSnakeBarProps({
          msz: "New End time is required!",
          type: "error",
        });
        return;
      }
      pData = {
        ...pData,
        requestMasterId: pagedata?.requestId,
        effectiveDate: dateConverter(
          moment(effectiveDate).format("DD-MM-YYYY")
        ),
        timeStart: startTime,
        timeEnd: endTime,
        newTimeStart: startNewTime,
        newTimeEnd: endNewTime,
        comments: commentValue,
      };
    }

    if (pagedata?.requestObj?.requestName == "Swap Shift Request") {
      // if (!sourceRosterData.rosterObj?.value) {
      //   setSnakeBarProps({
      //
      //     msz: "Source Roster is required",
      //     type: "error",
      //   });
      //   return;
      // }
      // if (!destinationRosterData.destinationObj?.value) {
      //   setSnakeBarProps({
      //
      //     msz: "Destination Roster is required.",

      //     type: "error",
      //   });
      //   return;
      // }
      let tStart = moment().format("hh:mm A"); //needs to be fixed from api
      let tEnd = moment().add(30, "s").format("hh:mm A");
      pData = {
        ...pData,
        requestMasterId: pagedata?.requestId,
        timeStart: dateConverter(moment(effectiveDate).format("DD-MM-YYYY")),
        effectiveDate: dateConverter(
          moment(effectiveDate).format("DD-MM-YYYY")
        ),
        spersonRosterId: sourceRosterData?.personRosterId,
        dpersonRosterId: destinationRosterData?.destinationRoster,
        timeStart: tStart,
        timeEnd: tEnd,
        comments: commentValue,
      };
    }

    setIsLoadingBut(true);
    CreateRequestMutate(pData);
  };

  const startDateChange = (startDatevalue) => {
    setStartDate(startDatevalue);
  };

  useEffect(() => {
    if (
      effectiveDate &&
      pagedata?.requestObj?.requestName == "Shift Time Change"
    ) {
      validateTimeCard(effectiveDate);
    }
  }, [pagedata.requestId]);

  const effectiveDateChange = (effectiveDatevalue) => {
    seteffectiveDate(effectiveDatevalue);
    validateTimeCard(effectiveDatevalue);
  };

  const validateTimeCard = (effectiveDatevalue) => {
    if (pagedata?.requestObj?.requestName == "Shift Time Change") {
      const date = moment(effectiveDatevalue).format("YYYY-MM-DD");
      const employeesWithTimeCard = oriPagedata.filter(
        (st) =>
          st.personId === item?.personId &&
          st?.effectiveDate &&
          st.effectiveDate.split(" ")[0] === date &&
          st.schTimeStart &&
          st.schTimeEnd
      );
      if (employeesWithTimeCard.length > 0) {
        setStartTime(
          moment(employeesWithTimeCard[0].schTimeStart).format("hh:mm A")
        );
        setEndTime(
          moment(employeesWithTimeCard[0].schTimeEnd).format("hh:mm A")
        );
      } else {
        setStartTime("");
        setEndTime("");
        setSnakeBarProps({
          msz:
            "Time card is not available for :" +
            " " +
            dateConverter(moment(date).format("DD-MM-YYYY ")),
          type: "error",
        });
      }
    }
  };

  const endDateChange = (endDatevalue) => {
    setEndDate(endDatevalue);
  };

  const onOptionChange = (newData) => {
    setCommentValue("");
    setPagedata({
      ...pagedata,
      requestObj: newData,
      requestId: newData?.requestMasterId,
    });
  };

  const onDropdownChange = (newData) => {
    setDropdown({
      ...dropdown,
      reasonObj: newData,
      reasonID: newData?.requestReasonId,
    });
  };

  const onRosterChange = (newData) => {
    setSourceRosterData({
      ...sourceRosterData,
      rosterObj: newData,
      personRosterId: newData.value,
    });
  };

  const onDestinationRosterChange = (newData) => {
    setDestinationRosterData({
      ...destinationRosterData,
      destinationObj: newData,
      destinationRoster: newData?.value,
    });
  };

  console.log(destinationRosterData, "destinationRosterData");
  return (
    <CustomDialog
      maxWidth="md"
      title="Request Details"
      open="true"
      handleClose={handleClose}
    >
      <Box p={2} display="flex">
        <Grid item xs="7" alignItems="center" className={classes.wrap}>
          <Grid container alignItems="center">
            <Grid item xs="3">
              <Typography fontSize="14px">
                <Box textAlign="right" mr={2}>
                  Request Type*
                </Box>
              </Typography>
            </Grid>
            <Grid item xs="9">
              <Dropdown
                id="Request Type"
                data={pagedata?.requestArray}
                caller={onOptionChange}
                month={pagedata?.requestObj}
                getoptionlabelkey="requestName"
              />
            </Grid>
          </Grid>
          {pagedata?.requestObj?.requestName == "Official Permission" ||
          pagedata?.requestObj?.requestName == "Punch Request" ||
          pagedata?.requestObj?.requestName == "Official Permission" ? (
            <Grid container alignItems="center">
              <Grid item xs="3">
                <Typography fontSize="14px">
                  <Box textAlign="right" mr={2}>
                    Reason
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs="9">
                <Dropdown
                  id="Reason"
                  data={dropdown?.reasonArray}
                  caller={onDropdownChange}
                  month={dropdown?.reasonObj}
                  getoptionlabelkey="reason"
                />
              </Grid>
            </Grid>
          ) : null}
          {pagedata?.requestObj?.requestName == "Change Day Off" ||
          pagedata?.requestObj?.requestName == "Punch Request" ||
          pagedata?.requestObj?.requestName == "Shift Time Change" ||
          pagedata?.requestObj?.requestName == "Swap Shift Request" ? (
            <Grid container alignItems="center">
              <Grid item xs="3">
                <Typography fontSize="14px">
                  <Box textAlign="right" mr={2}>
                    Effective Date*
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs="9">
                <EvoDatePicker
                  // value={effectiveDate}
                  selected={effectiveDate}
                  onChange={effectiveDateChange}
                />
              </Grid>
            </Grid>
          ) : null}
          {pagedata?.requestObj?.requestName == "Official Permission" ||
          pagedata?.requestObj?.requestName == "Personal Permission" ? (
            <>
              <Grid container alignItems="center">
                <Grid item xs="3">
                  <Typography fontSize="14px">
                    <Box textAlign="right" mr={2}>
                      Start Date*
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs="9">
                  <EvoDatePicker
                    selected={startDate}
                    onChange={startDateChange}
                  />
                </Grid>
              </Grid>

              <Grid container alignItems="center">
                <Grid item xs="3">
                  <Typography fontSize="14px">
                    <Box textAlign="right" mr={2}>
                      End Date*
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs="9">
                  <EvoDatePicker selected={endDate} onChange={endDateChange} />
                </Grid>
              </Grid>
            </>
          ) : null}
          {pagedata?.requestObj?.requestName == "Change Day Off" ||
          pagedata?.requestObj?.requestName == "Official Permission" ||
          pagedata?.requestObj?.requestName == "Swap Shift Request" ||
          pagedata?.requestObj?.requestName == "Personal Permission" ||
          pagedata?.requestObj?.requestName == "Punch Request" ? (
            <>
              <Grid container alignItems="center">
                <Grid item xs="3">
                  <Typography fontSize="14px">
                    <Box textAlign="right" mr={2}>
                      Time Start
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs="9">
                  <EvoTimePicker
                    value={
                      pagedata?.requestObj?.requestName == "Shift Time Change"
                        ? startTime
                        : null
                    }
                    onChange={(e) => {
                      pagedata?.requestObj?.requestName !=
                        "Shift Time Change" && setOnBlurFlag(false);
                      setStartTime(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs="3">
                  <Typography fontSize="14px">
                    <Box textAlign="right" mr={2}>
                      Time End
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs="9">
                  <EvoTimePicker
                    value={
                      pagedata?.requestObj?.requestName == "Shift Time Change"
                        ? endTime
                        : null
                    }
                    onChange={(e) => {
                      setEndTime(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </>
          ) : null}
          {pagedata?.requestObj?.requestName == "Shift Time Change" ? (
            <>
              <Grid container alignItems="center">
                <Grid item xs="3">
                  <Typography fontSize="14px">
                    <Box textAlign="right" mr={2}>
                      Time Start
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs="9">
                  <Typography fontSize="8px">{startTime || ""}</Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs="3">
                  <Typography fontSize="14px">
                    <Box textAlign="right" mr={2}>
                      Time End
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs="9">
                  <Typography fontSize="8px">{endTime || ""}</Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs="3">
                  <Typography fontSize="14px">New Time Start*</Typography>
                </Grid>
                <Grid item xs="9">
                  <EvoTimePicker
                    value={startNewTime}
                    onChange={(e) => {
                      setNewStartTime(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container alignItems="center" style={{ paddingBottom: 5 }}>
                <Grid item xs="3">
                  <Typography fontSize="14px">New Time End*</Typography>
                </Grid>
                <Grid item xs="9">
                  <EvoTimePicker
                    value={endNewTime}
                    onChange={(e) => {
                      setNewEndTime(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </>
          ) : null}
          {pagedata?.requestObj?.requestName == "Swap Shift Request" ? (
            <>
              <Grid container alignItems="center">
                <Grid item xs="3">
                  <Typography fontSize="14px">
                    <Box textAlign="right" mr={2}>
                      Source Roster
                    </Box>
                  </Typography>
                </Grid>

                <Grid item xs="9">
                  <Dropdown
                    id="Source Roster"
                    data={
                      sourceRosterData?.rosterArray?.length > 0
                        ? sourceRosterData?.rosterArray?.map((option) => {
                            return option?.roster;
                          })
                        : []
                    }
                    caller={onRosterChange}
                    month={sourceRosterData?.rosterObj}
                    getoptionlabelkey="label"
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs="3">
                  <Typography fontSize="14px">
                    <Box textAlign="right" mr={2}>
                      Destination Roster
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs="9">
                  <Dropdown
                    id="Destination Roster"
                    data={
                      destinationRosterData?.destinationArray?.length > 0
                        ? destinationRosterData?.destinationArray?.map(
                            (option) => {
                              return {
                                label:
                                  option?.roster +
                                  "   " +
                                  option?.employeeNumber +
                                  "  " +
                                  option?.fullName,
                                value: option?.personRosterId,
                              };
                            }
                          )
                        : []
                    }
                    caller={onDestinationRosterChange}
                    month={destinationRosterData?.destinationObj}
                    getoptionlabelkey="label"
                  />
                </Grid>
              </Grid>
            </>
          ) : null}
          {pagedata?.requestObj?.requestName == "Change Day Off" ||
          pagedata?.requestObj?.requestName == "Official Permission" ||
          pagedata?.requestObj?.requestName == "Personal Permission" ||
          pagedata?.requestObj?.requestName == "Punch Request" ||
          pagedata?.requestObj?.requestName == "Shift Time Change" ||
          pagedata?.requestObj?.requestName == "Swap Shift Request" ? (
            <Grid container alignItems="center">
              <Grid item xs="3">
                <Typography fontSize="14px">
                  <Box textAlign="right" mr={2}>
                    Comments
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs="9"></Grid>
            </Grid>
          ) : null}
          {pagedata?.requestObj?.requestName == "Official Permission" ||
          pagedata?.requestObj?.requestName == "Personal Permission" ? (
            <>
              <Grid container alignItems="center">
                <Grid item xs="3">
                  <Typography fontSize="14px">
                    <Box textAlign="right" mr={2}>
                      Specific Days
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  <CustomCheckBox
                    isChecked={check}
                    onChangeCheck={onChangeCheck}
                  />
                </Grid>
                <Grid item xs="12">
                  {check ? (
                    <Grid>
                      <Box ml={10}>
                        <Grid
                          style={{ display: "flex", marginLeft: 110 }}
                          item
                          xs="12"
                          justifyContent="space-around"
                        >
                          <CustomCheckBox
                            isChecked={CheckDays.mon}
                            style={{ padding: 0 }}
                            onChangeCheck={(e) =>
                              setCheckDays({ ...CheckDays, mon: e })
                            }
                            label="Mon"
                          />
                          <CustomCheckBox
                            isChecked={CheckDays.tue}
                            onChangeCheck={(e) =>
                              setCheckDays({ ...CheckDays, tue: e })
                            }
                            label="Tue"
                          />
                          <CustomCheckBox
                            isChecked={CheckDays.wed}
                            onChangeCheck={(e) =>
                              setCheckDays({ ...CheckDays, wed: e })
                            }
                            label="Wed"
                          />
                          <CustomCheckBox
                            isChecked={CheckDays.thu}
                            onChangeCheck={(e) =>
                              setCheckDays({ ...CheckDays, thu: e })
                            }
                            label="Thu"
                          />
                          <CustomCheckBox
                            isChecked={CheckDays.fri}
                            onChangeCheck={(e) =>
                              setCheckDays({ ...CheckDays, fri: e })
                            }
                            label="Fri"
                          />
                          <CustomCheckBox
                            isChecked={CheckDays.sat}
                            onChangeCheck={(e) =>
                              setCheckDays({ ...CheckDays, sat: e })
                            }
                            label="Sat"
                          />
                          <CustomCheckBox
                            isChecked={CheckDays.sun}
                            onChangeCheck={(e) =>
                              setCheckDays({ ...CheckDays, sun: e })
                            }
                            label="Sun"
                          />
                        </Grid>
                      </Box>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
              {check && (
                <EvoDayPicker
                  selectedDays={CheckDays}
                  onChange={setCheckDays}
                />
              )}
            </>
          ) : null}
        </Grid>
        <Grid item xs="5">
          <Box p="7px 10px 0px 50px">
            <Box border="1px solid #D6DFE6" padding={2} borderRadius="4px">
              <Box color="#2a99d1">
                <Typography variant="h6">Attachment(s)</Typography>
              </Box>
              <Input type="file" inputRef={inputRef} />
              <Box mt={2} border="1px solid #979991">
                <Grid
                  container
                  className={classes.headermanage}
                  alignItems="center"
                >
                  <Grid item xs="1">
                    <Typography fontSize="14px">#</Typography>
                  </Grid>
                  <Grid item xs="8">
                    <Box>
                      <Typography fontSize="14px">File Name</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs="3">
                    <Box display="flex" justifyContent="flex-end">
                      <EvoButton
                        btnText="Delete"
                        // //variant="contained"
                        // btnClass={{
                        //   backgroundColor: "#124590",
                        //   color: "#fff",
                        //   fontSize: "12px",
                        // }}
                        onClick={() => {
                          console.log(inputRef.current);
                          inputRef.current.value = null;
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              {removeData?.length > 0 &&
                removeData?.map((item, index) => {
                  return (
                    <Grid
                      container
                      className={classes.headermanage}
                      alignItems="center"
                    >
                      <Grid item xs="1">
                        <Typography fontSize="14px">{item?.id}</Typography>
                      </Grid>
                      <Grid item xs="8">
                        <Box>
                          <Typography fontSize="14px">{item?.name}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs="3">
                        <Box ml={2}>
                          <EvoButton
                            btnText="Delete"
                            // //variant="contained"
                            // btnClass={{
                            //   backgroundColor: "#124590",
                            //   color: "#fff",
                            //   fontSize: "12px",
                            // }}
                            onClick={() => removeClickHandler(index)}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  );
                })}
            </Box>
          </Box>
        </Grid>
      </Box>
    </CustomDialog>
  );
};

const useStyles = makeStyles(() => ({
  wrap: {
    "& p": {
      padding: "15px 0px 15px 0px",
    },
  },
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F2F4F7",
    padding: "3px",
    "& p": {
      fontWeight: "bold",
      paddingLeft: "5px",
    },
  },
  addIcon: {
    color: "#60AA60",
    fontWeight: "bold",
    fontSize: "16px",
  },
  deleteIcon: {
    color: "#f24b3f",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
}));
