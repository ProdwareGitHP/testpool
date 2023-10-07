import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {
  teamSelectCardInfo,
  teamViolationCardInfo,
  uniqueArrByKey,
  _renderCardInfo,
  _renderViolationCardInfo,
} from "../contants";
const FilterManageTeam = (props) => {
  const {
    oriPagedata,
    tableData,
    setEmployeeFilter,
    employeeFilter,
    setFilterPopUpType,
    setDepaertmentFilter,
    setJobTypeFilter,
    jobTypeFilter,
    departmentFilter,
    setTabledata,
    setEmployeeFilterData,
    setDepartmentFilterData,
    setJobTypeFilterData,
    setEmployeeToggle,
    setDepartmentToggle,
    setJobTypeToggle,
    setProfileToggle,
    setTeamToggle,
    setProfileFilterData,
    profileFilter,
    setProfileFilter,
    setTeamFilterData,
    teamFilter,
    setTeamFilter,
  } = props;

  const classes = useStyles();

  const dispatch = useDispatch();
  const commonReducer = useSelector((state) => state.commonReducer);

  const [clearFilter, setClearFilter] = useState(false);
  const [project, setProject] = useState(false);

  const selectprojectclickhandler = () => {
    setProject(true);
  };

  //   const selectLMclickhandler = () => {
  //     dispatch(
  //       updateState({
  //         // lineManageForTeam: !commonReducer.lineManageForTeam,
  //         selectedProjectObjTeam: {},
  //       })
  //     );
  //   };

  useEffect(() => {
    if (
      employeeFilter ||
      jobTypeFilter ||
      departmentFilter ||
      profileFilter ||
      teamFilter
    ) {
      setClearFilter(true);
    }
  }, [
    employeeFilter,
    jobTypeFilter,
    departmentFilter,
    profileFilter,
    teamFilter,
  ]);

  const employeeclickhandler = () => {
    setEmployeeToggle(true);
    setFilterPopUpType("employee");
  };

  const departmentclickhandler = () => {
    setDepartmentToggle(true);
    setFilterPopUpType("department");
  };

  const jobtypeclickhandler = () => {
    setJobTypeToggle(true);
    setFilterPopUpType("jobtitle");
  };
  const profiletypeclickhandler = () => {
    setProfileToggle(true);
    setFilterPopUpType("profile");
  };

  const teamtypeclickhandler = () => {
    setTeamToggle(true);
    setFilterPopUpType("team");
  };

  const clearfilterclickhandler = () => {
    setFilterPopUpType("");
    setJobTypeFilter(false);
    setDepaertmentFilter(false);
    setEmployeeFilter(false);
    setProfileFilter(false);
    setTeamFilter(false);
    setTabledata([...oriPagedata]);
    setEmployeeFilterData([]);
    setDepartmentFilterData([]);
    setJobTypeFilterData([]);
    setProfileFilterData([]);
    setTeamFilterData([]);
    setClearFilter(false);
  };

  return (
    <Grid item xs="12">
      <Box>
        <Grid container>
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
          <Box ml={2} onClick={jobtypeclickhandler}>
            <Typography variant="h7" className={classes.employee}>
              {!jobTypeFilter ? (
                <FilterAltIcon className={classes.FilterAltIcon} />
              ) : (
                <FilterAltOffIcon className={classes.FilterAltIcon} />
              )}
              Job
            </Typography>
          </Box>
          <Box ml={2} onClick={departmentclickhandler}>
            <Typography variant="h7" className={classes.employee}>
              {!departmentFilter ? (
                <FilterAltIcon className={classes.FilterAltIcon} />
              ) : (
                <FilterAltOffIcon className={classes.FilterAltIcon} />
              )}
              Department
            </Typography>
          </Box>
          <Box ml={2} onClick={profiletypeclickhandler}>
            <Typography variant="h7" className={classes.employee}>
              {!profileFilter ? (
                <FilterAltIcon className={classes.FilterAltIcon} />
              ) : (
                <FilterAltOffIcon className={classes.FilterAltIcon} />
              )}
              Profile
            </Typography>
          </Box>
          <Box ml={2} onClick={teamtypeclickhandler}>
            <Typography variant="h7" className={classes.employee}>
              {!teamFilter ? (
                <FilterAltIcon className={classes.FilterAltIcon} />
              ) : (
                <FilterAltOffIcon className={classes.FilterAltIcon} />
              )}
              Team
            </Typography>
          </Box>

          <Box ml={2} onClick={clearfilterclickhandler}>
            <Typography variant="h7" className={classes.clearFilter}>
              {!clearFilter ? (
                <FilterAltIcon className={classes.FilterAltIcon} />
              ) : (
                <FilterAltOffIcon className={classes.FilterAltIcon} />
              )}
              Clear Filter
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default FilterManageTeam;
const useStyles = makeStyles(() => ({
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
}));
