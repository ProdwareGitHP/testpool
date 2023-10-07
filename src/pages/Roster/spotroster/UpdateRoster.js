import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { CustomDialog } from "../../../components/CustomDialog";
import {
  PersonRosterDataWithDate,
  saveRosterProfile,
} from "../../../services/api";
import moment from "moment";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

import { useGetSingleShift } from "../../../services/rosterapi";
import { EvoHBox, EvoVBox } from "../../../components/EvoBox";
import { EvoDataForm } from "../../../components/EvoDataForm";
import { Stack } from "@mui/system";
import EvoDataGrid from "../../../components/EvoDataGrid";
import getTemplate from "../../../components/getTemplate";
import {
  useGetOnCallList,
  useGetOnEmergencyList,
  useGetWorkDuration,
  useGetWorkLocationList,
} from "../../../services/roster";
import { dateConverter, getSelectIndex } from "../../../utils/commonService";
import { useDispatch } from "react-redux";
import { updateState } from "../../../redux/commonSlice";
import DeleteModal from "./DeleteModal";
import { EvoButton } from "../../../components/EvoButton";

const UpdateRoster = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const commonReducer = useSelector((state) => state.commonReducer);
  const [getSingleShift, setGetSingleShift] = React.useState({});
  const {
    setAssign,
    setOnClickDefaultPerson,
    setAssignAnotherRoster,
    toggle,
    togglehandler,
    selectedRow,
    data,
    personRosterId,
    setSnakeBarRosterProps,
    refetchEmployeeList,
  } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [staffList, setStaffList] = React.useState([]);
  const [snakeBarLandingPage, setSnakeBarLandingPage] = useState({});
  const [workDuration, setWorkDuration] = useState({});
  const openDeleteModal = () => {
    setOpenDelete(true);
  };

  // const [openDelete]
  const handleClose = () => {
    togglehandler(false);
  };
  const { data: getSingleShiftRoster, isLoading: isLoading1 } =
    useGetSingleShift({
      personId: selectedRow.personId,
      personRosterId: personRosterId,
    });

  useEffect(() => {
    if (getSingleShiftRoster) {
      var shift = getSingleShiftRoster;
      setGetSingleShift(shift);
      setComments(shift.comments);
      var obj = { ...shift.staffRosterDto };
      obj.index = 0;
      obj.workLocationId = obj.workLocationId + "";
      var element = data.find((item) => item.personId === obj.managerId);
      if (element) {
        obj.managerName = element.staffName || element.fullName;
      }
      element = data.find((item) => item.personId === selectedRow.personId);

      if (element) {
        obj.personId = element.personId;
        obj.employeeNumber = element.employeeNumber;
        obj.departmentId = element.departmentId;
        obj.department = element.department;
        obj.jobTitleId = element.jobTitleId;
        obj.jobTitle = element.jobTitle;
        obj.workLocationId = element.workLocationId;
        obj.workLocation = element.workLocation;
        obj.staffName = `${element["fullName"]} [${element["employeeNumber"]}]`;
      }
      setStaffList([obj]);

      setWorkDuration(shift.workDurationDto);
      dispatch(
        updateState({
          effectiveDate: shift.effectiveDate,
        })
      );
    }
  }, [getSingleShiftRoster]);

  console.log("staffList ", staffList);
  const getDate = (value) => {
    return moment(value).format("hh:mm A");
  };

  const UpdateRosterProfile = () => {
    var obj = { ...staffList[0] };
    delete obj.index;
    var payload = {
      effectiveDate: commonReducer.effectiveDate,
      comments: comments,
      staffDto: {
        ...obj,
        personRosterId: parseInt(personRosterId),
        staffName: getSingleShift.staffRosterDto.staffName,
      },
      userId: commonReducer?.userId,
      workDurationDto: {
        ...workDuration,
      },
    };
    saveRosterProfileMutate(payload);
  };

  const { mutate: saveRosterProfileMutate, isLoading: isLoading2 } =
    useMutation(saveRosterProfile, {
      onSuccess: (data, context, variables) =>
        saveRosterProfileSuccess(data, context, variables),
      onError: (data, context, variables) =>
        saveRosterProfileError(data, context, variables),
    });
  const saveRosterProfileSuccess = (data) => {
    setSnakeBarRosterProps({
      msz: data.data.data,
      type: "success",
    });
    togglehandler(false);
    refetchEmployeeList();
  };

  const saveRosterProfileError = (data) => {
    setSnakeBarRosterProps({
      msz: data.message,
      type: "error",
    });
    refetchEmployeeList();
  };

  const [workDurationArr, setWorkDurationArr] = useState([]);
  const { data: workDurationList, isLoading: isLoading4 } =
    useGetWorkDuration();
  const workLocationSelector = (arr) => {
    if (Array.isArray(arr)) {
      return arr.map((item) => {
        return {
          workLocation: item.locationName,
          workLocationId: parseInt(item.workLocationId),
        };
      });
    } else return [];
  };
  useEffect(() => {
    if (workDurationList) {
      setWorkDurationArr(workDurationList);
    }
  }, [workDurationList]);
  const { data: workLocationArr } = useGetWorkLocationList(
    {},
    workLocationSelector
  );
  const { data: onCallArr } = useGetOnCallList();
  const { data: emergencyArr } = useGetOnEmergencyList();

  const RightComponent = () => (
    <Typography style={{ color: "red", fontSize: "10px" }}>
      *Overlapped shifts will be replaced.
    </Typography>
  );
  var startTime = "",
    endTime = "",
    shiftHours = "";

  const handleChangeWorkLocation = (index, item) => {
    const arr = [
      { key: "workLocation", newValue: item["workLocation"] },
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
      { key: "managerName", newValue: item["fullName"] || item["staffName"] },
      { key: "managerId", newValue: item["personId"] },
    ];
    updateArr(index, arr);
  };
  const [comments, setComments] = useState("");
  const formData1 = {
    gap: 2,
    labelWidth: "100px",
    items: [
      {
        label: "Effective Date",
        type: "text",
        value: dateConverter(commonReducer.effectiveDate),
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

  const handleWorkDuration = (value) => {
    setWorkDuration(value);
  };
  var [formData2, setFormData2] = useState({
    gap: 3,
    labelWidth: 200,
    direction: "row",
    items: [
      {
        label: "Work Duration",
        required: true,
        type: "dropdown",
        editorProps: {
          width: 150,
          data: workDurationArr,
          caller: handleWorkDuration,
          selectIndex: -1,
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
  });

  useEffect(() => {
    if (workDurationArr.length && workDuration.workDurationId) {
      var id = getSelectIndex(
        workDurationArr,
        "workDurationId",
        workDuration.workDurationId
      );
      var obj = { ...formData2 };
      obj.items[0].editorProps.data = workDurationArr;
      obj.items[0].editorProps.selectIndex = id;
      startTime =
        "timeStart" in workDuration ? getDate(workDuration.timeStart) : "";
      endTime = "timeEnd" in workDuration ? getDate(workDuration.timeEnd) : "";
      shiftHours =
        "shiftHours" in workDuration ? workDuration?.shiftHours + " hrs" : "";
      obj.items[1].value = startTime;
      obj.items[2].value = endTime;
      obj.items[3].value = shiftHours;

      setFormData2({ ...obj });
    }
  }, [workDurationArr, workDuration]);

  var tableColumns = [
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
        getoptionlabelkey: "workLocation",
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
        data: onCallArr || [],
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
        data: emergencyArr || [],
        caller: handleChangeOnEmergency,
        selectedId: "valueMeaning",
        getoptionlabelkey: "valueMeaning",
      },
    },
  ];
  const { mutate: DeletePersonData, isLoading: isLoading3 } = useMutation(
    PersonRosterDataWithDate,
    {
      onSuccess: (data, context, variables) => onCreateRequest(data),
      onError: (data, context, variables) => onErrorRequest(data),
    }
  );

  const onCreateRequest = (data) => {
    setSnakeBarRosterProps({
      msz: "Shift(s) deleted successfully",
      type: "success",
    });
    refetchEmployeeList();
    setOpenDelete(false);
    handleClose();
  };

  const onErrorRequest = (data) => {
    setSnakeBarRosterProps({
      msz: "Unable to delete Shift(s)",
      type: "error",
    });
    setOpenDelete(false);
    handleClose();
  };

  const personId = staffList.length
    ? staffList.map((item) => item.personId)
    : [];
  return (
    <>
      <CustomDialog
        maxWidth="xl"
        title={"Assign"}
        open={toggle}
        handleClose={handleClose}
        isLoading={isLoading1 || isLoading2 || isLoading4}
        snakeBarProps={snakeBarLandingPage}
        setSnakeBarProps={setSnakeBarLandingPage}
        actions={{
          onSave: UpdateRosterProfile,
          onDelete: openDeleteModal,
          onCancel: handleClose,
        }}
      >
        <EvoHBox gap={3}>
          <Box style={{ flex: 1 }} />
          {RightComponent && <RightComponent />}
        </EvoHBox>
        <EvoVBox>
          <Box className={classes.headerBox}>
            <EvoHBox gap={2}>
              <Typography className={classes.headerText}>Times</Typography>
              <EvoButton
                btnText="Add Another Shift"
                startIcon={<AddIcon />}
                onClick={() => {
                  handleClose();
                  setOnClickDefaultPerson({
                    ...staffList[0],
                    // workLocationId: parseInt(staffList[0].workLocationId),
                  });
                  setAssignAnotherRoster(true);
                    setAssign(true);
                }}
              />
            </EvoHBox>
            <EvoHBox style={{ marginTop: 3 }}>
              <EvoDataForm formData={formData1} />
              <EvoDataForm formData={formData2} />
            </EvoHBox>
          </Box>
        </EvoVBox>

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
            title={"All Staff With Preferences"}
          />
        </Grid>
      </CustomDialog>

      {openDelete && (
        <DeleteModal
          setStatus1={setOpenDelete}
          DeletePersonData={DeletePersonData}
          checked={personId}
          isLoading={isLoading3}
          setSnakeBarProps={setSnakeBarRosterProps}
          type="single"
          isEmptyShiftValues={true}
        />
      )}
    </>
  );
};

export default UpdateRoster;

const useStyles = makeStyles(() => ({
  headerBox: {
    margin: "5px 0px 0px 10px",
  },
  headerText: {
    fontSize: "14px",
    fontFamily: "Inter",
    fontWeight: "bolder",
    color: "#4594D7",
  },
  contentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  searchWorkDuration: {
    color: "#145c9e",
    "&:hover": {
      cursor: "pointer",
    },
  },
  text1: {
    fontSize: "8px",
    fontFamily: "Inter",
  },
  textField: {
    backgroundColor: "red",
  },
  text: {
    fontSize: "14px",
    fontFamily: "Inter",
    fontWeight: "bold",
  },
  addIcon: {
    color: "#60AA60",
    fontWeight: "bold",
    fontSize: "16px",
  },
}));
