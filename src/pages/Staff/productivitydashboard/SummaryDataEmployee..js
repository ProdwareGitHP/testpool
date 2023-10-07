import { Box, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { LabelCell, HourCell } from "./HourCell";

export const setCardValueByType = (type, arr) => {
  var res =
    arr?.length > 0
      ? arr?.reduce(
          (acc, val) =>
            acc +
            (val?.weeklyData[0][type] == null
              ? 0
              : parseFloat(val?.weeklyData[0][type])),
          0
        ) > 0
        ? parseFloat(
            arr
              ?.reduce(
                (acc, val) =>
                  acc +
                  (val?.weeklyData[0][type] == null
                    ? 0
                    : parseFloat(val?.weeklyData[0][type])),
                0
              )
              .toFixed(2)
              .replace(/[.,]00$/, "")
          )
        : 0
      : 0;
  return res;
};

const SummaryDataEmployee = ({ item }) => {
  const classes = useStyles();

  return (
    <Box className={classes.mainbox2}>
      <Box className={classes.innermainbox2}>
        <Box className={classes.pagedatamainbox2}>
          <Box className={classes.innerboxworkduration}>
            <LabelCell label={"Scheduled Hrs"} numeric />
            <LabelCell label={"Working Hrs"} numeric />
            {item.rowsTitle.map((ii) => (
              <LabelCell label={ii} key={ii} numeric />
            ))}
            <LabelCell label={"Paid Leave Hrs"} numeric />
            <LabelCell label={"Unpaid Leave Hrs"} numeric />
            <LabelCell label={"Holiday Hrs"} numeric />
            <LabelCell label={"Official Permission Hrs"} numeric />
          </Box>
          <Box className={classes.pagedatamainbox}>
            <HourCell hour={item?.schHrs} numeric />
            <HourCell hour={item?.wrkHrs} numeric />
            {item.rowsTitle.map((option) => (
              <HourCell
                numeric
                key={option}
                hour={setCardValueByType(option, item.data)}
              />
            ))}
            <HourCell hour={item?.paidLeaveHrs} numeric />
            <HourCell hour={item?.unpaidLeaveHrs} numeric />
            <HourCell hour={item?.holidayHours} numeric />
            <HourCell hour={item?.offPermReqHrs} numeric />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SummaryDataEmployee;

const useStyles = makeStyles(() => ({
  Wrap: {
    display: "flex",
    "& p": {
      fontWeight: "bold",
      marginLeft: "10px",
      textAlign: "center",
      fontSize: "14px ",
    },
  },

  totalpersonbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  maincontainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  maincontentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  selectbutton: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    // paddingRight: "10px",
    // margin: "100px 0px 0px 0px !important"
  },
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#D6DFE6",
    alignItems: "center",
  },
  bordermanage: {
    borderBottom: "1px solid #E9E9E9",
    cursor: "pointer",
  },
  headerText: {
    fontSize: "16px",
    fontFamily: "Inter",
    fontWeight: "bold",
  },
  searchBtnText: {
    fontSize: "14px",
    fontFamily: "Inter",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  SearchTextField: {
    marginLeft: "10px",
  },
  addIcon: {
    color: "#60AA60",
    fontWeight: "bold",
    fontSize: "16px",
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    width: "100%",
    //margin: "5px",
    //maxHeight: "350px",
    background: "#f7f9fc",
    // overflow: "scroll"
  },
  mainbox2: {
    border: "1px solid #E9E9E9 !important",
    width: "100%",
    //margin: "5px",
    //maxHeight: "350px",
    background: "#f7f9fc",
    marginTop: "15px",
    // overflow: "scroll",
  },
  innermainbox: {
    display: "inline-block",
    width: "100%",
    verticalAlign: "top",
    // overflowY: "scroll",
    //maxHeight: "10em",
    //border: "1px solid #E9E9E9",
    overflow: "auto",
  },
  innermainbox2: {
    display: "inline-block",
    width: "100%",
    //maxHeight: "14em",
    verticalAlign: "top",
    overflow: "auto",
  },
  innerboxworkduration: {
    display: "flex !important",
    // padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    //position: "fixed",
    //width: "75.6em",
    //position: "absolute",
    // marginRight: "50px"
  },
  innerboxworkduration2: {
    display: "flex !important",
    padding: "0px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    //position: "fixed",
    width: "fit-content",
    position: "relative",
    // marginRight: "50px"
  },
  pagedatamainbox: {
    display: "flex !important",
    //borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  pagedatamainbox2: {
    //display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
    width: "fit-content",
  },
  EditIcon: {
    color: "#124590",
    fontSize: "20px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  CopyIcon: {
    // color: "#124590",
    fontSize: "20px",
    cursor: "pointer",
    marginLeft: "10px",
    color: "#124590",
  },
  ExportIcon: {
    // color: "#124590",
    fontSize: "20px",
    cursor: "pointer",
    marginLeft: "10px",
    color: "#124590",
  },
  ExpireIcon: {
    color: "red",
    fontSize: "20px",
    cursor: "pointer",
  },
  ActionBox: {
    width: "12em",
    display: "flex",
    alignItems: "center",
    marginLeft: "18px",
  },
  ActionBox2: {
    width: "280px",
    display: "flex",
    alignItems: "center",
    padding: "0px 7px",
    borderRight: "1px solid #b8b5b5",
    // marginLeft: "4px",
  },
  demTemp: {
    width: "10em",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #b8b5b5",
  },
  demTemp2: {
    width: "201px",
    display: "flex",
    alignItems: "center",
    padding: "0px 7px",
    borderRight: "1px solid #b8b5b5",

    // marginLeft: "10px",
  },
  start: {
    width: "10em",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #b8b5b5",
  },
  num: {
    width: "10em",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #b8b5b5",
  },
  flag: {
    width: "10em",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #b8b5b5",
  },
  expiry: {
    width: "16%",
    display: "flex",
    alignItems: "center",
  },
  TimeStartBox: {
    width: "7%",
    display: "flex",
    alignItems: "center",
  },
  TimeEndBox: {
    width: "7%",
    display: "flex",
    alignItems: "center",
  },
  DurationBox: {
    width: "8%",
    display: "flex",
    alignItems: "center",
  },
  DurationCategoryBox: {
    width: "16%",
    display: "flex",
    alignItems: "center",
  },
  hover: {
    marginTop: "5px",
    // "&:hover": {
    //   background: "#ebeced",
    // },
  },
  hrs: {
    width: "4em",
    // border: "1px solid #b8b5b51f",
    position: "relative",
    textAlign: "center",
    // borderRight: "1px solid #b8b5b5",
  },
}));
