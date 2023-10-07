import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useMutation } from "react-query";
import { CustomDialog } from "../../../components/CustomDialog";
import { DeleteRosterProfile } from "../../../services/api";

const DeleteRoster = (props) => {
  const {
    toggleHandler,
    personRosterId,
    setSnakeBarProps,
    setStatus1,
    getEmployeeList,
  } = props;

  const handleCloseDelete = () => {
    toggleHandler(false);
  };

  const { mutate: deleteRosterProfileMutate } = useMutation(
    DeleteRosterProfile,
    {
      onSuccess: (data, context, variables) =>
        deleteRosterProfileSuccess(data, context, variables),
      onError: (data, context, variables) =>
        deleteRosterProfileError(data, context, variables),
    }
  );

  const deleteRosterProfileSuccess = (data) => {
    setSnakeBarProps({
      msz: "Information",
      details: [`${data.data.data}`],
      type: "info",
    });
    setStatus1(0);
    getEmployeeList();
  };

  const deleteRosterProfileError = (data) => {
    setSnakeBarProps({
      msz: "Error",
      details: [`${data.message}`],
      type: "error",
    });
  };

  const handleDeleteRosterProfile = () => {
    var raw = JSON.stringify([personRosterId]);
    deleteRosterProfileMutate(raw);
    toggleHandler(false);
  };

  return (
    <CustomDialog
      maxWidth="sm"
      title="Confirm Delete All Shift(s)"
      open="true"
      handleClose={handleCloseDelete}
      maxHeight="50vh"
      actions={{ onDelete: handleDeleteRosterProfile }}
    >
      <Grid container>
        <Grid item>
          <Box style={{ marginLeft: "50px" }}>
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "bold",
              }}
            >
              Are you sure want to delete?
            </Typography>
          </Box>

          <Grid container style={{ marginTop: "20px", height: "10vh" }}>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "60px",
                height: "20%",
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Reason
              </Typography>
              {/* <Autocomplete
                style={{ marginLeft: "10px" }}
                disableClearable
                id="free-solo-demo"
                options={Reason}
                ListboxProps={{
                  style: {
                    maxHeight: 120,
                    fontSize: "14px",
                    fontFamily: "Inter",
                  },
                }}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} />}
              /> */}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        style={{
          display: "flex",
          justifyContent: "flex-end ",
          marginTop: "20px",
        }}
      >
        {/* <EvoButton
          btnText="Confirm"
          onClick={handleDeleteRosterProfile}
          btnClass={{ backgroundColor: "#124590", color: "#fff" }}
        /> */}
      </Grid>
    </CustomDialog>
  );
};

export default DeleteRoster;
const Reason = [
  { label: "Data Entry" },
  { label: "Duty Changed" },
  { label: "Not return back after leave" },
  { label: "other" },
];
