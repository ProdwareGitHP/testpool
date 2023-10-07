import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomFilterList from "../../../components/CustomFilterList";
import Dropdown from "../../../components/EvoDropDown";
import { PAYCODES, sortPaycodes } from "../../../utils/commonService";
import {
  FilterArray,
  _renderCardInfo,
  dashboardDateWidgetOption,
  setCardValueByType,
} from "../../contants";
import { DateWidget } from "../shared/datewidget";
import filterButtons from "./filterButtons.json";

export const SelectProfileCard = (props) => {
  const {
    pagedata,
    oriPagedata,
    parentFilter,
    setParentFilter,
    setEmployeeFilter,
    setAppStatus,
    setEmployeeupdateData,
    employeeupdateData,
    employeeFilter,
    headerArr,
  } = props;
  var localHeaderArr = headerArr.filter(
    (option) =>
      option.fixed ||
      (!option.fixed && setCardValueByType(option.mappingKey, pagedata) > 0)
  );
  // console.log("Before sort", localHeaderArr)
  localHeaderArr = sortPaycodes(localHeaderArr);
  // console.log("After sort", localHeaderArr);

  const useStyles = makeStyles(() => {
    var colorClasses = {};
    localHeaderArr.map((item) => {
      colorClasses[item.mappingKey] = {
        color: PAYCODES[item.mappingKey]?.color
          ? PAYCODES[item.mappingKey].color
          : "",
      };
    });

    return {
      ...colorClasses,
      paper: {
        //margin: "15px 0px 0 0px",
        borderRadius: "0px !important",
        // border: "1px solid rgb(233, 233, 233)",
        backgroundColor: "white !important",
      },
      FilterAltIcon: {
        color: "white !important",
        fontSize: "large !important",
        marginRight: "10px",
      },
      clearFilter: {
        backgroundColor: "#f0ad4e",
        width: "130px",
        padding: "9.1px",
        cursor: "pointer",
        alignItems: "center",
        display: "flex",
        color: "#fff",
        justifyContent: "center",
      },
      container: {
        padding: "0px 20px",
      },
      body_text: {
        fontSize: "14px !important",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
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
      startdate: {
        display: "flex",
        alignItems: "center !important",
        marginTop: "10px !important",
        fontSize: "14px !important",
        borderRadius: "0px !important",
      },
      totalpersonbox: {
        borderRight: "1px solid rgb(233, 233, 233)",
        textAlign: "center",
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

      filterData: {
        width: "180px !important",
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
    };
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(FilterArray[0]);

  const commonReducer = useSelector((state) => state.commonReducer);

  const employeeclickhandler = () => {
    setEmployeeFilter(true);
  };
  const clearFilter = () => {
    setFilter(FilterArray[0]);
    setEmployeeupdateData([]);
  };
  useEffect(() => {
    setAppStatus(filter.value);
  }, [filter]);

  const onOptionChange = (newData) => {
    setAppStatus(newData.value);
    setFilter(newData);
  };

  return (
    <>
      <Box className={classes.paper}>
        <Grid container className={classes.container}>
          {Object.keys(commonReducer.selectedProjectObjTeam).length > 0 && (
            <>
              <Grid item xs="12" className={classes.startdate}>
                <DateWidget
                  durationFilter={true}
                  {...props}
                  dateWidgetOption={dashboardDateWidgetOption}
                />

                <Dropdown
                  id="filter"
                  data={FilterArray}
                  caller={onOptionChange}
                  month={filter}
                  getoptionlabelkey="label"
                />
                <CustomFilterList
                  filterButtons={filterButtons}
                  oriPagedata={oriPagedata}
                  setFilter={setParentFilter}
                  filter={parentFilter}
                />
              </Grid>
              <Grid item xs="12" className={classes.Wrap}>
                <Grid item>
                  <Box px={2} className={classes.totalpersonbox}>
                    <Typography className={classes.totalpersonboxtext1}>
                      {oriPagedata.length}
                    </Typography>
                    <Typography variant="h7">Total Person</Typography>
                  </Box>
                </Grid>
                {localHeaderArr
                  .map((option, index) => ({
                    ...option,
                    mappedKey: option.mappingKey,
                    mapClass: `totalpersonboxtext${index}`,
                  }))
                  .map((option) => {
                    return (
                      <Grid
                        item
                        // sx={{display:'inline-block',width:'min-content'}}
                      >
                        {option.mappedKey == "regularHrs"
                          ? setCardValueByType(option.mappedKey, pagedata) === 0
                            ? ""
                            : _renderCardInfo(option, pagedata, classes)
                          : option.mappedKey == "lapsHours"
                          ? setCardValueByType(option.mappedKey, pagedata) === 0
                            ? ""
                            : _renderCardInfo(option, pagedata, classes)
                          : _renderCardInfo(option, pagedata, classes)}
                      </Grid>
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
