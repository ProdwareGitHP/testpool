import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import React, { useState } from "react";
import SummaryDataEmployee from "./SummaryDataEmployee.";
import { HourCell, LabelCell } from "./HourCell";
import { DataTable } from "../../../components/DataTable";

function ProdTable(props) {
  const { dashboardData } = props;

  const [clicked2, setClicked2] = useState(-1);
  const classes = useStyles();

  return (
    <DataTable
      data={dashboardData}
      DataItemComponent={(item) => {
        return (
          <Grid
            key={item.id}
            style={{
              // paddingTop: 20,
              paddingBottom: 20,
              // paddingLeft: 10,
              // paddingRight: 10,
            }}
            borderBottom="1px solid rgb(233, 233, 233)"
          >
            <Typography
              style={{
                fontWeight: "bold",
                color: "orange",
                fontSize: 15,
                marginLeft: "4px",
              }}
            >
              {item.fullName} [{item.employeeNumber}]
            </Typography>

            <SummaryDataEmployee item={item} />

            <Box className={classes.mainbox2}>
              <Box className={classes.innermainbox2}>
                <Box className={classes.innerboxworkduration2}>
                  <LabelCell label={"Department"} width={350} />
                  <LabelCell label={"Job"} width={220} />
                  {item?.weekTitle?.map((it, index) => {
                    return (
                      <Box
                        style={{ borderRight: "0px solid #b8b5b5" }}
                        key={it}
                      >
                        <Typography
                          style={{
                            padding: 5,
                            fontSize: "14px",
                            textAlign: "center",
                            fontFamily: "Inter",
                            fontWeight: "bold",
                            borderBottom: "1px solid #b8b5b5",
                          }}
                        >
                          {it}
                        </Typography>
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          {item?.rowsTitle?.map((ii, index) => (
                            <LabelCell
                              label={ii}
                              numeric
                              key={ii}
                              width={100}
                            />
                          ))}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>

                {item?.data?.map((it, index) => {
                  const id = index;
                  let saved = false;
                  return (
                    <>
                      <Box
                        className={classes.pagedatamainbox2}
                        onClick={() => setClicked2(id)}
                        style={{
                          backgroundColor: `${saved ? "lightblue" : ""}`,
                        }}
                      >
                        <HourCell hour={it?.departmentName} width={350} />
                        <HourCell hour={it?.roleName} width={220} />
                        {it?.weeklyData.map((wData, index) => {
                          return (
                            <Box
                              key={wData}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              {item?.rowsTitle?.map((rowTitle) => (
                                <HourCell
                                  hour={wData[rowTitle]}
                                  numeric
                                  showBlank
                                  width={100}
                                  key={rowTitle}
                                />
                              ))}
                            </Box>
                          );
                        })}
                      </Box>
                    </>
                  );
                })}
              </Box>
            </Box>
          </Grid>
        );
      }}
    />
  );
}
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
    width: "75.7em",
    verticalAlign: "top",
    // overflowY: "scroll",
    maxHeight: "10em",
    border: "1px solid #E9E9E9",
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
    width: "75.6em",
    position: "absolute",
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
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  pagedatamainbox2: {
    display: "flex !important",
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

  hrs: {
    width: "4em",
    // border: "1px solid #b8b5b51f",
    position: "relative",
    textAlign: "center",
    // borderRight: "1px solid #b8b5b5",
  },
}));
export default ProdTable;
