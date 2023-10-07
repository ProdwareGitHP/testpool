import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../../components/CustomDialog";
import { checkValidations, dateConverter } from "../../../utils/commonService";
import { EvoVBox } from "../../../components/EvoBox";
import { EvoDataForm } from "../../../components/EvoDataForm";

const filterByViewBy = [
  { id: 1, label: " ", value: " " },
  { id: 2, label: "Data Entry", value: "Data Entry" },
  { id: 3, label: "Duty Change", value: "Duty Change" },
  {
    id: 4,
    label: "Not return back after leave",
    value: "Not return back after leave",
  },
  {
    id: 5,
    label: "Other",
    value: "Other",
  },
];
const DeleteModal = (props) => {
  const {
    setStatus1,
    DeletePersonData,
    checked,
    setSnakeBarProps,
    isLoading,
    isEmptyShiftValues,
    type,
    resetChecked,
  } = props;
  const commonReducer = useSelector((state) => state.commonReducer);
  const [snakeBarDeleteRosterProps, setSnakeBarDeleteRosterProps] = useState(
    {}
  );

  const [reason, setReason] = useState();
  const [fromDate, setFromDate] = useState(new Date(commonReducer?.startDate));
  const [toDate, setToDate] = useState(new Date(commonReducer?.endDate));
  const [comment, setComment] = useState("");
  const [isLoading1, setIsLoading1] = useState(false);
  const handleClose1 = () => {
    setStatus1(0);
    if (resetChecked) {
      resetChecked();
    }
  };
  useEffect(() => {
    if (type === "single") {
      setFromDate(new Date(commonReducer.effectiveDate));
      setToDate(new Date(commonReducer.effectiveDate));
    }
  }, [type]);
  const validateOnDelete = () => {
    var validations = [];
    if (!(type === "single")) {
      validations.push({
        msz: "Enter the From Date!",
        type: "error",
        isMatch: fromDate === "",
      });
      validations.push({
        msz: "Enter the To Date!",
        type: "error",
        isMatch: toDate === "",
      });
    }
    validations.push({
      msz: "Select a Reason or Enter a comment!",
      type: "error",
      isMatch: reason?.value === " " && comment === "",
    });

    var res = checkValidations({
      validations: validations,
      setSnakeBarProps: setSnakeBarDeleteRosterProps,
    });
    return res;
  };

  const deletePerson = () => {
    if (validateOnDelete()) {
      if (!isEmptyShiftValues) {
        setIsLoading1(true);
        setTimeout(() => {
          setIsLoading1(false);
          handleClose1();
          setSnakeBarProps({
            msz: "Nothing to delete or roster(s) are in correction.",
            type: "info",
          });
        }, [2000]);
        return "";
      }

      let pdata = {};

      pdata = {
        userId: commonReducer?.userId,
        comments: comment,
        fromDate: dateConverter(fromDate),
        toDate: dateConverter(toDate),
        employeeNumbers: checked,
        reason: reason?.value,
      };

      DeletePersonData(pdata);
    }
  };

  var formData = {
    gap: 2,
    labelWidth: 90,
    items: [
      {
        label: "From Date",
        value: fromDate,
        required: true,
        type: "date",
        onChange: (date) => setFromDate(date),
      },
      {
        label: "To Date",
        value: toDate,
        required: true,
        type: "date",
        onChange: (date) => setToDate(date),
      },
      {
        label: "Reason",
        required: true,
        type: "dropdown",
        editorProps: {
          data: filterByViewBy,
          caller: setReason,
          width: 220,
          selectIndex: 0,
          getoptionlabelkey: "label",
        },
      },
      {
        label: "Comment",
        value: comment,
        onChange: (e) => {
          setComment(e.target.value);
        },
      },
    ],
  };
  if (type === "single") {
    formData.items.splice(0, 2);
  }
  return (
    <>
      <CustomDialog
        maxWidth="md"
        title="Delete"
        open={true}
        isLoading={isLoading || isLoading1}
        snakeBarProps={snakeBarDeleteRosterProps}
        setSnakeBarProps={setSnakeBarDeleteRosterProps}
        handleClose={handleClose1}
        actions={{ onDelete: deletePerson, onCancel: handleClose1 }}
      >
        <EvoVBox>
          <Typography sx={{ fontSize: "14px" }}>
            Are you sure you want to delete ?
          </Typography>
          <EvoDataForm formData={formData} />
        </EvoVBox>
      </CustomDialog>
    </>
  );
};

export default DeleteModal;
