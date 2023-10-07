import AddIcon from "@mui/icons-material/Add";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomPage } from "../../components/CustomPage";
import { EvoHBox } from "../../components/EvoBox";
import { EvoButton } from "../../components/EvoButton";
import EvoDataGrid from "../../components/EvoDataGrid";
import EvoDatePicker from "../../components/EvoDateTime/date";
import { CustomTextField } from "../../components/TextField";
import CustomSearch from "../../components/CustomSearch";
import { EvoDataForm } from "../../components/EvoDataForm";
import { useMutation } from "react-query";
import {
  useEmployeeTimeSheetReport,
  useTimeSheetReport,
} from "../../services/report";
import { useSelector } from "react-redux";

const onDeleted = () => {
  alert("Deleted");
};

const tableColumns = [
  { key: "employee_Number", name: "Employee Number", width: 200 },
  { key: "employee", name: "Employee", width: 200 },
  { key: "effective_Date", name: "Effective Date", width: 200 },
  { key: "sch_Start_Time", name: "Sch Start Time", width: 200 },
  { key: "sch_End_Time", name: "Sch End Time", width: 200 },
  { key: "sch_Hrs", name: "Sch Hrs", width: 200 },
  { key: "time_Start", name: "Time Start", width: 200 },
  { key: "time_End", name: "Time End", width: 200 },
  { key: "department", name: "Department", width: 200 },
  { key: "job", name: "Job", width: 200 },
  { key: "payCode", name: "Pay Code", width: 200 },
  { key: "hrs", name: "Hrs", width: 200 },
  { key: "comments", name: "Comments", width: 200 },
  { key: "status", name: "Status", width: 200 },
  { key: "pending_With", name: "Pending With", width: 200 },
  { key: "line_manager", name: "Line Manger", width: 200 },
  { key: "bussiness_Unit", name: "Bussiness Unit", width: 200 },
  { key: "legal_Entity", name: "Legal Entity", width: 200 },
  { key: "employee_Type", name: "Employee Type", width: 200 },
];

const searchColumns = [
  {
    key: "payCode",
    name: "Pay Code",
    width: 250,
  },
  {
    key: "status",
    name: "Status",
    width: 250,
  },
];

const Index = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [data, setData] = useState([]);
  const [dummy_data, setDummy_Data] = useState([]);
  const [dummyCopy, setDummyCopy] = useState([]);
  const { employeeId } = useSelector((state) => state?.commonReducer);
  useEffect(() => {
    const mappedData = data.map((item) => ({
      employee_Number: item.employeeNumber,
      employee: item.employee,
      effective_Date: item.effectiveDate,
      sch_Start_Time: item.schStartTime,
      sch_End_Time: item.schEndTime,
      sch_Hrs: item?.schHrs?.toString(),
      time_Start: item.timeStart,
      time_End: item.timeEnd,
      department: item.department,
      job: item.job,
      payCode: item.payCode,
      hrs: item.hrs.toString(),
      comments: item.comments || "",
      status: item.status,
      pending_With: item.pendingWith,
      line_manager: item.lineManager,
      bussiness_Unit: item.businessUnit,
      legal_Entity: item.legalEntity,
      employee_Type: item.employeeType,
    }));
    setDummy_Data(mappedData);
    setDummyCopy(mappedData);
  }, [data]);
  const formData = {
    gap: 3,
    labelWidth: 100,
    direction: "row",
    items: [
      {
        label: "Start Date",
        value: startDate,
        required: true,
        type: "date",
      },
      {
        label: "End Date",
        value: endDate,
        required: true,
        type: "date",
      },
    ],
  };
  const { mutate: timeSheetReportMutate, isLoading } = useMutation(
    useEmployeeTimeSheetReport,
    {
      onSuccess: (data) => {
        if (data.data) {
          setData(data.data.data.content);
        }
      },
      onError: (data) => {
        if (data && data.message) {
          setSnakeBarProps({
            msz: data.message,
            type: "error",
          });
        }
        if (data && data.response) {
          setSnakeBarProps({
            msz: data.response.data.status.description,
            type: "error",
          });
        }
      },
    }
  );
  function formatDate(inputDateStr) {
    const date = new Date(inputDateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const clickTimetableReport = () => {
    try {
      if (startDate > endDate) {
        setSnakeBarProps({
          type: "error",
          msz: "Start Date should be less than End Date",
        });
        return;
      } else {
        setSnakeBarProps(null);
        timeSheetReportMutate({
          personId: employeeId,
          pageNo: 0,
          pageSize: 1000,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        });
      }
    } catch (error) {}
  };

  return (
    <CustomPage
      title={props.title}
      isLoading={isLoading}
      snakeBarProps={snakeBarProps}
    >
      <EvoHBox gap={2}>
        <EvoHBox>
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: "bold",
            }}
          >
            <Box textAlign="right">*Start Date</Box>
          </Typography>

          <EvoDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => {
              return <CustomTextField {...params} />;
            }}
          />
        </EvoHBox>
        <EvoHBox>
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: "bold",
            }}
          >
            <Box textAlign="right">*End Date</Box>
          </Typography>

          <EvoDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </EvoHBox>
        <EvoButton
          btnText="Go"
          onClick={() => {
            clickTimetableReport();
          }}
          disabled={isLoading}
        />
      </EvoHBox>
      <>
        <CustomSearch
          columns={searchColumns}
          data={dummy_data}
          setFilterData={setDummyCopy}
        />
        <EvoDataGrid
          columns={tableColumns}
          exportOptions={{ fileName: props.title }}
          rows={dummyCopy}
          allowExport={true}
          HeaderComponent={() => (
            <EvoButton btnText="New" startIcon={<AddIcon />} />
          )}
        />
      </>
    </CustomPage>
  );
};

export default Index;
