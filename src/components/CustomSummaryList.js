import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import CustomSummaryData from "./CustomSummaryData";

function ParentComponent(props) {
  const { children, scrollable, classes } = props;

  return scrollable ? (
    <Box className={classes.Wrap}>{children}</Box>
  ) : (
    <Grid container className={classes.Wrap}>
      {children}
    </Grid>
  );
}
const CustomSummaryList = (props) => {
  const { summaryList, scrollable, onClick, selectedFilter } = props;
  const classes = useStyles();

  return (
    <ParentComponent scrollable={scrollable} classes={classes}>
      {summaryList.map((item, index) => (
        <CustomSummaryData
          key={index}
          item={item}
          scrollable={scrollable}
          isClickable={item.isClickable}
          onClick={item.onClick || onClick}
          isSelectable={item.isSelectable}
          isSelected={selectedFilter?.mappedKey === item.mappedKey}
          label={item.label}
          value={item.value}
          classes={{
            boxClassName: scrollable ? classes.scrollableBox : classes.gridItem,
            labelClassName: classes.labelClass,
            valueClassName:
              item.isClickable &&
              item.isSelectable &&
              selectedFilter?.mappedKey === item.mappedKey
                ? classes.selectedClass
                : classes.notSelectedClass,
            activeClass: classes.active,
            linkClass: classes.link,
          }}
        />
      ))}
    </ParentComponent>
  );
};

export default CustomSummaryList;

const useStyles = makeStyles(() => ({
  Wrap: {
    display: "flex",
    //backgroundColor: "green",
    //borderTop: "1px solid #E9E9E9",
  },
  scrollableBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    width: 120,
    padding: 10,
    borderRight: "1px solid rgb(233, 233, 233)",
    //borderBottom: "1px solid rgb(233, 233, 233)",
  },
  gridItem: {
    textAlign: "center",
    //padding: 15,
    borderRight: "1px solid rgb(233, 233, 233)",
    borderBottom: "1px solid rgb(233, 233, 233)",
    padding: "10px",
  },
  notSelectedClass: {
    color: "#3CAF85",
    fontSize: "24px",
  },
  selectedClass: {
    color: "#4a85c5",
    fontSize: "24px",
  },

  labelClass: {},
  link: {
    "&:hover": {
      textDecoration: "underline",
    },
    cursor: "pointer",
  },
  active: {
    backgroundColor: "bisque",
    fontWeight: "bold",
  },
}));
