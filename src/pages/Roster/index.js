import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomPage } from "../../components/CustomPage";
import { Title } from "../../utils/Title";
import { EmployeeTable } from "./EmployeeTable";
import { SelectProfileCard } from "./SelectProfileCard";

export const Dashboard = () => {
  const employeeFilterHeader = ["Employee Number", "Employee"];

  const [projectDetailObj, setprojectDetailObj] = useState({});
  const [startDateRange, setStartDateRange] = useState(new Date());
  const [endDateRange, setEndDateRange] = useState(new Date());
  const [oriPagedata, setOriPagedata] = useState([]);
  const [pagedata, setPagedata] = useState([]);
  const [appStatus, setAppStatus] = useState("");
  const [employeeupdateData, setEmployeeupdateData] = useState([]);
  const [employeeFilter, setEmployeeFilter] = useState(false);

  const commonReducer = useSelector((state) => state.commonReducer);
  const pp = () => {
    Title({
      title: "This is my title only shown on this page",
      metaDescription: "With some meta description",
    });
  };

  pp();
  useEffect(() => {
    if (employeeupdateData.length > 0) {
      let localArr = oriPagedata?.filter((item) =>
        employeeupdateData.includes(item.employeeNumber)
      );
      setPagedata(localArr);
    } else {
      setPagedata([...oriPagedata]);
    }
  }, [employeeupdateData, oriPagedata]);

  return (
    <CustomPage
      title={props.title}
      isLoading={isLoading}
      profileSelector={{ managerFlag: true }}
    >
      <Grid container>
        <Grid item xs="12">
          <Box
            style={{
              border: "1px solid #EDEDED",
              margin: "10px",
            }}
          >
            <SelectProfileCard
              setprojectDetailObj={setprojectDetailObj}
              projectDetailObj={projectDetailObj}
              setStartDateRange={setStartDateRange}
              startDateRange={startDateRange}
              setEndDateRange={setEndDateRange}
              endDateRange={endDateRange}
              pagedata={pagedata}
              setAppStatus={setAppStatus}
              oriPagedata={oriPagedata}
              employeeupdateData={employeeupdateData}
              setEmployeeupdateData={setEmployeeupdateData}
              setEmployeeFilter={setEmployeeFilter}
              employeeFilter={employeeFilter}
            />
            {Object.keys(commonReducer.selectedProjectObj).length > 0 && (
              <EmployeeTable
                setPagedata={setPagedata}
                setOriPagedata={setOriPagedata}
                pagedata={pagedata}
                appStatus={appStatus}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </CustomPage>
  );
};

const useStyles = makeStyles(() => ({
  maincontainer: {
    backgroundColor: "#DBDBDB",
  },
  grid1: {
    height: "100vh",
  },
  grid2: {
    backgroundColor: "#F9F9F9",
  },
  grid3: {
    padding: "10px",
    backgroundColor: "#FFF",
  },
  grid4: {
    cursor: "pointer",
    verticalAlign: "middle",
  },
  grid5: {
    color: "#124590",
    verticalAlign: "middle",
  },
}));
