import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { CustomDialog } from "../../../components/CustomDialog";
import { useSelector } from "react-redux";
import EvoToggleButton from "../../../components/EvoButton/toggle";
import { EvoHBox } from "../../../components/EvoBox";
import { Box } from "@mui/system";
import { EvoDataForm } from "../../../components/EvoDataForm";
import {
  useGetOnCallList,
  useGetOnEmergencyList,
  useGetWorkDuration,
  useGetWorkLocationList,
} from "../../../services/roster";
import { useSplitShiftData } from "../../../services/rostersettings";

import moment from "moment";
import EvoDayPicker from "../../../components/EvoDateTime/day";
import EvoDataGrid from "../../../components/EvoDataGrid";
import AddIcon from "@mui/icons-material/Add";
import { CustomFilterModal } from "../../../components/CustomFilterModal";
import { convertArrToSet, convertSetToArr } from "../../contants";
import getTemplate from "../../../components/getTemplate";
import { EvoButton } from "../../../components/EvoButton";
import { Option1, Option2 } from "../../../services/api";
import { useMutation } from "react-query";
import { checkValidations, dateConverter } from "../../../utils/commonService";

const CheckDaysComponent = ({ isWorkSeeVisible, CheckDays, setCheckDays }) => {
  if (isWorkSeeVisible) {
    return (
      <EvoDayPicker
        containerStyles={{
          marginLeft: "0px",
          fontWeight: "bold",
        }}
        labelStyles={{ fontWeight: "bold" }}
        label="Working Days"
        hasLabel={true}
        selectedDays={CheckDays}
        onChange={setCheckDays}
      />
    );
  }
};

