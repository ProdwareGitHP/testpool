import InfoIcon from "@mui/icons-material/Info";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { CustomPage } from "../../../components/CustomPage";
import FilteredEmployeelist from "../FilteredEmployeelist";

import CustomSearch from "../../../components/CustomSearch";
import EvoDataGrid from "../../../components/EvoDataGrid";
import { UseScheduleProfileData } from "../../../services/accesscontrol";
import ManageProfileModal from "./ManageProfileModal";
import getTemplate from "../../../components/getTemplate";

const ManageSchedulerProfile = () => {
  const classes = useStyles();
  const [tableRows, setTableRows] = useState([]);

  const [openEmployeeList, setOpenEmployeeList] = useState(false);
  const [editData, setEditData] = useState({});
  const [errorProps, setErrorProps] = useState({});
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const handleOpenFilterModal = (item) => {
    setOpenEmployeeList(true);
    setEditData(item);
  };
  const searchMock = [
    {
      name: "Profile",
      key: "profileName",
      value: profile,
      type: "lookup",

      editorProps: {
        template: getTemplate("SCHEDULER_PROFILE_TEMPLATE"),
        columnKey: "profileName",
        selectItem: setProfile,
      },
    },
    {
      key: "owners",
      type: "lookup",

      label: "User",
      value: user,

      editorProps: {
        template: getTemplate("USER_TEMPLATE"),
        columnKey: "fullName",
        selectItem: setUser,
      },
    },
  ];

  const {
    data: orignalProfileList,
    isLoading,
    refetch: getAllProjectRefetch,
  } = UseScheduleProfileData();

  useEffect(() => {
    if (orignalProfileList) {
      setTableRows(orignalProfileList);
    }
  }, [orignalProfileList]);

  const tableColumns = [
    { key: "profileName", name: "Profile", width: 150 },
    { key: "startDate", name: "Start Date", width: 150, type: "date" },
    { key: "endDate", name: "End Date", width: 150, type: "date" },
    { key: "owners", name: "Owners", width: 250 },
    { key: "lastUpdateBy", name: "Last Updated By", width: 250 },
    {
      key: "lastUpdateDate",
      name: "Last Updated On",
      width: 200,
      type: "datetime",
    },
    {
      key: "filteredWorkforce",
      name: "Filtered Workforce",
      type: "icon",
      width: 150,
      renderCell({ row }) {
        return (
          <Box className={classes.icon}>
            <InfoIcon
              onClick={() => handleOpenFilterModal(row)}
              style={{
                color: "#71b7f9",
                cursor: "pointer",
                fontSize: "22px",
              }}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <CustomPage
        title="Manage Profile"
        isLoading={isLoading}
        snakeBarProps={errorProps}
      >
        <>
          <CustomSearch
            columns={searchMock}
            setFilterData={setTableRows}
            data={orignalProfileList}
          />
          <EvoDataGrid
            columns={tableColumns}
            rows={tableRows}
            RowEditorModal={(props) => (
              <ManageProfileModal
                {...props}
                getAllProjectRefetch={getAllProjectRefetch}
                setErrorProps={setErrorProps}
              />
            )}
            CreatorModal={(props) => (
              <ManageProfileModal
                {...props}
                getAllProjectRefetch={getAllProjectRefetch}
                setErrorProps={setErrorProps}
              />
            )}
          />
        </>
      </CustomPage>

      {openEmployeeList && (
        <FilteredEmployeelist
          toggleHandler={setOpenEmployeeList}
          editData={editData}
        />
      )}

      {/* {openUser && (
        <UserModal
          toggleHandler={setOpenUser}
          handelEmployeechange={handleChangeUser}
          // user={user}
          open={openUser}
        />
      )} */}
    </>
  );
};

const useStyles = makeStyles(() => ({
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    width: "100%",
    margin: "5px",
    maxHeight: "350px",
    minHeight: "fit-content",
  },
  innermainbox: {
    display: "inline-block",
    width: "100%",
    verticalAlign: "top",
    overflowY: "scroll",
  },
  innerboxworkduration: {
    display: "flex !important",
    padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    // position: "fixed",
    width: "100%",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  EditIcon: {
    color: "#124590",
    fontSize: "20px",
    cursor: "pointer",
    marginTop: "5px",
    marginLeft: "5px",
  },
  ActionBox: {
    width: "5%",
    display: "flex",
    alignItems: "center",
  },
  common: {
    width: "10%",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    width: "10%",
    paddingTop: "5px",
    margin: "auto",
  },
  profile: {
    width: "15%",
    display: "flex",
    alignItems: "center",
  },
  owners: {
    width: "20%",
    display: "flex",
    alignItems: "center",
  },
}));

export default ManageSchedulerProfile;
