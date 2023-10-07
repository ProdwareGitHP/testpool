import React from "react";
import EvoDataGrid from "../../../components/EvoDataGrid";

const tableColumns = [
  { key: "fullName", name: "Employee", width: 230, type: "person" },
  { key: "jobTitle", name: "Job Title", width: 230 },
  { key: "locationName", name: "Location", width: 230 },
  { key: "businessUnitName", name: "BusinessUnit", width: 230 },
  { key: "legalEntity", name: "LegalEntity", width: 230 },
];

const EmployeeDetail = ({ data }) => {
  return <EvoDataGrid columns={tableColumns} rows={[data]} />;
};

export default EmployeeDetail;
