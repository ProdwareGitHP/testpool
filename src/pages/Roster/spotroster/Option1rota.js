import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import EvoDatePicker from "../../components/EvoDateTime/date";

import { EvoHBox, EvoVBox } from "../../../components/EvoBox";
import { EvoDataForm } from "../../../components/EvoDataForm";
import EvoDataGrid from "../../../components/EvoDataGrid";
import getTemplate from "../../../components/getTemplate";
import { useGetWorkRotationDet } from "../../../services/roster";
import { dateConverter } from "../../../utils/commonService";
import CustomStaffPage from "./CustomStaffPage";
import { RotaContext } from "../../../components/CustomContent/context";

const workPlanColumns = [
  {
    key: "workPlan",
    name: "Work Plan",
    width: 250,
  },
  {
    key: "sequence",
    name: "Sequence",
    width: 100,
    type: "number",
  },
  {
    key: "iteration",
    name: "Iteration",
    width: 100,
    type: "number",
  },
  {
    key: "sun",
    name: "Sun",
    width: 80,
  },
  {
    key: "mon",
    name: "Mon",
    width: 80,
  },
  {
    key: "tue",
    name: "Tue",
    width: 80,
  },
  {
    key: "wed",
    name: "Wed",
    width: 80,
  },
  {
    key: "thu",
    name: "Thu",
    width: 80,
  },
  {
    key: "fri",
    name: "Fri",
    width: 80,
  },
  {
    key: "sat",
    name: "Sat",
    width: 80,
  },
];

const Option1rota = (props) => {
  const {
    selectedRows,
    setSelectedRows,
    workRotation,
    setWorkRotation,
    setStartDate,
    startDate,
  } = useContext(RotaContext);

  const { data: workDet } = useGetWorkRotationDet({
    workRotationId: workRotation?.workRotationId,
  });
  useEffect(() => {
    if (workRotation) {
      setStartDate(new Date(workRotation.startDate));
    }
  }, [workRotation]);

  const formData = {
    gap: 3,
    labelWidth: "120px",
    items: [
      {
        label: "Work Rotation",
        value: workRotation,
        required: true,
        type: "lookup",
        editorProps: {
          selectItem: setWorkRotation,
          template: getTemplate("WORKROTATION_TEMPLATE"),
          columnKey: "workRotationName",
        },
      },
      {
        label: "Rota Start Date",
        value: startDate,
        required: true,
        type: "date",
        onChange: (date) => setStartDate(date),
        styles: { width: 130, justifyContent: "end" },
      },
    ],
  };

  return (
    <>
      <EvoHBox divider alignItems="start">
        <EvoVBox style={{ width: "30%" }}>
          <EvoDataForm formData={formData} />
        </EvoVBox>
        <EvoVBox style={{ width: "65%" }}>
          <EvoDataGrid columns={workPlanColumns} rows={workDet} />
        </EvoVBox>
      </EvoHBox>
      <CustomStaffPage
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
      />
    </>
  );
};

export default Option1rota;
