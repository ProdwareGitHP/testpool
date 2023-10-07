import AddIcon from "@mui/icons-material/Add";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { CustomPage } from "../../components/CustomPage";
import { EvoHBox } from "../../components/EvoBox";
import { EvoButton } from "../../components/EvoButton";
import EvoDataGrid from "../../components/EvoDataGrid";
import EvoDatePicker from "../../components/EvoDateTime/date";
import { CustomTextField } from "../../components/TextField";
import { SearchTextField } from "../../components/TextField/search";
import CustomSearch from "../../components/CustomSearch";
import { useMutation } from "react-query";
import { useTimeSheetReport } from "../../services/report";

const list = ["Not Submitted", "Pending Approval", "Approved"];

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
  { key: "summitted_By", name: "Summitted By", width: 200 },
  { key: "summitted_On", name: "Summited On", width: 200 },
  { key: "status", name: "Status", width: 200 },
  { key: "pending_With", name: "Pending With", width: 200 },
  { key: "businessUnit", name: "Bussiness Unit", width: 200 },
  { key: "legalEntity", name: "Legal Entity", width: 200 },
  { key: "employee_Type", name: "Employee Type", width: 200 },
];

const Index = (props) => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [data, setData] = useState([]);
  const [dummy_data, setDummy_Data] = useState([]);
  const [dummyCopy,setDummyCopy]=useState([]);
  const handleSearchChange = (event) => {
    setLegalEntity(event.target.value);
  };
  const [legalEntity, setLegalEntity] = useState("");
  const [status, setStatus] = useState(list);
  const [errorProps, setErrorProps] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
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
      summitted_By: item.submittedBy,
      summitted_On: item.submittedOn,
      job: item.job,
      payCode: item.payCode,
      hrs: item?.hrs?.toString(),
      comments: item.comments || "",
      status: item.status,
      pending_With: item.pendingWith,
      line_manager: item.line_manager,
      businessUnit: item.businessUnit,
      legalEntity: item.legalEntity,
      employee_Type: item.employeeType,
    }));
    setDummy_Data(mappedData);
    setDummyCopy(mappedData);
  }, [data])
  const searchHandler = () => {
    if (startDate > endDate) {
      setErrorProps({
        type: "error",
        msz: "Start Date should be less than End Date",
      });
      return;
    }
    if (!legalEntity) {
      setErrorProps({
        type: "error",
        msz: "Legal Entity is required",
      });
      return;
    }
  };

  const searchColumns = [
    {
      key: "legalEntity",
      name: "Legal Entity",
    },
    {
      key: "businessUnit",
      name: "Business Unit",
      width: 250,
    },
    {
      key: "employee",
      name: "Employee",
      width: 250,
    },
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
  const { mutate: timeSheetReportMutate, isLoading } = useMutation(useTimeSheetReport, {
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
  });
  function formatDate(inputDateStr) {
    const date = new Date(inputDateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
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
      }else{
        setSnakeBarProps(null);
        timeSheetReportMutate({
          "pageNo": 0,
          "pageSize": 1000,
          "startDate": formatDate(startDate),
          "endDate": formatDate(endDate)
        });
      }
    } catch (error) {

    }
  };
  return (
    <CustomPage title={props.title} isLoading={isLoading}
      snakeBarProps={snakeBarProps}>
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
        <EvoButton btnText="Go" onClick={() => { clickTimetableReport(); }} disabled={isLoading} />
      </EvoHBox>

      <>
        <CustomSearch columns={searchColumns} data={dummy_data} setFilterData={setDummyCopy}/>
        <EvoDataGrid
          columns={tableColumns}
          rows={dummyCopy}
          exportOptions={{ fileName: props.title }}
          HeaderComponent={() => (
            <EvoButton
              // onClick={openNewModal}
              btnText="New"
              startIcon={<AddIcon />}
            />
          )}
        />
      </>
    </CustomPage>
  );
};

export default Index;

const useStyles = makeStyles(() => ({
  addIcon: {
    color: "#60AA60",
    fontWeight: "bold",
    fontSize: "16px",
  },
}));
