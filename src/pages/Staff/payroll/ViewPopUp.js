import { Grid, Typography } from "@mui/material";
import moment from "moment";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../../components/CustomDialog";
import { saveViewData } from "../../../services/api";
import History from "./History";

import React, { useState } from "react";
import EmployeeDetail from "./EmployeeDetail";
import LineData from "./LineData";

const options = [
  { npayCodeName: "Regular Hrs", payCodeId: 3 },
  { npayCodeName: "Overtime 125", payCodeId: 12 },
  { npayCodeName: "TOIL", payCodeId: 14 },
  { npayCodeName: "Overtime 150", payCodeId: "20" },
  { npayCodeName: "Proximate - On Call", payCodeId: 22 },
  { npayCodeName: "Remote - On Call", payCodeId: 24 },
  { npayCodeName: "Telephone - On Call", payCodeId: 25 },
  { npayCodeName: "Re-Call - 125", payCodeId: 26 },
  { npayCodeName: "Re-Call - 150", payCodeId: 27 },
  { npayCodeName: "Speciality Overtime 125", payCodeId: 28 },
  { npayCodeName: "Lapse Hours", payCodeId: 29 },
  { npayCodeName: "Rest Day OT 125", payCodeId: 31 },
  { npayCodeName: "Rest Day OT 150", payCodeId: 32 },
  { npayCodeName: "Public Holiday (Rest Day)", payCodeId: 30 },
  { npayCodeName: "Project Hours", payCodeId: 37 },
];

const ViewPopUp = ({
  handleClose,
  onSuccess,
  editData: data,
  setErrorProps,
  selectedFilter,
}) => {
  const title =
    data !== undefined ? `Payroll Audit for ${data.fullName}` : "Payroll Audit";
  const editable = data?.status === "Draft" || data?.status === "RMI";

  const [saveList, setSaveList] = useState([]);

  const commonReducer = useSelector((state) => state.commonReducer);

  const convertDateToDateMonthYearFormat = (date) => {
    return moment(date, "YYYY-MM-DD").format("DD-MM-YY");
  };

  const monthNameFormat = (date) => {
    return moment(date, "YYYY-MM-DD").format("DD-MMM-YYYY");
  };

  const onSuccessSave = (data, context, variables) => {
    if (data) {
      setErrorProps({
        msz: "Succesfully saved data!",
        type: "success",
      });
    }

    handleClose();
  };

  const onErrorSave = (data, context, variables) => {};

  const { mutate: saveViewDataMutate, isLoading: saveViewDataLoading } =
    useMutation(saveViewData, {
      onSuccess: (data, context, variables) =>
        onSuccessSave(data, context, variables),
      onError: (data, context, variables) =>
        onErrorSave(data, context, variables),
    });

  const submitData = () => {
    saveViewDataMutate(saveList);
  };

  return (
    <CustomDialog
      title={title}
      handleClose={handleClose}
      actions={
        editable
          ? {
              isSaving: saveViewDataLoading,
              onSave: submitData,
              onCancel: handleClose,
            }
          : {
              onCancel: handleClose,
            }
      }
      open="true"
      maxWidth="lg"
    >
      <EmployeeDetail data={data} />

      <Grid style={{ margin: "20px 0" }}>
        <Typography
          style={{
            fontSize: "14px",
            fontFamily: "Inter",
            marginLeft: 10,
          }}
        >
          Approval History
        </Typography>
        <History data={data} />
      </Grid>

      <LineData data={data} setSaveList={setSaveList} />
    </CustomDialog>
  );
};

export default ViewPopUp;
