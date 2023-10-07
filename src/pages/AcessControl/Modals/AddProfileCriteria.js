import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CustomFilterModal } from "../../../components/CustomFilterModal";
import Dropdown from "../../../components/EvoDropDown";
import { CustomTextField } from "../../../components/TextField";
import { SearchTextField } from "../../../components/TextField/search";
import {
  EmployeeTypeMockData,
  GenderMock,
  includeMock,
  shiftMock,
} from "../../RosterRules/Utils";
import FILTER_MODAL_DATA from "./modalData.json";

const AddProfileCriteria = (props) => {
  const {
    data,
    index,
    profileCriteria,
    setProfileCriteria,
    handleDeleteProfileCriteria,
    BussinessData,
    LegalEntity,
    JobTitle,
    jobFamily,
    employeeCategory,
    departmentArr,
    subDepartmentArr,

    payroll,
    religionData,
    citizenData,
    setAllowAddProfile,
    editableField,
    setEditableField,
  } = props;
  console.log(data);
  const commonReducer = useSelector((state) => state.commonReducer);

  const [modalData, setModelData] = useState(null);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [hierarchyLevel, setHierarachy] = useState(
    data?.hierarchyLevel !== undefined ? data?.hierarchyLevel : 0
  );

  const [personId, setPersonId] = useState();
  const [empCatgory, setEmpCatgory] = useState(false);
  const [department, setDepartment] = useState(false);
  const [subDepertment, setSubDepertment] = useState(false);
  const [nationality, setnationality] = useState(false);
  const [religion, setReligion] = useState(false);
  const [job, setJob] = useState(false);
  const [gender, setGender] = useState({
    genderArray: GenderMock,
    genderObj: {},
    genderName: "",
  });

  const [payrollData, setpayrollData] = useState({
    payrollDataArray: payroll,
    payrollDataObj: {},
    payrollDataName: "",
  });
  const [EmployeeType, setEmployeeType] = useState({
    EmployeeTypeArray: EmployeeTypeMockData,
    EmployeeTypeObj: {},
    EmployeeTypeName: "",
  });
  const [shitftType, setshitftType] = useState({
    shitftTypeArray: shiftMock,
    shitftTypeObj: {},
    shitftTypeName: "",
  });

  const [IncludeType, setIncludeType] = useState({
    IncludeTypeArray: includeMock,
    IncludeTypeObj: {},
    IncludeTypeName: "",
  });

  const [legalEntity, setlegalEntity] = useState({
    legalEntityArray: LegalEntity,
    legalEntityObj: {},
    legalEntityName: "",
  });
  const [payrollArr, setpayrollArr] = useState({
    payrollArray: payroll,
    payrollObj: {},
    payrollName: "",
  });
  const handleOpenEmployeeModal = () => {
    setOpenEmployee(true);
    setEditableField((prev) => {
      let arr = [...prev];
      arr[index].departmentName = false;
      return arr;
    });
  };
  const handleOpenJob = () => {
    setJob(true);
  };

  const incrementHierarachy = () => {
    setHierarachy((number) => number + 1);
    setProfileCriteria((prev) => {
      let arr = [...prev];
      arr[index].hierarchyLevel = hierarchyLevel + 1;
      return arr;
    });
  };

  const decrementHierarachy = () => {
    setHierarachy((number) => number - 1);
    setProfileCriteria((prev) => {
      let arr = [...prev];
      arr[index].hierarchyLevel = hierarchyLevel - 1;
      return arr;
    });
  };
  const handleOpenEmpCatgory = () => {
    setEmpCatgory(true);
  };
  const handleOpenDepartment = () => {
    setDepartment(true);
    setEditableField((prev) => {
      let arr = [...prev];
      arr[index].fullName = false;
      return arr;
    });
  };
  const handleOpenSubDepartment = () => {
    setSubDepertment(true);
  };
  const handleOpenNationality = () => {
    setnationality(true);
  };
  const handleOpenReligion = () => {
    setReligion(true);
  };
  console.log(profileCriteria, "profileCriteria");

  const handleChangeUser = (iitem) => {
    const changeval = [...profileCriteria];
    let rData = changeval[index];
    rData["personId"] = iitem.personId;
    rData["fullName"] = iitem.fullName;

    setProfileCriteria(changeval);
    setAllowAddProfile(true);
  };

  const handleChangeJob = (iitem) => {
    const changeval = [...profileCriteria];
    let rData = changeval[index];
    rData["jobId"] = iitem.jobTitleId;
    rData["jobTitle"] = iitem.jobTitle;
    setProfileCriteria(changeval);
    setAllowAddProfile(true);
  };

  const handleChangeDepartment = (iitem) => {
    const changeval = [...profileCriteria];
    let rData = changeval[index];
    rData["departmentId"] = iitem.departmentId;
    rData["departmentName"] = iitem.departmentName;
    setProfileCriteria(changeval);
    setAllowAddProfile(true);
  };
  const handleChangeEmployeeCategory = (iitem) => {
    const changeval = [...profileCriteria];
    let rData = changeval[index];
    // rData["employeeCatogary"] = iitem.employeeCatogary;
    rData["employeeCatogery"] = iitem.meaning;
    setProfileCriteria(changeval);
    setAllowAddProfile(true);
  };
  const handleChangeSubDepartment = (iitem) => {
    const changeval = [...profileCriteria];
    let rData = changeval[index];
    rData["subDepartmentId"] = iitem.subDepartmentId;
    rData["subDepartmentName"] = iitem.subDepartmentName;
    setProfileCriteria(changeval);
    setAllowAddProfile(true);
  };
  const handleChangeReligion = (iitem) => {
    const changeval = [...profileCriteria];
    let rData = changeval[index];
    rData["religion"] = iitem.meaning;
    setProfileCriteria(changeval);
    setAllowAddProfile(true);
  };
  const handleJobTilte = (index, val, e) => {
    const changeRow = [...profileCriteria];
    for (let i = 0; i < jobFamily?.jobFamilyArray.length; i++) {
      if (jobFamily?.jobFamilyArray[i].jobFamily == val) {
        changeRow[index].jobFamily = jobFamily?.jobFamilyArray[i].jobFamily;
      }
    }
    setProfileCriteria(changeRow);
    setAllowAddProfile(true);
  };
  const onOptionChange = (val) => {
    handleJobTilte(index, val);
  };

  const handleBuisiness = (index, val, e) => {
    const changeRow = [...profileCriteria];
    for (let i = 0; i < BussinessData?.BussinessArray.length; i++) {
      if (BussinessData?.BussinessArray[i].businessUnitName == val) {
        changeRow[index].businessUnitId =
          BussinessData?.BussinessArray[i].businessUnitId;
      }
    }
    setProfileCriteria(changeRow);
  };

  const handleLegalEntity = (index, val, e) => {
    const changeRow = [...profileCriteria];
    for (let i = 0; i < legalEntity?.legalEntityArray.length; i++) {
      if (legalEntity?.legalEntityArray[i].name == val) {
        changeRow[index].legalEntityId =
          legalEntity?.legalEntityArray[i].legalEntityId;
      }
    }
    setProfileCriteria(changeRow);
  };

  const handlePayroll = (index, val, e) => {
    const changeRow = [...profileCriteria];
    for (let i = 0; i < payrollArr?.payrollArray?.length; i++) {
      if (payrollArr?.payrollArray[i].payrollName == val) {
        changeRow[index].payrollId = payrollArr?.payrollArray[i].payrollId;
      }
    }
    setProfileCriteria(changeRow);
  };

  const handleEmployeeType = (index, val, e) => {
    const changeRow = [...profileCriteria];
    for (let i = 0; i < EmployeeType?.EmployeeTypeArray?.length; i++) {
      if (EmployeeType?.EmployeeTypeArray[i].value == val) {
        changeRow[index].employeeTypeId = EmployeeType?.EmployeeTypeArray[i].id;
      }
    }
    setProfileCriteria(changeRow);
  };

  const handleGender = (index, val, e) => {
    const changeRow = [...profileCriteria];
    for (let i = 0; i < gender?.genderArray?.length; i++) {
      if (gender?.genderArray[i].value == val) {
        changeRow[index].gender = gender?.genderArray[i].value;
      }
    }
    setProfileCriteria(changeRow);
  };

  const handleShiftType = (index, val, e) => {
    const changeRow = [...profileCriteria];
    for (let i = 0; i < shitftType?.shitftTypeArray?.length; i++) {
      if (shitftType?.shitftTypeArray[i].shiftType == val) {
        changeRow[index].shiftType = shitftType?.shitftTypeArray[i].shiftType;
      }
    }
    setProfileCriteria(changeRow);
  };

  const handleIncludeExlcude = (index, val, e) => {
    const changeRow = [...profileCriteria];
    for (let i = 0; i < IncludeType?.IncludeTypeArray?.length; i++) {
      if (IncludeType?.IncludeTypeArray[i].value == val) {
        changeRow[index].includeExcludeFag =
          IncludeType?.IncludeTypeArray[i].value;
      }
    }
    setProfileCriteria(changeRow);
  };

  const handleChangeNationality = (iitem) => {
    const changeval = [...profileCriteria];
    let rData = changeval[index];
    rData["nationality"] = iitem.meaning;
    setProfileCriteria(changeval);
  };

  const handleHeirarchy = (e) => {
    const changeval = [...profileCriteria];
    let rData = changeval[index];
    rData["hierarchyLevel"] = e.target.value;
    setProfileCriteria(changeval);
  };
  console.log("data", FILTER_MODAL_DATA);

  const onentityChange = (val) => {
    handleLegalEntity(index, val);
  };

  const onPayrollChange = (val) => {
    handlePayroll(index, val);
  };

  const onShiftChange = (value) => {
    handleShiftType(index, value);
  };

  const onEmployeeChange = (value) => {
    handleEmployeeType(index, value);
  };

  const onJobtileChange = (val) => {
    handleJobTilte(index, val);
  };

  const onGenderChnage = (value) => {
    handleGender(index, value);
  };

  const onInclueChange = (value) => {
    handleIncludeExlcude(index, value);
  };

  return (
    <>
      <Grid
        style={{
          display: "flex",
          flexDirection: "row",
          // border: "1px solid  black ",
          marginTop: "10px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 230, marginLeft: "10px" }}>
            <SearchTextField
              value={data?.fullName}
              readOnlyValue={!editableField[index].fullName}
              onSearch={() => {
                if (editableField[index].fullName) {
                  handleOpenEmployeeModal();
                  setModelData(FILTER_MODAL_DATA.EMPLOYEE_MODAL);
                }
              }}
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 230, marginLeft: "10px" }}>
            <SearchTextField
              value={data?.jobTitle}
              onSearch={() => {
                handleOpenJob();
                setModelData(FILTER_MODAL_DATA.JOBTITLE_MODAL);
              }}
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <Dropdown
              id="Bussiness Unit"
              data={jobFamily?.jobFamilyArray}
              caller={onJobtileChange}
              month={data?.jobFamily}
              getoptionlabelkey="jobFamily"
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <SearchTextField
              value={data?.employeeCatogery}
              onSearch={() => {
                handleOpenEmpCatgory();
                setModelData(FILTER_MODAL_DATA.EMPLOYEE_CATEGORY_MODAL);
              }}
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 230, marginLeft: "10px" }}>
            <SearchTextField
              value={data?.departmentName}
              readOnlyValue={!editableField[index].departmentName}
              onSearch={() => {
                if (editableField[index].departmentName) {
                  handleOpenDepartment();
                  setModelData(FILTER_MODAL_DATA.DEPARTMENT_MODAL);
                }
              }}
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 230, marginLeft: "10px" }}>
            <SearchTextField
              value={data?.subDepartmentName}
              onSearch={() => {
                handleOpenSubDepartment();
                setModelData(FILTER_MODAL_DATA.SUB_DEPARTMENT_MODAL);
              }}
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 250, marginLeft: "10px" }}>
            <Dropdown
              id="Bussiness Unit"
              data={BussinessData?.BussinessArray}
              caller={handleBuisiness}
              month={data?.businessUnit}
              getoptionlabelkey="businessUnitName"
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <Dropdown
              data={LegalEntity}
              caller={onentityChange}
              month={data?.legalEntity}
              getoptionlabelkey="name"
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <Dropdown
              data={payrollData?.payrollDataArray}
              caller={onPayrollChange}
              month={data?.payroll}
              getoptionlabelkey="payrollName"
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <Dropdown
              data={shitftType?.shitftTypeArray}
              caller={onShiftChange}
              month={data?.shiftType}
              getoptionlabelkey="shiftType"
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <Dropdown
              data={EmployeeType?.EmployeeTypeArray}
              caller={onEmployeeChange}
              month={data?.employeeType}
              getoptionlabelkey="value"
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <Dropdown
              data={gender?.genderArray}
              caller={onGenderChnage}
              month={data?.gender}
              getoptionlabelkey="value"
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <SearchTextField
              value={data?.religion}
              onSearch={() => {
                handleOpenReligion();
                setModelData(FILTER_MODAL_DATA.RELIGION_MODAL);
              }}
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <SearchTextField
              value={data?.nationality}
              onSearch={() => {
                handleOpenNationality();
                setModelData(FILTER_MODAL_DATA.NATIONALITY_MODAL);
              }}
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <Dropdown
              data={IncludeType?.IncludeTypeArray}
              caller={onInclueChange}
              month={data?.includeExcludeFag}
              getoptionlabelkey="value"
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box
            style={{
              width: 200,
              marginLeft: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <CustomTextField
              value={hierarchyLevel}
              textAlign="Right"
              onChange={(e) => handleHeirarchy(e)}
            />
            <KeyboardArrowUpIcon
              style={{ cursor: "pointer" }}
              onClick={() => incrementHierarachy()}
            />
            <KeyboardArrowDownIcon
              style={{ cursor: "pointer" }}
              onClick={() => decrementHierarachy()}
            />
          </Box>
        </Grid>
        <Grid
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            backgroundColor: "white",
          }}
        >
          <Box
            style={{
              width: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "black",
              marginTop: "5px",
            }}
          >
            <DoDisturbOnIcon
              style={{
                cursor: "pointer",
                color: "red",
                fontSize: "24px",
                textAlign: "center",
              }}
              onClick={() => handleDeleteProfileCriteria()}
            />
          </Box>
        </Grid>
      </Grid>
      {/* {openEmployee && (
        <UserModal
          toggleHandler={setOpenEmployee}
          handelEmployeechange={handleChangeUser}
          open={openEmployee}
        />
      )} */}
      {modalData && (
        <CustomFilterModal
          modalData={modalData}
          togglerhandler={() => setModelData(null)}
          // onFilter={onFilter}
        />
      )}

      {/* {job && (
        <JobModal
          jobTitle={JobTitle}
          toggleHandler={setJob}
          handleChangeData={handleChangeJob}
          open={openEmployee}
        />
      )} */}

      {/* {empCatgory && (
        <EmpModal
          toggleHandler={setEmpCatgory}
          handleChangeData={handleChangeEmployeeCategory}
          open={empCatgory}
          employeeCategory={employeeCategory}
        />
      )} */}
      {/* {department && (
        <Departmentmodal
          toggleHandler={setDepartment}
          handleChangeData={handleChangeDepartment}
          open={department}
          departmentArr={departmentArr}
        />
      )} */}
      {/* {subDepertment && (
        <SubDepertment
          toggleHandler={setSubDepertment}
          handleChangeData={handleChangeSubDepartment}
          open={subDepertment}
          subDepartmentArr={subDepartmentArr}
        />
      )} */}
      {/* {religion && (
        <Religion
          toggleHandler={setReligion}
          handleChangeData={handleChangeReligion}
          open={religion}
          religionData={religionData}
        />
      )} */}
      {/* {nationality && (
        <NationalityModal
          toggleHandler={setnationality}
          handleChangeData={handleChangeNationality}
          open={nationality}
          citizenData={citizenData}
        />
      )} */}
    </>
  );
};

export default AddProfileCriteria;
