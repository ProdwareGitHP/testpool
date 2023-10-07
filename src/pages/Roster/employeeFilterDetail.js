import React, { useEffect, useState } from "react";
import { CustomDialog } from "../../components/CustomDialog";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { CustomTextField } from "../../components/TextField";
import { EvoButton } from "../../components/EvoButton";
import CustomCheckBox from "../../components/CustomCheckBox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { color } from "@mui/system";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";

export const EmployeeFilterDetail = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    togglerhandler,
    setEmployeeupdateData,
    oriPagedata,
    employeeupdateData,
  } = props;

  const [employee, setEmployee] = useState(true);
  const [icon, setIcon] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [searchArr, setSearchArr] = useState([]);
  const [selecAllFlag, setSelecAllFlag] = useState(false);
  const [searchObj, setSearchObj] = useState({
    name: "",
    id: "",
  });

  const handleClose = () => {
    togglerhandler(false);
  };

  const iconclickhanlder = () => {
    setIcon(!icon);
  };

  useEffect(() => {
    var localArray = [];
    if (oriPagedata) {
      if (employeeupdateData.length > 0) {
        localArray = oriPagedata?.map((item, index) => ({
          ...item,
          checked: employeeupdateData.includes(item.employeeNumber),
        }));
      } else {
        localArray = oriPagedata?.map((item, index) => ({
          ...item,
          checked: false,
        }));
      }
      setFilterData(localArray);
    }
  }, [oriPagedata]);

  const onChangeCheck = (value, currentIndex) => {
    var localArray = filterData?.map((option, index) => {
      return index == currentIndex ? { ...option, checked: value } : option;
    });
    setFilterData(localArray);
  };

  const filterclickhandler = () => {
    var localArray = filterData
      ?.filter((option) => option.checked)
      .map((option) => option.employeeNumber);
    setEmployeeupdateData(localArray);
    togglerhandler(false);
  };

  const commonlogic = () => {
    var localArray = [];
    if (employeeupdateData.length > 0) {
      localArray = oriPagedata?.map((item, index) => ({
        ...item,
        checked: employeeupdateData.includes(item.employeeNumber),
      }));
    } else {
      localArray = oriPagedata?.map((item, index) => ({
        ...item,
        checked: false,
      }));
    }
    setFilterData(localArray);
  };

  useEffect(() => {
    console.log(
      "s=====",
      searchObj.name.length != 0,
      searchObj.id.length != 0,
      searchObj.name.length != 0 || searchObj.id.length != 0
    );
    if (searchObj.name.length != 0 || searchObj.id.length != 0) {
      var localArr =
        searchObj.name.length == 0 && searchObj.id.length == 0
          ? commonlogic()
          : oriPagedata?.filter(
              (item) =>
                item["fullName"]
                  .toLowerCase()
                  .includes(searchObj.name.toLowerCase()) &&
                item["employeeNumber"]
                  .toLowerCase()
                  .includes(searchObj.id.toLowerCase())
            );
      setFilterData(localArr);
    } else {
      commonlogic();
    }
  }, [searchObj]);

  // useEffect(() => {
  //     if (selecAllFlag) {
  //         var localArray = filterData?.map((option, index) => ({ ...option, checked: selecAllFlag }))
  //         setFilterData(localArray)
  //     }
  // }, [selecAllFlag])

  const checkAllSelect = () => {
    var localArr = filterData.filter((option) => option.checked);
    console.log(
      "localArr.length == filterData.length",
      localArr.length == filterData.length
    );
    return localArr.length == filterData.length;
  };

  const onChangeSelectAll = (value) => {
    // setSelecAllFlag(value);
    var localArray = oriPagedata?.map((item, index) => ({
      ...item,
      checked: value,
    }));
    setFilterData(localArray);
  };

  return (
    <CustomDialog
      maxWidth="md"
      title="Filter By Employee"
      open="true"
      handleClose={handleClose}
      actions={{ onFilter: filterclickhandler }}
    >
      <Grid container alignItems="center">
        <Box className="cursor-pointer">
          {icon ? (
            <ArrowDropDownIcon
              onClick={iconclickhanlder}
              className={classes.iconmanage}
            />
          ) : (
            <ArrowRightIcon
              onClick={iconclickhanlder}
              className={classes.iconmanage}
            />
          )}
        </Box>
        <Typography variant="h7" color="#252525">
          <Box fontWeight="bold" p="10px">
            Search
          </Box>
        </Typography>
      </Grid>
      {icon ? (
        <Box pb={2}>
          <Box mb={2}>
            <Grid container alignItems="center">
              <Grid item xs="4">
                <Typography fontSize="14px">
                  <Box textAlign="right" mr={2}>
                    Employee Number
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs="8">
                <Box>
                  <CustomTextField
                    type="text"
                    onChange={(e) =>
                      setSearchObj({ ...searchObj, id: e.target.value })
                    }
                    // onChange={(e) => searchByInput('employeeNumber', e.target.value)}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mb={2}>
            <Grid container alignItems="center">
              <Grid item xs="4">
                <Typography fontSize="14px">
                  <Box textAlign="right" mr={2}>
                    Employee
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs="8">
                <Box>
                  <CustomTextField
                    type="text"
                    // onChange={(e) => searchByInput('fullName', e.target.value)}
                    onChange={(e) =>
                      setSearchObj({ ...searchObj, name: e.target.value })
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Grid container justifyContent="flex-end">
            <Box mx="10px">
              {/* <EvoButton
                            btnText='Search'
                            variant='contained'
                            btnClass={{ backgroundColor: "#124590", color: "#fff", fontSize: "12px" }}
                        /> */}
            </Box>
            {/* <Box>
                        <EvoButton
                            btnText='Reset'
                            variant='contained'
                            btnClass={{ backgroundColor: "#124590", color: "#fff", fontSize: "12px" }}
                            onClick={() => {
                                setSearchObj({ ...searchObj, 'name': "", id: "" })
                            }
                            }
                        />
                    </Box> */}
          </Grid>
        </Box>
      ) : null}
      <Grid container mt="20px" className={classes.headermanage}>
        <Grid item xs="1">
          {/* <CustomCheckBox
                    isChecked={checkAllSelect()}
                    onChangeCheck={onChangeSelectAll}
                /> */}
        </Grid>
        <Grid item xs="3">
          <Box fontWeight="bold">
            <Typography fontSize="14px">Employee Number</Typography>
          </Box>
        </Grid>
        <Grid item xs="3">
          <Typography fontSize="14px">Employee</Typography>
        </Grid>
      </Grid>
      <Grid container>
        {console.log("filterData", filterData)}
        {filterData?.length > 0 &&
          filterData.map((item, index) => {
            return (
              <Grid
                container
                alignItems="center"
                className={classes.bordermanage}
              >
                {console.log("item.checked", typeof item.checked)}
                <Grid item xs="1">
                  <CustomCheckBox
                    isChecked={item.checked}
                    onChangeCheck={onChangeCheck}
                    currentIndex={index}
                  />
                </Grid>
                <Grid item xs="3">
                  <Typography fontSize="14px">
                    {item?.employeeNumber}
                  </Typography>
                </Grid>
                <Grid item xs="3">
                  <Box>
                    <Typography fontSize="14px">{item?.fullName}</Typography>
                  </Box>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
      <Grid container justifyContent="flex-end">
        <Box py={2}>
          {/* <EvoButton
            btnText="Filter"
            //variant="contained"
            startIcon={
              employee ? (
                <FilterAltIcon className={classes.FilterAltIcon} />
              ) : (
                <FilterAltOffIcon className={classes.FilterAltIcon} />
              )
            }
            btnClass={{
              backgroundColor: "#124590",
              color: "#fff",
              fontSize: "12px",
            }}
            onClick={filterclickhandler}
          /> */}
        </Box>
      </Grid>
    </CustomDialog>
  );
};

const useStyles = makeStyles(() => ({
  FilterAltIcon: {
    color: "#fff",
    fontSize: "large",
  },
  bordermanage: {
    borderBottom: "1px solid #E9E9E9",
  },
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#D6DFE6",
    alignItems: "center",
  },
  iconmanage: {
    display: "flex",
    alignItems: "center",
  },
}));
