import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Dropdown from "../../components/EvoDropDown";
import {
  FilterArray,
  _renderCardInfo,
  dashboardDateWidgetOption,
  dashboardSelectCardInfo,
  setCardValueByType,
} from "../contants";
import { DateWidget } from "../shared/datewidget";

export const SelectProfileCard = (props) => {
  const classes = useStyles();
  const { oriPagedata, setEmployeeFilter, setAppStatus, employeeFilter } =
    props;

  const [filter, setFilter] = useState(FilterArray[0]);

  const commonReducer = useSelector((state) => state.commonReducer);

  const employeeclickhandler = () => {
    setEmployeeFilter(true);
  };

  const onOptionChange = (newData) => {
    setAppStatus(newData.value);
    setFilter(newData);
  };

  return (
    <>
      <Box className={classes.paper}>
        <Grid container className={classes.container}>
          {Object.keys(commonReducer.selectedProjectObj).length > 0 && (
            <>
              <Grid item xs="12" className={classes.startdate}>
                <DateWidget
                  durationFilter={true}
                  {...props}
                  dateWidgetOption={dashboardDateWidgetOption.filter(
                    (item) => item.id === 1
                  )}
                />

                <Dropdown
                  id="filter"
                  data={FilterArray}
                  caller={onOptionChange}
                  month={FilterArray}
                  getoptionlabelkey="label"
                />
                <Box ml={2} onClick={employeeclickhandler}>
                  <Typography variant="h7" className={classes.employee}>
                    {!employeeFilter ? (
                      <FilterAltIcon className={classes.FilterAltIcon} />
                    ) : (
                      <FilterAltOffIcon className={classes.FilterAltIcon} />
                    )}
                    Employee
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs="12" className={classes.Wrap}>
                <Box px={2} className={classes.totalpersonbox}>
                  <Typography className={classes.totalpersonboxtext1}>
                    {oriPagedata.length}
                  </Typography>
                  <Typography variant="h7">Total Person</Typography>
                </Box>
                {dashboardSelectCardInfo.map((option) => {
                  return (
                    <>
                      {option.mappedKey == "regularHrs"
                        ? setCardValueByType(option.mappedKey, oriPagedata) ===
                          0
                          ? ""
                          : _renderCardInfo(option, oriPagedata, classes)
                        : option.mappedKey == "lapsHours"
                        ? setCardValueByType(option.mappedKey, oriPagedata) ===
                          0
                          ? ""
                          : _renderCardInfo(option, oriPagedata, classes)
                        : _renderCardInfo(option, oriPagedata, classes)}
                    </>
                  );
                })}
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};

const useStyles = makeStyles(() => ({
  paper: {
    margin: "15px 0px 15px 0px",
    borderRadius: "0px !important",
    border: "1px solid rgb(233, 233, 233)",
    backgroundColor: "white !important",
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
    borderRight: "1px solid rgb(233, 233, 233)",
  },
  Wrap: {
    display: "flex",
    marginTop: "20px !important",
    "& p": {
      fontWeight: "bold",
      marginLeft: "10px",
      textAlign: "center",
      fontSize: "14px !important",
    },
  },
  totalpersonboxtext1: {
    color: "#3CAF85 !important",
  },
  totalpersonboxtext2: {
    color: "#47BDEF !important",
  },
  totalpersonboxtext3: {
    color: "#4a85c5 !important",
  },
  totalpersonboxtext4: {
    color: "#af3c66 !important",
  },
  totalpersonboxtext5: {
    color: "#ed6647 !important",
  },
  totalpersonboxtext6: {
    color: "#A0A0A0 !important",
  },

  filterData: {
    width: "170px !important",
    marginLeft: "10px !important",
  },

  employee: {
    backgroundColor: "#124590",
    width: "130px",
    padding: "9.1px",
    cursor: "pointer",
    alignItems: "center",
    display: "flex",
    color: "#fff",
    justifyContent: "center",
  },
  FilterAltIcon: {
    color: "white !important",
    fontSize: "large !important",
    marginRight: "10px",
  },
}));
