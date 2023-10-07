import { Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";

import EvoDataGrid from "../../../components/EvoDataGrid";
import SubmitButton from "./SubmitButton";
import ApprLegends from "./LegendsAppr.json";
import getTableColumns from "./tableColumns";
import EvoLegends from "../../../components/EvoLegends";

export const EmployeeTable = (props) => {
  const { apprStatus, oriPagedata, isLoading, refetchList } = props;
  const { dayArr } = useSelector((state) => state.commonReducer);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const resetSelectedRows = () => {
    setSelectedRows(new Set());
  };

  const HeaderComponent = () => (
    <Grid container>
      <Grid item xs={3}>
        <SubmitButton
          refetchList={refetchList}
          apprStatus={apprStatus}
          selectedRows={selectedRows}
          resetSelectedRows={resetSelectedRows}
          submitting={{}}
        />
      </Grid>
      <Grid item xs={9} textAlign="right">
        <EvoLegends statuses={ApprLegends} />
      </Grid>
    </Grid>
  );

  return (
    <EvoDataGrid
      headerRowHeight={70}
      height={500}
      filterId={"personId"}
      columns={getTableColumns(dayArr, oriPagedata,refetchList)}      
      rows={oriPagedata}
      isLoading={isLoading}
      HeaderComponent={HeaderComponent}
      addSelectColumn={!apprStatus}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      exportOptions={{ fileName: "timesheets" }}
    />
  );
};
