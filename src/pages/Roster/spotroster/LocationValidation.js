import React, { useContext } from "react";
import EvoDataGrid from "../../../components/EvoDataGrid";
import { ValidateRostersContext } from "../../../components/CustomContent/context";
import { EvoHNavBox } from "../../../components/EvoBox";
import EvoLegends from "../../../components/EvoLegends";
import LegendValidate from "../../Roster/spotroster/LegendValidate.json";

const LocationValidation = () => {
  const { columns, rowData } = useContext(ValidateRostersContext);
  const AddUserHeaderComponent = () => (
    <EvoHNavBox Right={<EvoLegends statuses={LegendValidate} />} />
  );
  return (
    <>
      <EvoDataGrid
        columns={columns}
        rows={rowData}
        exportOptions={{ fileName: "LocationAnalytic" }}
        HeaderComponent={AddUserHeaderComponent}
      />
    </>
  );
};

export default LocationValidation;
