import { Box, Tooltip } from "@mui/material";
// import { Stack, Typography, CircularProgress } from "@mui/material";

import React, { useEffect, useState } from "react";
// import AddIcon from '@mui/icons-material/Add';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import { makeStyles } from "@mui/styles";
import { useQuery } from "react-query";
import { EvoButton } from "../../components/EvoButton";
import { useSelector } from "react-redux";
import { CustomPage } from "../../components/CustomPage";
import { EvoHBox } from "../../components/EvoBox";
import EvoDataGrid from "../../components/EvoDataGrid";
import ManageTeamMemberModal from "./EmployeeModal";
import ManageTeamModal from "./ManageTeamModal";
import {
  useGetManageTeamData,
  useGetTeamTableData,
} from "../../services/manageteam";
import { useGetWorkDuration } from "../../services/roster";

export default function IndexMT(props) {
  const classes = useStyles();
  const { userId } = useSelector((state) => state.commonReducer);
  const [toggle, setToggle] = React.useState(false);
  const [editData, setEditData] = useState();
  // const [isLoading, setIsLoading] = useState(true);

  const [snakeBarPropsManageTeam, setSnakeBarPropsManageTeam] = useState({});
  const [openTeamModal, setOpenTeamModal] = useState(false);

  const [employeeTable, setEmployeeTable] = useState([]);

  const openEdit = async (item) => {
    setEditData(item);
    setOpenTeamModal(true);
  };

  const {
    data: manageTeamData,
    refetch: getAllProjectRefetch,
    isLoading,
  } = useGetManageTeamData();

  const workDurationSelector = (arr) => {
    return arr.map((item) => {
      return {
        id: item.workDurationId,
        label: item.workDurationCode,
        value: item.workDurationCode,
      };
    });
  };

  const { data: workDurationArr } = useGetWorkDuration(
    {},
    workDurationSelector
  );

  const employeeSelector = (arr) => {
    return arr.map((item, index) => {
      var res = { ...item, index };
      if (index === 0) {
        res = { ...res };
      }
      return res;
    });
  };

  const { data: employeeTeamData, refetch: refetchTableData } =
    useGetTeamTableData(
      { userId: userId },
      employeeSelector,
      userId === undefined
    );

  useEffect(() => {
    if (employeeTeamData) {
      setEmployeeTable(employeeTeamData);
    }
  }, [employeeTeamData]);

  const tableColumns = [
    {
      key: "action2",
      name: "Action",
      width: 80,
      renderCell: (props) => {
        const { row } = props;
        return (
          <Box className={classes.ActionBox}>
            <Tooltip title="View/Edit">
              <EditIcon
                className={classes.EditIcon}
                onClick={() => {
                  openEdit(row);
                }}
              />
            </Tooltip>
          </Box>
        );
      },
    },
    { key: "teamName", name: "Team", width: 200 },
    { key: "openFormName", name: "Active From Day", width: 200 },
    { key: "openDays", name: "Active Days", width: 100 },
    { key: "enabled", name: "Enable", width: 80 },
  ];

  const headerButtons = [
    {
      name: "Team",
      onClick: () => openEdit(),
    },
    { name: "Employee", onClick: () => setToggle(true) },
  ];

  return (
    <CustomPage
      title={props.title}
      isLoading={isLoading}
      snakeBarProps={snakeBarPropsManageTeam}
    >
      <EvoDataGrid
        columns={tableColumns}
        rows={manageTeamData}
        boxStyle={{ marginTop: "15px", marginBottom: "15px" }}
        HeaderComponent={() => (
          <EvoHBox>
            {headerButtons.map((btn, index) => {
              return (
                <EvoButton
                  key={index}
                  startIcon={<AddIcon />}
                  btnText={btn.name}
                  onClick={btn.onClick}
                />
              );
            })}
          </EvoHBox>
        )}
      />

      {openTeamModal && (
        <ManageTeamModal
          toggleHandler={setOpenTeamModal}
          workDurationArr={workDurationArr}
          editData={editData}
          getAllProjectRefetch={getAllProjectRefetch}
          snakeBarPropsManageTeam={snakeBarPropsManageTeam}
          setSnakeBarPropsManageTeam={setSnakeBarPropsManageTeam}
        />
      )}
      {toggle && (
        <ManageTeamMemberModal
          toggleHandler={setToggle}
          rows={manageTeamData}
          oriPagedata={employeeTeamData}
          tableRows={employeeTable}
          setTableRows={setEmployeeTable}
          refetchTableData={refetchTableData}
          setSnakeBarPropsManageTeam={setSnakeBarPropsManageTeam}
        />
      )}
    </CustomPage>
  );
}
const useStyles = makeStyles((theme) => ({
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
  grid2: {
    background: "white",
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
    cursor: "pointer",
  },
  Wrap: {
    display: "flex",
    marginTop: "20px !important",
    // borderBottom: "1px solid rgb(233, 233, 233)",
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
    textAlign: "center",
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
    width: "100%",
    border: "1px solid rgb(233, 233, 233)",
    // padding: "39px !important",
    marginTop: "25px!important",
    padding: "25px!important",
    borderRadius: "0px !important",
    backgroundColor: "white !important",
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
  ActionBox: {
    marginTop: "3px",
    // width: "8.5%",
    // display: "flex",
    // alignItems: "center",
  },
  EditIcon: {
    color: "#124590",
    fontSize: "20px",
    cursor: "pointer",
    marginLeft: "5px",
  },
}));
