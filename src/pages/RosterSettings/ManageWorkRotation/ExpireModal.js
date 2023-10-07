import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import EvoDatePicker from "../../../components/EvoDateTime/date";
import { CustomTextField } from "../../../components/TextField";
import { EvoButton } from "../../../components/EvoButton";
import { CustomDialog } from "../../../components/CustomDialog";
import { expiryDate, useExpiryDate } from "../../../services/api";
import { useMutation } from "react-query";
import moment from "moment";
import { EvoDataForm } from "../../../components/EvoDataForm";
import { checkValidations } from "../../../utils/commonService";

const ExpireModal = (props) => {
  const {
    handleClose,
    editData,
    refetchWorkDurationList,
    setSnakeBarPropsLandingPage,
  } = props;
  const [snakeBarPropsExpirePage, setSnakeBarPropsExpirePage] = useState({});
  const [expiryDate, setExpiryDate] = useState(null);
  const { mutate: expiryDateMutate, isLoading } = useMutation(useExpiryDate, {
    onSuccess: (data, context, variables) =>
      onSuccessExpiryDateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorExpiryDateRequest(data, context, variables),
  });

  const onSuccessExpiryDateRequest = (data) => {
    if (data) {
      setSnakeBarPropsLandingPage({
        msz: "Work Rotation Expired.",
        type: "success",
      });
      handleClose();
      refetchWorkDurationList();
    }
  };

  const onErrorExpiryDateRequest = (error) => {
    if (error) {
      setSnakeBarPropsLandingPage({
        msz: error?.response?.data?.status?.description,
        type: "error",
      });
      handleClose();
      refetchWorkDurationList();
    }
  };
  const ExpiryValidations = [
    {
      msz: "Please enter Expiry date!",
      type: "error",
      isMatch: expiryDate === null,
    },
  ];
  const validateOnSave = () => {
    return checkValidations({
      validations: ExpiryValidations,
      setSnakeBarProps: setSnakeBarPropsExpirePage,
    });
  };
  const saveExpiryDate = () => {
    if (validateOnSave()) {
      let pdata = {
        workRotationId: editData?.workRotationId,
        expiryDate: moment(expiryDate).format("DD-MMM-YYYY"),
      };
      expiryDateMutate(pdata);
    }
  };

  const formData = {
    gap: 2,
    labelWidth: 100,
    direction: "column",
    items: [
      {
        label: "Expiry Date",
        value: expiryDate,
        type: "date",
        onChange: setExpiryDate,
        width: 200,
      },
    ],
  };
  return (
    <CustomDialog
      maxWidth="s"
      width="lg"
      title="Expire Work Rotation"
      open={true}
      handleClose={handleClose}
      isLoading={isLoading}
      snakeBarProps={snakeBarPropsExpirePage}
      setSnakeBarProps={setSnakeBarPropsExpirePage}
      actions={{ onSave: saveExpiryDate }}
    >
      <Grid
        container
        style={{
          justifyContent: "center",
          // height: 150,
        }}
      >
        <Box mb={2}>
          <EvoDataForm formData={formData} />
        </Box>
      </Grid>
    </CustomDialog>
  );
};

export default ExpireModal;
