import AddIcon from "@mui/icons-material/Add";

import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { CustomPage } from "../../components/CustomPage";
import { EvoHBox } from "../../components/EvoBox";
import { EvoButton } from "../../components/EvoButton";
import EvoDataGrid from "../../components/EvoDataGrid";
import EvoDatePicker from "../../components/EvoDateTime/date";
import { SearchTextField } from "../../components/TextField/search";
import { Department } from "../../services/api";
import CustomSearch from "../../components/CustomSearch";
import { EvoDataForm } from "../../components/EvoDataForm";
import { useDepartment, useRequestStatus } from "../../services/report";
import { CustomTextField } from "../../components/TextField";

const tableColumns = [
  {
    key: "request_id",
    name: "Request Id",
    width: 200,
  },
  { key: "employee_no", name: "Employee Number", width: 200 },
  { key: "employee", name: "Employee", width: 200 },
  { key: "department", name: "Department", width: 200 },
  { key: "job_title", name: "Job Tilte", width: 200 },
  { key: "businessUnit", name: "Bussiness Unit", width: 200 },
  { key: "legalEntity", name: "Legal Entity", width: 200 },
  { key: "employee_types", name: "Employee Types", width: 200 },
  { key: "request_type", name: "Request Type", width: 200 },
  { key: "start_date", name: "Start Date", width: 200 },
  { key: "end_date", name: "End Date", width: 200 },
  { key: "start_time", name: "Start Time", width: 200 },
  { key: "end_time", name: "End Time", width: 200 },
  { key: "requested_on", name: "requested On", width: 200 },
  { key: "requested_by", name: "Requested By", width: 200 },
  { key: "status", name: "Status", width: 200 },
];

const searchColumns = [
  {
    key: "employee",
    name: "Employee",
    width: 250,
  },
  {
    key: "department",
    name: "Department",
    width: 250,
  },
  {
    key: "businessUnit",
    name: "Business Unit",
    width: 250,
  },

  {
    key: "legalEntity",
    name: "Legal Entity",
  },

  {
    key: "status",
    name: "Status",
    width: 250,
  },
];

const status = ["Submitted", "Approved", "Rejected"];

const Index = (props) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [data, setData] = useState([]);
  const [dummy_data, setDummy_Data] = useState([]);
  const [dummyCopy, setDummyCopy] = useState([]);
  const [expanded, setExpanded] = useState("panel1");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [statusList, setStatusList] = useState(status);
  const [value, setValue] = useState(statusList[0]);
  const [departmentArr, setDepartmentArr] = useState([]);
  const [department, setDepartment] = useState(false);
  const [depValue, setDepValue] = useState(-1);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // const { data: getAllDepartment } = useQuery(
  //   ["getDepartment"],
  //   () => Department(),
  //   { enabled: true, retry: false }
  // );

  useEffect(() => {
    const mappedData = data.map((item) => ({
      request_id: item.requestId,
      employee_no: item.employeeNumber,
      employee: item.employee,
      department: item.department,
      job_title: item.jobTitle,
      businessUnit: item.businessUnit,
      legalEntity: item.legalEntity,
      employee_types: item.employeeTypes,
      request_type: item.requestType,
      start_date: item.startDate,
      end_date: item.endDate,
      start_time: item.startTime,
      end_time: item.endTime,
      requested_on: item.requestedOn,
      requested_by: item.requestedBy,
      status: item.status,
    }));
    setDummy_Data(mappedData);
    setDummyCopy(mappedData);
  }, [data])

  // const { data: getAllDepartment } = useDepartment();

  // useEffect(() => {
  //   if (getAllDepartment) {
  //     setDepartmentArr(getAllDepartment?.data?.data);
  //     setIsLoading(false);
  //   }
  // }, [getAllDepartment]);

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
  const { mutate: RequestStatusMutate, isLoading } = useMutation(useRequestStatus, {
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
      } else {
        setSnakeBarProps(null);
        RequestStatusMutate({
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
    <>
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
            exportOptions={{ fileName: props.title }}
            columns={tableColumns}
            rows={dummyCopy}
            HeaderComponent={() => (
              <EvoButton btnText="New" startIcon={<AddIcon />} />
            )}
          />
        </>
      </CustomPage>
    </>
  );
};

export default Index;

const useStyles = makeStyles(() => ({
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    width: "100%",
    margin: "5px",
    maxHeight: "350px",
    minHeight: "fit-content",
  },
  innermainbox: {
    display: "inline-block",
    width: "100%",
    verticalAlign: "top",
  },
  innerboxworkduration: {
    display: "flex !important",
    padding: "5px 0px",
    width: "100vw",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    position: "fixed",
    overflow: "scroll",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  employee: {
    display: "flex",
    alignItems: "center",
    width: "15%",
  },
  common: {
    display: "flex",
    alignItems: "center",
    width: "10%",
  },
  selectbutton: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    paddingRight: "10px",
  },
  addIcon: {
    color: "#60AA60",
    fontWeight: "bold",
    fontSize: "16px",
  },
}));
