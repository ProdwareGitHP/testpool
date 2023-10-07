import AddIcon from "@mui/icons-material/Add";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomPage } from "../../components/CustomPage";
import { EvoHBox } from "../../components/EvoBox";
import { EvoButton } from "../../components/EvoButton";
import EvoDataGrid from "../../components/EvoDataGrid";
import EvoDatePicker from "../../components/EvoDateTime/date";
import { CustomTextField } from "../../components/TextField";
import { SearchTextField } from "../../components/TextField/search";
import CustomSearch from "../../components/CustomSearch";
import { EvoDataForm } from "../../components/EvoDataForm";

const statusOption = ["Draft", "Pending Approval", "Un Published", "Published"];

const dummy_data = [
  {
    person: "In Muns(103982)",
    department: "Logistics",
    jobTitle: "Data entry operator",
    legalEntity: "Patrick Air Condition",
    businessUnit: "Western Consumer BU",
  },
  {
    person: "Launa Torez(44)",
    department: "Maintainence",
    jobTitle: "HD-Driver",
    legalEntity: "Patrick Central Air Condition",
    businessUnit: "Western Applied BU",
  },
  {
    person: "Bea lida(111024)",
    department: "Engineering",
    jobTitle: "Field Service Engineer",
    legalEntity: "Patrick Central Air Condition",
    businessUnit: "Western Applied BU",
  },
  {
    person: "Dona Lamer(301)",
    department: "Maintainence",
    jobTitle: "LD-Driver",
    legalEntity: "Patrick Central Air Condition",
    businessUnit: "Western Applied BU",
  },
  {
    person: "In Muns(103982)",
    department: "Logistics",
    jobTitle: "Data entry operator",
    legalEntity: "Patrick Air Condition",
    businessUnit: "Western Consumer BU",
  },
  {
    person: "In Muns(103982)",
    department: "Logistics",
    jobTitle: "Data entry operator",
    legalEntity: "Patrick Air Condition",
    businessUnit: "Western Consumer BU",
  },
  {
    person: "In Muns(103982)",
    department: "Logistics",
    jobTitle: "Data entry operator",
    legalEntity: "Patrick Air Condition",
    businessUnit: "Western Consumer BU",
  },
  {
    person: "In Muns(103982)",
    department: "Logistics",
    jobTitle: "Data entry operator",
    legalEntity: "Patrick Air Condition",
    businessUnit: "Western Consumer BU",
  },
  {
    person: "In Muns(103982)",
    department: "Logistics",
    jobTitle: "Data entry operator",
    legalEntity: "Patrick Air Condition",
    businessUnit: "Western Consumer BU",
  },
  {
    person: "In Muns(103982)",
    department: "Logistics",
    jobTitle: "Data entry operator",
    legalEntity: "Patrick Air Condition",
    businessUnit: "Western Consumer BU",
  },
];

const tableColumns = [
  {
    key: "person",
    name: "Person",
    width: 200,
    // renderCell: (props) => {
    //   return (
    //     <EditIcon
    //       className={classes.EditIcon}
    //       onClick={() => openWorkPlanModal(props.row)}
    //     />
    //   );
    // },
  },
  { key: "department", name: "Department", width: 200 },
  { key: "jobTitle", name: "JobTitle", width: 200 },
  { key: "legalEntity", name: "LegalEntity", width: 200 },
  { key: "businessUnit", name: "BusinessUnit", width: 200 },
  { key: "total Sch Hrs", name: "Total Sch Hrs", width: 200 },
];

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
    key: "status",
    name: "Status",
    width: 250,
  },
];

const Index = (props) => {
  const [statusOptions, setStatusOptions] = useState(statusOption);
  const [reportData, setReportData] = useState(dummy_data);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

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

  return (
    <CustomPage title={props.title} isLoading={isLoading}>
      <EvoHBox gap={2}>
        <EvoDataForm formData={formData} />
        <EvoButton btnText="Go" />
      </EvoHBox>
 
      <>
        <CustomSearch columns={searchColumns} data={dummy_data} />

        <EvoDataGrid
          columns={tableColumns}
          rows={dummy_data}
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