const AssignRoster = (props) => {
  const classes = useStyles();
  const commonReducer = useSelector((state) => state.commonReducer);
  const {
    defaultPerson,
    togglehandler,
    refetchEmployeeList,
    data,
    setSnakeBarRosterProps,
    assignAnotherRoster,
    setAssignAnotherRoster,
  } = props;
  const [isLoadingAssignRosterPage, setIsLoadingAssignRosterPage] =
    React.useState(true);
  const [snakeBarAssignRosterProps, setSnakeBarAssignRosterProps] =
    React.useState({});

  const handleClose = () => {
    togglehandler(false);
  };

  const optionArray = [
    { id: 1, label: "Option 1", value: "1" },
    { id: 2, label: "Option 2", value: "2" },
  ];
  const [apprStatus, setApprStatus] = React.useState(optionArray[0].value);

  const RightComponent = () => (
    <Typography style={{ color: "red", fontSize: "10px" }}>
      *Overlapped shifts will be replaced.
    </Typography>
  );
  const isOption1 = apprStatus === optionArray[0].value;
  const isOption2 = apprStatus === optionArray[1].value;

  const [comments, setComments] = React.useState("");
  const [startDate, setStartDate] = React.useState(
    new Date(commonReducer.effectiveDate)
  );
  const [endDate, setEndDate] = React.useState(
    new Date(commonReducer.effectiveDate)
  );

  const isWorkSeeVisible = () => {
    var res = new Date(endDate) > new Date(startDate);
    return res;
  };

  const formData1 = {
    gap: 2,
    labelWidth: "100px",
    items: [
      {
        label: "From Date",
        value: startDate,
        required: true,
        type: "date",
        onChange: (date) => setStartDate(date),
      },
      {
        label: "To Date",
        value: endDate,
        required: true,
        type: "date",
        onChange: (date) => setEndDate(date),
      },
      {
        label: "Comments",
        value: comments,
        onChange: (e) => setComments(e.target.value),
        editorProps: {
          width: 200,
        },
      },
    ],
  };

  const radioListArr = [
    {
      label: "Work Duration",
      id: 1,
    },
    {
      label: "Split Shift",
      id: 2,
    },
  ];
  const [radioId, setRadioId] = useState(radioListArr[0].id);
  const [index, setIndex] = React.useState({});
  const [workDurationArr, setWorkDurationArr] = useState([]);
  const [workLocationArr, setWorkLocationArr] = useState([]);
  const [splitShiftList, setSplitShiftList] = useState([]);
  const [selectedSplitShift, setSelectedSplitShift] = useState({});

  const resetIndex = () => {
    setIndex({});
  };

  const radioHandler = (status) => {
    setRadioId(status);
  };
  useEffect(() => {
    resetIndex();
  }, [radioId]);

  const getDate = (value) => {
    return moment(value).format("hh:mm A");
  };

  var startTime = index && "timeStart" in index ? getDate(index.timeStart) : "";
  var endTime = index && "timeEnd" in index ? getDate(index.timeEnd) : "";
  var shiftHours =
    index && "shiftHours" in index ? index.shiftHours + " hrs" : "";
  const handleWorkDuration = (value) => {
    setIndex(value);
  };
  const handleChangeWorkDuration = (item, index) => {
    const arr = [
      {
        key: "workDurationCode",
        newValue: Object.keys(item).length ? item["workDurationCode"] : "",
      },
      {
        key: "workDurationId",
        newValue: Object.keys(item).length ? item["workDurationId"] : "",
      },
      {
        key: "timeStart",
        newValue: Object.keys(item).length ? getDate(item["timeStart"]) : "",
      },
      {
        key: "timeEnd",
        newValue: Object.keys(item).length ? getDate(item["timeEnd"]) : "",
      },
      {
        key: "startTime",
        newValue: Object.keys(item).length ? item["timeStart"] : "",
      },
      {
        key: "endTime",
        newValue: Object.keys(item).length ? item["timeEnd"] : "",
      },
    ];
    updateArr(index, arr);
  };
  const handleWorkDurationSelector = (arr) => {
    let activeItems = [];
    let inActiveItems = [];
    arr.map((item) => {
      let validTo = item?.validTo;
      if (validTo) {
        validTo = dateConverter(validTo);
        let isInactive = moment(validTo).isBefore(moment(new Date()));
        if (isInactive) {
          inActiveItems.push({ ...item, disabled: true });
        } else {
          activeItems.push(item);
        }
      } else {
        activeItems.push(item);
      }
    });
    return [...activeItems, ...inActiveItems];
  };
  const { data: workDurationData } = useGetWorkDuration(
    null,
    handleWorkDurationSelector
  );

  const [CheckDays, setCheckDays] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });
  useEffect(() => {
    if (
      isWorkSeeVisible() &&
      (index.workDurationId || selectedSplitShift.spliShiftId)
    ) {
      setCheckDays({
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
        sun: true,
      });
    }
  }, [index, selectedSplitShift]);
  const formData2 = {
    gap: 3,
    labelWidth: 200,
    direction: "row",
    items: [
      {
        label: "Work Duration",
        // value: index?.workDurationCode,
        required: true,
        type: "dropdown",
        editorProps: {
          width: 150,
          data: workDurationArr,
          caller: handleWorkDuration,
          month: index,
          getoptionlabelkey: "workDurationCode",
        },
      },
      {
        label: "Start Time",
        value: startTime,
        readOnly: true,
      },
      {
        label: "End Time",
        value: endTime,
        readOnly: true,
      },
      {
        label: "Shift Hrs",
        value: shiftHours,
        readOnly: true,
      },
    ],
  };
  const workLocationSelector = (arr) => {
    if (Array.isArray(arr)) {
      return arr.map((item) => {
        return { ...item, workLocationId: parseInt(item.workLocationId) };
      });
    }
    return [];
  };
  const { data: workLocationList } = useGetWorkLocationList(
    {},
    workLocationSelector
  );
  useEffect(() => {
    if (workLocationList) {
      setWorkLocationArr(workLocationList);
    }
  }, [workLocationList]);

  //  splitshift get api
  const { data: splitShiftData } = useSplitShiftData();
  useEffect(() => {
    if (splitShiftData) {
      setSplitShiftList(splitShiftData);
    }
  }, [splitShiftData]);
  const formData3 = {
    gap: 3,
    labelWidth: 200,
    direction: "row",
    style: { gap: 3 },
    items: [
      {
        label: "Split Shift",
        required: true,
        type: "dropdown",
        editorProps: {
          width: 250,
          data: splitShiftList,
          caller: setSelectedSplitShift,
          month: selectedSplitShift,
          getoptionlabelkey: "splitShiftName",
        },
      },
    ],
  };
  useEffect(() => {
    if (workDurationData) {
      setWorkDurationArr(workDurationData);
    }
  }, [workDurationData]);
  const [open, setOpen] = React.useState(false);
  const openAddStaff = () => {
    setOpen(true);
  };
  const [staffList, setStaffList] = React.useState([]);
  const [selectedStaff, setSelectedStaff] = React.useState({
    employeeNumber: convertArrToSet([defaultPerson], "employeeNumber"),
  });
  const removeStaff = (newSet) => {
    setSelectedStaff({ employeeNumber: newSet });
  };

  useEffect(() => {
    var list = convertSetToArr(
      data,
      "employeeNumber",
      selectedStaff.employeeNumber
    );

    list = list.map((item, index) => {
      var previousElement = staffList.find(
        (staffElement) => staffElement.personId === item.personId
      );
      var obj = {
        ...item,
        staffName: `${item["fullName"]} [${item["employeeNumber"]}]`,
        days: {
          mon: true,
          tue: true,
          wed: true,
          thu: true,
          fri: true,
          sat: true,
          sun: true,
        },
        ...previousElement,
        index,
      };
      return obj;
    });
    if (assignAnotherRoster) {
      setStaffList([{ ...defaultPerson }]);
      setAssignAnotherRoster(false);
    } else {
      if (list.length === 0) {
        list.push({
          employeeNumber: "",
          fullName: "",
          jobTitleId: "",
          jobTitle: "",
          departmentId: "",
          workLocationId: "",
          workLocation: "",

          department: "",
          staffName: "",
          days: {
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: true,
            sun: true,
          },
          index: 0,
        });
      }
      setStaffList(list);
    }
    // debugger;
  }, [selectedStaff]);

  const params = {
    asc: true,
    pageNo: "0",
    pageSize: "1000",
    sortingField: "fullName",
    userId: commonReducer.userId,
  };
  const modalData = getTemplate("ADD_STAFF_TEMPLATE", params);

  // Data Grid Section
  const HeaderComponent = () => {
    return (
      <>
        <EvoButton
          btnText="Add Staff"
          startIcon={<AddIcon />}
          onClick={openAddStaff}
        />
        {open && (
          <CustomFilterModal
            modalData={modalData}
            togglerhandler={setOpen}
            filter={selectedStaff}
            onFilter={setSelectedStaff}
            multiFilterSelection={false}
          />
        )}
      </>
    );
  };
  const handleChangeWorkLocation = (index, item) => {
    const arr = [
      { key: "workLocation", newValue: item["locationName"] },
      { key: "workLocationId", newValue: item["workLocationId"] },
    ];
    updateArr(index, arr);
  };

  const handleChangeOnCall = (index, item) => {
    const arr = [{ key: "onCall", newValue: item["valueMeaning"] }];
    updateArr(index, arr);
  };
  const handleChangeOnEmergency = (index, item) => {
    const arr = [{ key: "emergency", newValue: item["valueMeaning"] }];
    updateArr(index, arr);
  };
  //  props for api
  const getallStaffDataProps = () => {
    return {
      asc: true,
      pageNo: "0",
      pageSize: "1000",
      sortingField: "fullName",
      userId: commonReducer.userId,
    };
  };
  const getDepartmentByIdProps = () => {
    return {
      userId: commonReducer.userId,
      profileId: commonReducer.selectedProjectObj.profileId,
    };
  };
  const getJobTitleByIdProps = (props) => {
    return {
      userId: commonReducer.userId,
      ...props,
    };
  };

  // template list
  const staffNameTemplate = () => {
    return getTemplate("STAFF_TEMPLATE", getallStaffDataProps());
  };
  const getTimeFormat = (value) => {
    return moment(value).format("hh:mm A");
  };
  const evoLookUpSelector = (arr) => {
    return arr?.map((item, index) => {
      return {
        ...item,
        index,
        time: `${getTimeFormat(item.timeStart)} - ${getTimeFormat(
          item.timeEnd
        )}`,
      };
    });
  };
  const workDurationTemplate = () => {
    return getTemplate("WORK_DURATION_TEMPLATE", {}, evoLookUpSelector);
  };
  const departmentSelector = (arr) => {
    if (Array.isArray(arr)) {
      return arr.map((item) => {
        return {
          departmentName: item.departmentName,
          departmentId: parseInt(item.departmentId),
        };
      });
    } else return [];
  };
  const departmentTemplate = () => {
    return getTemplate(
      "DEPARTMENT_TEMPLATE",
      getDepartmentByIdProps(),
      departmentSelector
    );
  };

  const jobTitleListSelector = (arr) => {
    var res = arr?.map((item, index) => {
      return { ...item, index };
    });
    return res;
  };
  const jobTitleTemplate = (row) => {
    return getTemplate(
      "JOB_TITLE_TEMPLATE",
      getJobTitleByIdProps({
        departmentId: row["departmentId"],
      }),
      jobTitleListSelector
    );
  };
  const dutyManagerTemplate = () => {
    return getTemplate("DUTY_MANAGER_TEMPLATE", getallStaffDataProps());
  };

  const updateArr = (index, arr) => {
    var newArr = [...staffList];
    if (newArr && newArr.length) {
      arr.map((item) => {
        newArr[index][item.key] = item.newValue ? item.newValue : "";
      });
      setStaffList(newArr);
    }
  };

  const handleChangeStaffName = (item, index) => {
    const arr = [
      {
        key: "staffName",
        newValue: `${item["staffName"]} [${item["employeeNumber"]}]`,
      },
      { key: "employeeNumber", newValue: item["employeeNumber"] },
      { key: "personId", newValue: item["personId"] },
    ];
    updateArr(index, arr);
  };
  const handleChangeDays = (item, index) => {
    const arr = [
      {
        key: "days",
        newValue: item,
      },
    ];
    updateArr(index, arr);
  };

  const handleChangeDepartmentName = (item, index) => {
    const arr = [
      { key: "department", newValue: item["departmentName"] },
      { key: "departmentId", newValue: item["departmentId"] },
      { key: "jobTitle", newValue: "" },
      { key: "jobTitleId", newValue: "" },
    ];
    updateArr(index, arr);
  };

  const handleChangeJobTitleName = (item, index) => {
    const arr = [
      { key: "jobTitle", newValue: item["jobTitle"] },
      { key: "jobTitleId", newValue: item["jobTitleId"] },
    ];

    updateArr(index, arr);
  };

  const handleChangeDutyManagerName = (item, index) => {
    const arr = [
      { key: "managerName", newValue: item["staffName"] },
      { key: "managerId", newValue: item["personId"] },
    ];

    updateArr(index, arr);
  };

  const deleteStaff = (i) => {
    const deleteval = [...staffList];
    deleteval?.splice(i, 1);
    var newSet = convertArrToSet(deleteval, "employeeNumber");
    removeStaff(newSet);
  };

  const { data: onCallArr } = useGetOnCallList();
  const { data: emergencyArr } = useGetOnEmergencyList();

  var tableColumns = [
    {
      key: "remove",
      name: "Remove",
      type: "delete",
      onDeleted: deleteStaff,
    },
    {
      key: "staffName",
      name: "*Staff",
      type: "lookup",
      // width:250,
      templateMethod: staffNameTemplate,
      selectItem: handleChangeStaffName,
    },

    { key: "employeeNumber", name: "Employee Number", width: 150 },
    {
      key: "department",
      name: "*Department",
      type: "lookup",
      templateMethod: departmentTemplate,
      selectItem: handleChangeDepartmentName,
    },
    {
      key: "jobTitle",
      name: "*JobTitle",
      type: "lookup",
      templateMethod: jobTitleTemplate,
      selectItem: handleChangeJobTitleName,
    },
    {
      key: "workLocationId",
      name: "Work Location",
      type: "dropdown",
      width: 250,
      editorProps: {
        width: 180,
        data: workLocationArr,
        caller: handleChangeWorkLocation,
        selectedId: "workLocationId",
        getoptionlabelkey: "locationName",
      },
    },
    {
      key: "managerName",
      name: "Duty Manager",
      type: "lookup",
      templateMethod: dutyManagerTemplate,
      selectItem: handleChangeDutyManagerName,
    },
    {
      key: "onCall",
      name: "On Call",
      type: "dropdown",
      width: 200,
      editorProps: {
        width: 200,
        data: onCallArr,
        caller: handleChangeOnCall,
        selectedId: "valueMeaning",
        getoptionlabelkey: "valueMeaning",
      },
    },
    {
      key: "emergency",
      name: "Emergency",
      type: "dropdown",
      width: 200,
      editorProps: {
        width: 200,
        data: emergencyArr,
        caller: handleChangeOnEmergency,
        selectedId: "valueMeaning",

        getoptionlabelkey: "valueMeaning",
      },
    },
  ];
  var tableColumnsOption2 = [
    {
      key: "workDurationCode",
      name: "*Work Duration",
      type: "lookup",
      templateMethod: workDurationTemplate,
      selectItem: handleChangeWorkDuration,
    },
    {
      key: "timeStart",
      name: "*Start Time",
    },
    {
      key: "timeEnd",
      name: "*End Time",
    },
  ];
  if (isOption2) {
    if (isWorkSeeVisible()) {
      tableColumnsOption2.push({
        name: "Working Days",
        key: "days",
        width: 500,
        renderCell: ({ row, column }) => {
          var disabled = [null, undefined, ""].includes(row.workDurationId);

          return (
            <EvoDayPicker
              containerStyles={{ margin: 0 }}
              styles={{ margin: 0 }}
              hasLabel={column.hasLabel}
              disabled={disabled}
              selectedDays={row[column.key]}
              onChange={(e) => handleChangeDays(e, row.index)}
            />
          );
        },
      });
    }

    tableColumns.splice(2, 0, ...tableColumnsOption2);
  }

  const validate = () => {
    var shiftId = selectedSplitShift.spliShiftId;
    const msz =
      radioId === 1 ? "Work Duration is required" : "Split Shift is required.";
    var value = radioId === 1 ? index.workDurationId : shiftId;
    const validations1 = [
      {
        msz: msz,
        type: "error",
        isMatch: [undefined, null, ""].includes(value),
      },
      {
        msz: "To Date should be after From Date.",
        type: "error",
        isMatch: new Date(startDate) > new Date(endDate),
      },

      {
        msz: "Please add staff.",
        type: "error",
        isMatch: staffList.length === 0,
      },
    ];
    var list = [];
    staffList.map((item) => {
      var value = [undefined, null, ""].includes(item.workDurationId);
      if (value) {
        list.push({
          msz: "Work Duration is required",
          type: "error",
          isMatch: value,
        });
      }
    });
    const validations2 = [
      {
        msz: "To Date should be after From Date.",
        type: "error",
        isMatch: new Date(startDate) > new Date(endDate),
      },

      {
        msz: "Please add staff.",
        type: "error",
        isMatch: staffList.length === 0,
      },
    ];

    return checkValidations({
      validations: isOption1 ? validations1 : [...validations2, ...list],
      setSnakeBarProps: setSnakeBarAssignRosterProps,
    });
  };

  const { mutate: optionListMutate, isLoading: isLoad } = useMutation(
    isOption1 ? Option1 : Option2,
    {
      onSuccess: (data, context, variables) =>
        onSuccessProfileList(data, context, variables),
      onError: (data, context, variables) =>
        onErrorProfileList(data, context, variables),
    }
  );

  useEffect(() => {
    if (isLoad) {
      setIsLoadingAssignRosterPage(true);
    } else {
      setIsLoadingAssignRosterPage(false);
    }
  }, [isLoad]);

  const onSuccessProfileList = (data) => {
    setSnakeBarRosterProps({
      msz: data?.data?.data,
      type: "success",
    });
    refetchEmployeeList();
    props.togglehandler(false);
  };
  const onErrorProfileList = (data) => {
    // refetchEmployeeList();
    setSnakeBarAssignRosterProps({
      msz: data?.data?.data,
      type: "success",
    });
  };

  const getOption1Payload = () => {
    var newStaffList = [];
    staffList.map((item) => {
      var employee = {
        employeeNumber: "",
        personId: "",
        departmentId: "",
        department: "",
        managerId: "",
        jobTitleId: "",
        jobTitle: "",
        workLocationId: "",
        workLocation: "",
        fullName: "",
        onCall: "",
        emergency: "",
      };

      Object.keys(employee).map((key) => {
        if (item[key]) {
          employee[key] = item[key];
        }
      });

      newStaffList.push(employee);
    });
    var days = {};

    Object.keys(CheckDays).map((key) => {
      days[key] = CheckDays[key] ? "Y" : "N";
    });

    var key = moment(commonReducer.effectiveDate).format("ddd").toLowerCase();

    var sameDay = dateConverter(startDate) === dateConverter(endDate);
    if (sameDay) {
      days[key] = "Y";
    }

    var payload = {
      fromDate: dateConverter(startDate),
      toDate: dateConverter(endDate),
      comments: comments,
      workDurationDto: {
        timeStart: index.timeStart,
        timeEnd: index.timeEnd,
        shiftHours: index.shiftHours,
        ...days,
        workDurationCode: index.workDurationCode,
        workDurationId: index.workDurationId,
      },
      staffDtoList: newStaffList,
    };
    // add splitshift if selected
    if (radioId === 2) {
      payload.workDurationDto = null;
      payload.shiftGroupId = selectedSplitShift.spliShiftId;
      payload = { ...payload, ...days };
    }
    return payload;
  };
  const getOption2Payload = () => {
    var newStaffList = [];
    staffList.map((item) => {
      var staffDto = {
        employeeNumber: "",
        personId: "",
        departmentId: "",
        department: "",
        managerId: "",
        jobTitleId: "",
        jobTitle: "",
        workLocationId: "",
        workLocation: "",
        fullName: "",
        onCall: "",
        emergency: "",
      };

      Object.keys(staffDto).map((key) => {
        if (item[key]) {
          staffDto[key] = item[key];
        }
      });

      var workDurationDto = {
        workDurationCode: item.workDurationCode,
        workDurationId: item.workDurationId,
        timeStart: item.startTime,
        timeEnd: item.endTime,
      };
      var days = {};
      Object.keys(item.days).map((key) => {
        days[key] = item.days[key] ? "Y" : "N";
      });
      workDurationDto = { ...workDurationDto, ...days };

      newStaffList.push({
        staffDto: staffDto,
        workDurationDto: workDurationDto,
      });
    });

    var payload = {
      fromDate: dateConverter(startDate),
      toDate: dateConverter(endDate),
      comments: comments,
      staffWorkDurationDto: newStaffList,
    };

    return payload;
  };

  const saveOption1 = () => {
    if (validate()) {
      if (isOption1) {
        const payload = getOption1Payload();
        optionListMutate(payload);
      } else if (isOption2) {
        var payload = getOption2Payload();
        optionListMutate(payload);
      }
    }
  };
  console.log("staffList", staffList);

  const getClassName = (row) => {
    var classNames = `${classes.Cell} `;

    return classNames;
  };

  return (
    <CustomDialog
      maxWidth="xl"
      title={"Assign"}
      open={true}
      handleClose={handleClose}
      isLoading={isLoadingAssignRosterPage}
      snakeBarProps={snakeBarAssignRosterProps}
      setSnakeBarProps={setSnakeBarAssignRosterProps}
      actions={{ onSave: saveOption1, onCancel: handleClose }}
    >
      <EvoHBox gap={3}>
        <EvoToggleButton
          status={apprStatus}
          handlechange={setApprStatus}
          list={optionArray}
        />
        <Box style={{ flex: 1 }} />
        {RightComponent && <RightComponent />}
      </EvoHBox>

      <Grid
        item
        xs="12"
        className={classes.popupContent}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Grid item xs="4" mb={2}>
          <Grid container>
            <Grid item xs="12">
              <Box className={classes.headerBox}>
                <Typography className={classes.headerText}>Times</Typography>
              </Box>
            </Grid>
            <Grid className={classes.dateBoxGrid}>
              <EvoDataForm formData={formData1} />
            </Grid>
          </Grid>
        </Grid>
        {isOption1 && (
          <Grid item xs="8" style={{ marginTop: "20px" }}>
            <Grid>
              <FormControl>
                <RadioGroup row name="row-radio-buttons-group">
                  {radioListArr.map((item, index) => {
                    const { label, id } = item;
                    const isChecked = radioId === id;
                    const onChange = () => radioHandler(id);
                    return (
                      <FormControlLabel
                        key={index}
                        value={label}
                        control={
                          <Radio checked={isChecked} onClick={onChange} />
                        }
                        label={
                          <Typography className={classes.labelText}>
                            {label}
                          </Typography>
                        }
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <Grid xs="10" sx={{ my: "10px" }}>
                <Stack gap={2}>
                  <EvoDataForm
                    formData={radioId === 1 ? formData2 : formData3}
                  />
                  <CheckDaysComponent
                    CheckDays={CheckDays}
                    setCheckDays={setCheckDays}
                    isWorkSeeVisible={isWorkSeeVisible()}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid
        container
        style={{
          border: "1px solid  #dbdbdb ",
          marginTop: "20px",
          overflow: "scroll",
        }}
      >
        <EvoDataGrid
          columns={tableColumns}
          rows={staffList}
          filterId="employeeNumber"
          height={450}
          HeaderComponent={HeaderComponent}
          title={"All Staff With Preferences"}
          rowClass={(row) => getClassName(row)}
        />
      </Grid>
    </CustomDialog>
  );
};

export default AssignRoster;

const useStyles = makeStyles((theme) => ({
  Cell: {
    "& .rdg-cell": {
      outline: "none",
      paddingInline: 0,
    },
  },
  AssignHeaderContent: {
    marginTop: "5px !important",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconStyle: {
    color: "#5BB75B",
  },
  cancelIconStyle: {
    color: "#f51414",
  },
  BtnStyleOn: {
    color: "#fff",
    backgroundColor: "#124590",
  },

  BtnStyleOff: {
    color: "#fff",
    backgroundColor: "#dbdbd",
  },
  selectedButton: {
    backgroundColor: "rgb(6 102 243) !important",
  },
  popupContent: {
    backgroundColor: "#fff",
    border: "1px solid  rgb(233, 233, 233)",
    minWidth: "max-content",
    margin: "10px 0px 0px 0px",
  },
  headerBox: {
    margin: "5px 0px 0px 10px",
  },
  headerText: {
    fontSize: "14px",
    fontFamily: "Inter",
    fontWeight: "bold",
    color: "#4594D7",
  },
  labelText: {
    fontSize: "14px !important",
    fontFamily: "Inter !important",
    fontWeight: "Bold !important",
  },
  dateBoxGrid: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column !important",
  },
  colWidth: {
    width: "190px",
  },
}));
