import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
// import { _renderCardInfo3 } from "../../contants";
import CustomSummaryData from "../../../components/CustomSummaryData";

const CustomSummaryList = (props) => {
  const { oriPagedata, statusMap, handleFilterClick, selectedFilter } = props;
  const classes = useStyles2();

  return (
    <Box className={classes.Wrap}>
      {statusMap.map((item, index) => {
        return (
          <CustomSummaryData
            key={index}
            isClickable={true}
            item={item}
            onClick={handleFilterClick}
            label={item.label}
            value={oriPagedata[item.mappedKey] || 0}
            classes={{
              boxClassName: `${classes.totalpersonbox} ${
                selectedFilter.mappedKey === item.mappedKey
                  ? classes.active
                  : ""
              }`,
              labelClassName: classes.link,
              valueClassName:
                selectedFilter.mappedKey === item.mappedKey
                  ? classes.totalpersonboxtext3
                  : classes.totalpersonboxtext1,
              activeClass: classes.active,
              linkClass: classes.link,
            }}
            styles={{
              boxStyles: {},
              labelStyles: { fontSize: 14 },
              valueStyles: {},
            }}
          />
        );
      })}
    </Box>
  );
};

export default CustomSummaryList;

const useStyles2 = makeStyles(() => ({
  maincontainer1: {
    backgroundColor: "#f5f5f5",
  },
  paper: {
    margin: "15px 0px 15px 0px",
    borderRadius: "0px !important",
    border: "1px solid rgb(233, 233, 233)",
    backgroundColor: "white !important",
    width: "100%",
  },
  container: {
    padding: "20px",
  },
  body_text: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  projectname: {
    color: "#6F6F6F !important",
    display: "inline-block !important",
    marginLeft: "20px !important",
    marginTop: "10px !important",
    textOverflow: "ellipsis !important",
    overflow: "hidden !important",
    width: "calc(100% - 190px)",
    whiteSpace: "nowrap !important",
    fontSize: "14px !important",
    verticalAlign: "sub !important",
  },
  startdate: {
    display: "flex",
    alignItems: "center !important",
    marginTop: "10px !important",
    fontSize: "14px !important",
    borderRadius: "0px !important",
  },
  totalpersonbox: {
    borderRight: "2px solid #34d9fa",
    cursor: "pointer",
    margin: "20px 0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  Wrap: {
    display: "flex",
    marginTop: "10px !important",
    width: "100%",
    overflowX: "auto",
    // borderBottom: "1px solid rgb(233, 233, 233)",
    "& p": {
      fontWeight: "bold",
      marginLeft: "10px",
      textAlign: "center",
    },
  },
  totalpersonboxtext1: {
    color: "#3CAF85 !important",
    fontSize: "20px !important",
  },
  totalpersonboxtext2: {
    color: "#47BDEF !important",
    textAlign: "center",
    fontSize: "20px !important",
  },
  totalpersonboxtext3: {
    color: "#4a85c5 !important",
    fontSize: "20px !important",
  },
  totalpersonboxtext4: {
    color: "#af3c66 !important",
    fontSize: "20px !important",
  },
  totalpersonboxtext5: {
    color: "#ed6647 !important",
    fontSize: "20px !important",
  },
  totalpersonboxtext6: {
    color: "#A0A0A0 !important",
  },
  tablebox: {
    marginTop: "10px",
  },
  filterData: {
    width: "170px !important",
    marginLeft: "10px !important",
  },
  projectTitle: {
    fontSize: "18px !important",
    fontWeight: "bold !important",
  },
  selectedButton: {
    backgroundColor: "rgb(6 102 243) !important",
  },
  projectname: {
    color: "#6F6F6F !important",
    display: "inline-block !important",
    marginLeft: "20px !important",
    marginTop: "10px !important",
    textOverflow: "ellipsis !important",
    overflow: "hidden !important",
    // width: "calc(100% - 190px)",
    whiteSpace: "nowrap !important",
    fontSize: "14px !important",
    verticalAlign: "sub !important",
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    //margin: "5px",
    // maxHeight: "350px",
    minHeight: "fit-content",
    //backgroundColor: "#F1F1F1",
    width: "100%",
    whiteSpace: "nowrap",
  },
  innermainbox: {
    display: "inline-block",
    width: "100%",
    verticalAlign: "top",
    overflowY: "auto",
  },
  innerboxworkduration2: {
    display: "flex !important",
    padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#E9E9E9",
    // position: "fixed",
    //width: "100vw",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    //backgroundColor: "#fff",
    "&:hover": {
      //backgroundColor: "#ededed",
    },
    width: "100%",
    // height: "60px"
  },
  link: {
    fontSize: 14,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  active: {
    backgroundColor: "bisque",
  },
}));
