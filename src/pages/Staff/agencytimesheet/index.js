import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EmployeeTable } from "./EmployeeTable";
import { SelectProfileCard } from "./SelectProfileCard";

import { CustomPage } from "../CustomPage";

const AgencyTimesheet = (props) => {
  // document.title="Dashboard"
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(props.title);
  }, []);
  document.title = title;
  const classes = useStyles();
  const employeeFilterHeader = ["Employee Number", "Employee"];

  const [projectDetailObj, setprojectDetailObj] = useState({});
  const [startDateRange, setStartDateRange] = useState(new Date());
  const [endDateRange, setEndDateRange] = useState(new Date());
  const [oriPagedata, setOriPagedata] = useState([]);
  const [pagedata, setPagedata] = useState([]);
  const [appStatus, setAppStatus] = useState("");
  const [employeeupdateData, setEmployeeupdateData] = useState([]);
  const [employeeFilter, setEmployeeFilter] = useState(false);
  const [headerArr, setHeaderArr] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);

  const commonReducer = useSelector((state) => state.commonReducer);

  useEffect(() => {
    console.log("employeeupdateData", employeeupdateData);
    console.log("oriPagedata", oriPagedata);

    if (employeeupdateData.length > 0) {
      var localArr = oriPagedata?.filter((item) =>
        employeeupdateData.includes(item.employeeNumber)
      );
      setPagedata(localArr);
    } else {
      setPagedata([...oriPagedata]);
    }
  }, [employeeupdateData, oriPagedata]);

  return (
    <>
      <CustomPage
        title={props.title}
        isLoading={isLoading}
        profileSelector={{ managerFlag: true }}
      >
        <Grid container className={classes.maincontainer}>
          <Grid item xs="12">
            <Box>
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
                headerArr={headerArr}
                setHeaderArr={setHeaderArr}
                setParentFilter={setFilter}
                parentfilter={filter}
              />
              {Object.keys(commonReducer.selectedProjectObjTeam).length > 0 && (
                <EmployeeTable
                  setPagedata={setPagedata}
                  setOriPagedata={setOriPagedata}
                  pagedata={pagedata}
                  appStatus={appStatus}
                  isLoading={isLoading}
                  headerArr={headerArr}
                  setHeaderArr={setHeaderArr}
                  handleLoading={setLoading}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </CustomPage>
    </>
  );
};

export default AgencyTimesheet;

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
