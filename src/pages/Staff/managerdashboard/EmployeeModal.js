import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { CustomDialog } from "../../../components/CustomDialog";
import { EvoButton } from "../../../components/EvoButton";
import ProgressLoader from "../../RosterSettings/manageWorkDuration/Loader";
import { Grid, Typography, Box } from "@mui/material";
import { GetEmployeeDetail } from "../../../services/api";
import { useQuery } from "react-query";
import { useGetEmployeeDetail } from "../../../services/staff";

const EmployeeModal = (props) => {
  const classes = useStyles();
  const { setEmployeeOpen, personId } = props;

  const {
    data: empDetail,
    error: geterror,
    isLoading: getloading,
    refetch: getrefetch,
  } = useGetEmployeeDetail({ personId: personId });

  const handleClose1 = () => {
    setEmployeeOpen(false);
  };

  const customDialogProps = {
    maxWidth: "600px",
    title: "Employee Detail",
    open: "true",
    handleClose: { handleClose1 },
    width: "lg",
  };

  return (
    <>
      <CustomDialog
        {...customDialogProps}
        handleClose={handleClose1}
        isLoading={getloading}
      >
        {empDetail && (
          <Grid xs="12">
            <Grid xs="5">
              <Typography
                style={{
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {empDetail?.[0]?.firstName +
                  " " +
                  empDetail?.[0]?.lastName +
                  " " +
                  "[" +
                  empDetail?.[0]?.employeeNumber +
                  "]"}
              </Typography>
            </Grid>
            <Grid
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <Grid style={{ position: "relative", left: 25 }}>
                <img width="60%" src="./assets/images/person.png" alt="Image" />
              </Grid>
              <Grid className={classes.maincontentBox}>
                <Box className={classes.mainrow}>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Employee Number
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Employee Name
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Email Address
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Job
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Department
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Location
                  </Typography>
                </Box>
                <Box className={classes.mainrow1}>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                    }}
                  >
                    {empDetail?.[0]?.employeeNumber}
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                    }}
                  >
                    {empDetail?.[0]?.firstName + " " + empDetail?.[0]?.lastName}
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                    }}
                  >
                    {empDetail?.[0]?.jobTitle}
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                    }}
                  >
                    {empDetail?.[0]?.emailAddress}
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                    }}
                  >
                    {empDetail?.[0]?.departmentName}
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                    }}
                  >
                    {empDetail?.[0]?.locationName}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        )}
      </CustomDialog>
    </>
  );
};

export default EmployeeModal;

const useStyles = makeStyles(() => ({
  maincontainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  maincontentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    right: 20,
  },
  mainrow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  mainrow1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "10px",
  },
  typo: {
    width: "100px",
    textAlign: "end",
    alignSelf: "center",
  },
  filterData: {
    width: "170px !important",
    marginLeft: "1px !important",
  },
  bordermanage: {
    borderBottom: "1px solid #E9E9E9",
    cursor: "pointer",
  },
  selectbutton: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    alignItems: "center",
    // margin: "100px 0px 0px 0px !important"
  },
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#D6DFE6",
    alignItems: "center",
  },
}));
