import React, { useContext, useEffect } from "react";
import EvoDataGrid from "../../../components/EvoDataGrid";
import { ValidateRostersContext } from "../../../components/CustomContent/context";
import { Box, Typography } from "@mui/material";
import LegendValidate from "../../Roster/spotroster/LegendValidate.json";
import { EvoHBox, EvoHNavBox } from "../../../components/EvoBox";
import EvoLegends from "../../../components/EvoLegends";

const JobValidation = () => {
  const { columns, rowData } = useContext(ValidateRostersContext);

  const AddUserHeaderComponent = () => (
    <EvoHNavBox Right={<EvoLegends statuses={LegendValidate} />} />
  );
  return (
    <>
      <EvoDataGrid
        columns={columns}
        rows={rowData}
        exportOptions={{ fileName: "JobAnalytic" }}
        HeaderComponent={AddUserHeaderComponent}
      />
    </>
  );
  //;
};

export default JobValidation;
