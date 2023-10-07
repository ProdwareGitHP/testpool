import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomCheckBox from "../../../components/CustomCheckBox";
import { CustomFilterModal } from "../../../components/CustomFilterModal";
import Dropdown from "../../../components/EvoDropDown";
import EvoLookup from "../../../components/EvoLookup";
import getTemplate from "../../../components/getTemplate";
import { userRoleMock } from "../../RosterRules/Utils";

const AddUser = (props) => {
  const {
    handleDeleteCriteria,
    number,
    addUser,
    setAddUser,
    item,
    index,
    setAllowAdd,
  } = props;
  const commonReducer = useSelector((state) => state.commonReducer);
  const [user, setUser] = useState({});

  console.log(addUser, "addUser");
  const [openEmployee, setOpenEmployee] = useState(false);
  const [userRoleType, setuserRoleType] = useState({
    userRoleTypeArray: userRoleMock,
    userRoleTypeObj: {},
    userType: "",
  });
  const handleOpenEmployeeModal = () => {
    setOpenEmployee(true);
  };

  const handleChangeCheckBox = (e) => {
    const changeval = [...addUser];
    let rData = changeval[index];
    rData["canCreate"] = e ? "Y" : "N";
    setAddUser(changeval);
  };
  const handleUserRole = (index, val, e) => {
    const changeRow = [...addUser];
    for (let i = 0; i < userRoleType?.userRoleTypeArray.length; i++) {
      if (userRoleType?.userRoleTypeArray[i].userType == val) {
        changeRow[index].userType = userRoleType?.userRoleTypeArray[i].userType;
      }
    }
    setAddUser(changeRow);
  };
  const [modalData, setModelData] = useState(null);
  const handleChangeUser = (item) => {
    setUser(item);
    const onOptionChange = (value) => {
      handleUserRole(index, value);
    };

    return (
      <>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            border: "3px solid #ededed",
            padding: "2px",
            marginTop: "5px",
          }}
        >
          <Box
            style={{
              width: "10%",
              padding: "2px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                textAlign: "center",
              }}
            >
              {number}
            </Typography>
          </Box>
          <Box
            style={{
              width: "62%",
              borderLeft: "3px solid #ededed",
              padding: "2px",
            }}
          >
            <EvoLookup
              item={user}
              selectItem={(item) => {
                handleChangeUser(item);
              }}
              template={getTemplate("EMPLOYEE_TEMPLATE")}
              columnKey={"personName"}
            />
          </Box>
          <Box
            style={{
              width: "62%",
              borderLeft: "3px solid #ededed",
              padding: "2px",
            }}
          >
            <Dropdown
              id="Citizenship"
              data={userRoleType?.userRoleTypeArray}
              caller={onOptionChange}
              month={item?.userType}
              getoptionlabelkey="userType"
            />
          </Box>
          <Box
            style={{
              width: "25%",
              borderLeft: "3px solid #ededed",
              padding: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomCheckBox check={true} disabled={true} />
          </Box>
          <Box
            style={{
              width: "34%",
              borderLeft: "3px solid #ededed",
              padding: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomCheckBox
              check={item?.canCreate === "Y" ? true : false}
              onChangeCheck={(e) => {
                handleChangeCheckBox(e);
              }}
            />
          </Box>
          <Box
            style={{
              width: "23%",
              borderLeft: "3px solid #ededed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DoDisturbOnIcon
              style={{
                cursor: "pointer",
                color: "red",
                fontSize: "24px",
                textAlign: "center",
              }}
              onClick={handleDeleteCriteria}
            />
          </Box>
        </Box>

        {modalData && (
          <CustomFilterModal
            modalData={modalData}
            togglerhandler={() => setModelData(null)}
          />
        )}
      </>
    );
  };
};

export default AddUser;
