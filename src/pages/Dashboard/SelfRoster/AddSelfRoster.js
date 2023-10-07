import EvoDataGrid from "../../../components/EvoDataGrid";
import { CustomDialog } from "../../../components/CustomDialog";
import { EvoDataForm } from "../../../components/EvoDataForm";
import { addInputs } from "./selfRosterUtils";
import { useEffect, useState } from "react";
import getTemplate from "../../../components/getTemplate";
import { useSelector } from "react-redux";
import { createSelfRoster, useGetSelfRosterWorkDurationsByPersonId, useGetWorkLocationList } from "../../../services/roster";
import { checkValidations, dateConverter, getSelectIndex } from "../../../utils/commonService";
import moment from "moment";
import { EvoHBox } from "../../../components/EvoBox";
import Dropdown from "../../../components/EvoDropDown";
import { useMutation } from "react-query";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const AddSelfRoster = ({
  calendarData,
  calendarColumns,
  closeAddSelfRosterModal,
  rosterRefetch = () => { }
}) => {
  const { data: workLocationArr, isLoading } = useGetWorkLocationList();
  const loggedInUserDetails = useSelector((state) => state.commonReducer);
  const { data: selfRosterWorkDurationsList = [] } = useGetSelfRosterWorkDurationsByPersonId({ personId: loggedInUserDetails.employeeId })
  const [fromDate, setFromDate] = useState(null);
  const [isTotalHoursExceeding, setIsTotalHoursExceeding] = useState(true);
  const [toDate, setToDate] = useState(null);
  const [department, setDepartment] = useState({
    departmentCode: "Emergency Medicine Section - 2798",
    departmentId: 300000003154938,
    departmentName: "S//38:Emergency Medicine Section",
  });
  const [jobTitle, setJobTitle] = useState({
    jobTitle: "Accountant - Asset Management-J388",
    jobTitleId: "300000003085388",
  });
  const [workLocation, setWorkLocation] = useState({});
  const [comments, setComments] = useState("");
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [tableRows, setTableRows] = useState([]);
  const [weeklyWorkDuration, setWeeklyWorkDuration] = useState([]);
  const [dateForCreate, setDateForCreate] = useState([]);
  var tableColumns = [
    {
      name: "Week",
      key: "week",
      width: 150,
    }
  ];
  weekdays.map((item) => {
    tableColumns.push({
      name: item,
      key: item.toLowerCase(),
      width: 200,
      renderCell: ({ row, column }) => {
        const columnKey = column?.columnKey;
        const rowIndex = "index" in row ? row.index : "";
        var index = columnKey ? columnKey : rowIndex;
        return (
          <EvoHBox style={{ padding: "0px 10px", marginTop: '4px' }}>
            <Dropdown
              data={selfRosterWorkDurationsList || []}
              width={200}
              getoptionlabelkey={"workDurationName"}
              caller={(value) => {
                handleWorkHour(index, value, column)
              }}
            />
          </EvoHBox>
        );
      }
    });
  });
  tableColumns.push({
    name: "Total Hrs",
    key: "totalHours",
    width: 150,
  })
  const handleWorkHour = (index, value, column) => {
    const updatedRows = [...weeklyWorkDuration];
    if (index >= 0 && index < updatedRows.length) {
      const key = column.key;
      const updatedObject = { ...updatedRows[index] };
      updatedObject[key] = value.workDurationId;
      if (dateForCreate[index] && dateForCreate[index].startDate && dateForCreate[index].endDate) {
        updatedObject.startDate = dateForCreate[index].startDate;
        updatedObject.endDate = dateForCreate[index].endDate;
      }
      updatedRows[index] = updatedObject;
      let totalWorkHours = 0;
      for (const day in updatedObject) {
        if (day !== "startDate" && day !== "endDate" && updatedObject[day] !== "") {
          totalWorkHours += parseFloat(value.duration);
        }
      }
      if (totalWorkHours > 24) {
        setIsTotalHoursExceeding(false);
      } else {
        setIsTotalHoursExceeding(true);
      }
      const updatedTableRows = [...tableRows];
      updatedTableRows[index] = {
        ...updatedTableRows[index],
        totalHours: totalWorkHours.toString(),
      };
      setWeeklyWorkDuration(updatedRows);
      setTableRows(updatedTableRows);
    }
  };
  const handleWorkLocation = (value) => {
    setWorkLocation(value);
  };
  const onlySundays = (date) => {
    const day = moment(date).weekday();
    return day === 0;
  };

  const onlySaturdays = (date) => {
    const day = moment(date).weekday();
    return day === 6;
  };
  const departmentSelector = (data) => {
    return data.items;
  };
  const addInputsFormData = {
    items: [
      {
        label: "From Date",
        value: fromDate,
        onChange: setFromDate,
        required: true,
        type: "date",
        filterMethod: onlySundays,
      },
      {
        label: "To Date",
        value: toDate,
        onChange: setToDate,
        required: true,
        type: "date",
        filterMethod: onlySaturdays,
      },
      {
        label: "Department",
        required: true,
        type: "lookup",
        value: department,
        editorProps: {
          width: 250,
          selectItem: setDepartment,
          template: getTemplate(
            "DEPARTMENT",
            {
              pageNo: 1,
              pageSize: "1000",
              sortBy: "",
              asc: "",
            },
            departmentSelector
          ),
          columnKey: "departmentName",
        },
      },

      {
        label: "Job Title",
        value: jobTitle,
        required: true,
        type: "lookup",
        editorProps: {
          width: 250,
          selectItem: setJobTitle,
          template: getTemplate("JOB_TITLE_TEMPLATE_ACCESS_CONTROL"),
          columnKey: "jobTitle",
        },
      },
      {
        label: "Work Location",
        required: true,
        type: "dropdown",
        editorProps: {
          width: 250,
          data: workLocationArr,
          month: workLocation,
          caller: handleWorkLocation,
          getoptionlabelkey: "locationName",
          selectIndex: 0,
        },
      },
      {
        label: "Comments",
        value: comments,
        onChange: (e) => setComments(e.target.value),
        required: false,
        editorProps: {
          width: 300,
        },
      },
    ],
    gap: 2,
    labelWidth: 120,
  };
  const generateRows = () => {
    var totalDays = moment(toDate).diff(moment(fromDate), "days") + 1;
    var totalWeeks = totalDays / 7;
    var res = [];
    var createDate = [];
    var startDate = fromDate;
    for (let index = 0; index < totalWeeks; index++) {
      var startStr = moment(startDate).format("DD-MMM");
      var startStr1 = moment(startDate).format("YYYY-MM-DDTHH:mm:ss");
      startDate = moment(startDate).add(6, "days");
      var endStr = startDate.format("DD-MMM");
      var endStr1 = startDate.format("YYYY-MM-DDTHH:mm:ss");
      var matchingTableRow = tableRows.find(row => row.week === `${startStr} - ${endStr}`);
      var totalHours = matchingTableRow ? matchingTableRow.totalHours : "0";
      res.push({ week: `${startStr} - ${endStr}`, index, totalHours });
      createDate.push({ startDate: startStr1, endDate: endStr1 });
      startDate = startDate.add(1, "days");
    }

    setDateForCreate(createDate);
    return res;
  };
  useEffect(() => {
    if (fromDate !== null && toDate !== null && fromDate < toDate) {
      const res = generateRows();
      setTableRows(res);
    }
  }, [fromDate, toDate]);
  useEffect(() => {
    if (tableRows.length > 0) {
      const newWeeklyWorkDuration = tableRows.map((row, index) => {
        if (index < weeklyWorkDuration.length) {
          return weeklyWorkDuration[index];
        } else {
          return {
            "sun": "",
            "mon": "",
            "tue": "",
            "wed": "",
            "thu": "",
            "fri": "",
            "sat": "",
            "startDate": "",
            "endDate": ""
          };
        }
      });
      setWeeklyWorkDuration(newWeeklyWorkDuration);
    }
  }, [tableRows])

  function checkWeeklyWorkDurationValidity(weeklyWorkDuration) {
    for (const workDuration of weeklyWorkDuration) {
      let hasValue = false;
      for (const key in workDuration) {
        if (key !== 'startDate' && key !== 'endDate' && workDuration[key] !== "") {
          hasValue = true;
          break;
        }
      }
      if (!hasValue) {
        return false;
      }
    }
    return true;
  }
  function isDateGreaterThanCurrent(dateString) {
    const targetDate = new Date(dateString);
    const currentDate = new Date();
    return targetDate > currentDate;
  }
  console.log(isTotalHoursExceeding);
  const validateSelfRoster = () => {
    const validations = [
      {
        msz: "From Date is required.",
        type: "error",
        isMatch: fromDate === null,
      },
      {
        msz: "To Date is required.",
        type: "error",
        isMatch: toDate === null,
      },
      {
        msz: "To Date should be after From Date.",
        type: "error",
        isMatch: fromDate > toDate,
      },

      {
        msz: "Department is required.",
        type: "error",
        isMatch: department.departmentId === "",
      },
      {
        msz: "Job Title is required.",
        type: "error",
        isMatch: jobTitle.jobTitletId === "",
      },
      {
        msz: "WorkLocation is required.",
        type: "error",
        isMatch: workLocation.workLocationId === "",
      },
      {
        msz: "Please select shift for at least one day.",
        type: "error",
        isMatch: checkWeeklyWorkDurationValidity(weeklyWorkDuration) === false,
      },
      {
        msz: "You can not request SelfRoster for previous date(s).",
        type: "error",
        isMatch: isDateGreaterThanCurrent(fromDate) === false,
      },
      {
        msz: "You can not request SelfRoster for previous date(s).",
        type: "error",
        isMatch: isDateGreaterThanCurrent(toDate) === false,
      },
      {
        msz: "Self-schedule hours per week can not be more than 24.",
        type: "error",
        isMatch: isTotalHoursExceeding === false,
      },
    ];
    
    return checkValidations({
      validations: validations,
      setSnakeBarProps: setSnakeBarProps,
    });
  };

  const { mutate: createSelfRosterMutate, isLoading: isLoading2 } =
    useMutation(createSelfRoster, {
      onSuccess: (data, context, variables) =>
        onSuccessCreateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorUpdateRequest(data, context, variables),
    });
  const onSuccessCreateRequest = (data) => {
    if (data) {
      setSnakeBarProps({
        msz: "Self Roster Creation Successfull.",
        type: "success",
      });
      rosterRefetch()
      closeAddSelfRosterModal()
    }
  };
  // api error
  const onErrorUpdateRequest = (error) => {
    if (error) {
      setSnakeBarProps({
        msz: error?.response?.data?.status?.description,
        type: "error",
      });
    }
  };
  function formatDate(inputDateStr) {
    const inputDate = moment(inputDateStr, 'ddd MMM DD YYYY HH:mm:ss GMTZZ');
    const formattedDate = inputDate.format('YYYY-MM-DDTHH:mm:ss');
    return formattedDate;
  }
  const createSelfRosterFn = () => {
    if (validateSelfRoster()) {
      const payload = {
        startDate: formatDate(fromDate),
        endDate: formatDate(toDate),
        departmentId: department.departmentId,
        departmentName: department.departmentName,
        jobTitle: jobTitle.jobTitle,
        jobTitleId: jobTitle.jobTitleId,
        workLocationId: workLocation.workLocationId,
        workLocation: workLocation.locationName,
        comments,
        weeklyWorkDuration: weeklyWorkDuration,
        personId: loggedInUserDetails.employeeId
      };
      let res = createSelfRosterMutate(payload);
    }
  };
  return (
    <>
      <CustomDialog
        title="Self Roster"
        handleClose={closeAddSelfRosterModal}
        isLoading={isLoading}
        snakeBarProps={snakeBarProps}
        setSnakeBarProps={setSnakeBarProps}
        actions={{ onSubmit: createSelfRosterFn }}
      >
        <EvoDataForm formData={addInputsFormData} />
        <EvoDataGrid columns={tableColumns} rows={tableRows} />
      </CustomDialog>
    </>
  );
};
