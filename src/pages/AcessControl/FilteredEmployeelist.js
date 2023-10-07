import React from "react";
import { CustomDialog } from "../../components/CustomDialog";
import { Box, Grid, Typography } from "@mui/material";
import { EvoButton } from "../../components/EvoButton";
import { CSVLink } from "react-csv";
import { useQuery } from "react-query";

import { useEffect } from "react";
import { useState } from "react";
import { useScheduleEmpData } from "../../services/accesscontrol";
import EvoDataGrid from "../../components/EvoDataGrid";
import { DataTable } from "../../components/DataTable";

const FilteredEmployeelist = (props) => {
  const { toggleHandler, editData } = props;
  console.log(editData, "editData");
  // const [filteredData, setFilteredData] = useState();
  const handleClose = () => {
    toggleHandler(false);
  };

  // const { data: getFilteredData } = useQuery(
  //   ["getFilteredData", editData?.profileId],
  //   () => getScheduleEmpData({ profileId: editData?.profileId }),
  //   {
  //     enabled: true,
  //     retry: false,
  //   }
  // );

  // useEffect(() => {
  //   if (getFilteredData) {
  //     setFilteredData(getFilteredData?.data?.data);
  //   }
  // }, [getFilteredData]);
  const { data: filteredData, isLoading } = useScheduleEmpData({
    profileId: editData?.profileId,
  });

  const tableColumns = [
    { key: "employeeNumber", name: "Employee Number", width: 150 },
    { key: "personName", name: "Employee", width: 195 },
    { key: "emailAddress", name: "Email Address", width: 210 },
    { key: "departmentName", name: "Department", width: 195 },
    { key: "jobTitle", name: "Job", width: 195 },
    { key: "locationName", name: "Work Location", width: 195 },
  ];
  const tableRows = filteredData || [];
  return (
    <CustomDialog
      maxWidth="xl"
      title="Verified Employee List"
      open={true}
      handleClose={handleClose}
      isLoading={isLoading}
    >
      <Grid>
        <Box>
          <EvoButton btnText="Export To excel">
            <CSVLink data={filteredData} separator={";"}>
              Export To excel
            </CSVLink>
          </EvoButton>
        </Box>

        <EvoDataGrid columns={tableColumns} rows={tableRows} />
      </Grid>
    </CustomDialog>
  );
};

export default FilteredEmployeelist;
