import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomPanel } from "../../../components/CustomPanel";
import data from "./selfRoster.json";
import EvoDataGrid from "../../../components/EvoDataGrid";
import { EvoButton } from "../../../components/EvoButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Tooltip } from "@mui/material";
import { CustomDialog } from "../../../components/CustomDialog";
import { AddSelfRoster } from "./AddSelfRoster";
import { EditSelfRoster } from "./EditSelfRoster";
import { useGetSelfRosters, useGetSelfRostersApprovalHistory, useGetSelfRostersWeeklyWorkDuration,useGetSelfRosterWorkDurationsByPersonId } from "../../../services/roster";
import { useMutation } from "react-query";

const SelfRoster = () => {
  const loggedInUserDetails = useSelector((state) => state.commonReducer);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editInputData, setEditInputData] = useState();
  const [rosterId, setRosterId] = useState(0);
  const [approvalHistory, setApprovalHistory] = useState([]);
  const [weeklySelfRoster, setWeeklySelfRoster] = useState([]);
  const { data: getPublishedRosterByMe = [] } = useGetSelfRostersApprovalHistory({ selfRosterId: rosterId, page: 0, size: 1000 });
  const { data: getWeeklySelfRosterByMe = [] } = useGetSelfRostersWeeklyWorkDuration({ selfRosterId: rosterId, page: 0, size: 1000 });
  useEffect(()=>{
    const updatedState = getWeeklySelfRosterByMe.map((item) => {
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      const formattedStartDate = `${startDate.getDate()} ${startDate.toLocaleString('default', { month: 'short' })}`;
      const formattedEndDate = `${endDate.getDate()} ${endDate.toLocaleString('default', { month: 'short' })}`;
      const week = `${formattedStartDate} - ${formattedEndDate}`;
      const updatedItem = { ...item, week };
      return updatedItem;
    });
    setWeeklySelfRoster(updatedState)
  },[getWeeklySelfRosterByMe])
  function mapInputToObject(inputObject) {
    const editInputData = {
      items: [
        {
          label: "From Date",
          value: inputObject.fromDate,
          required: true,
          type: "text",
          readOnly:true
        },
        {
          label: "To Date",
          value: inputObject.toDate,
          required: true,
          type: "text",
          readOnly:true
        },
        {
          label: "Department",
          value: inputObject.department,
          required: true,
          type: "text",
          readOnly:true
        },
        {
          label: "Job Title",
          value: inputObject.jobTitle,
          required: true,
          type: "text",
          readOnly:true
        },
        {
          label: "Work Location",
          value: inputObject.workLocation,
          required: true,
          type: "text",
          readOnly:true
        },
        {
          label: "Comments",
          value: inputObject.workLocation,
          required: false,
          type: "text",
          readOnly:true
        },
      ],
      gap: 2,
      labelWidth: 120,
    };
    return editInputData;
  }
  const onClickEdit = (row) => {
    try {
      let res = mapInputToObject(row);
      setRosterId(row.selfRosterId)
      setEditInputData(res);
      setShowEditModal(true);
    } catch (error) {

    }
  };

  const onCloseEdit = () => {
    setShowEditModal(false);
  };

  const addSelfRoster = () => {
    setShowAddModal(true);
  };

  const closeAddSelfRosterModal = () => {
    setShowAddModal(false);
  };

  const { data: selfRosters = [],refetch: getSelfRosterRefetch } = useGetSelfRosters({
    personId: loggedInUserDetails.employeeId,
    page:0,
    size:1000
  });

  const columns = [
    {
      name: "Edit",
      key: "edit",
      type: "icon",
      width: 80,
      renderCell: ({ row }) => {
        return (
          <Box sx={styles.checkboxParent}>
            <Tooltip title="Edit">
              <EditIcon sx={styles.editIcon} onClick={() => onClickEdit(row)} />
            </Tooltip>
          </Box>
        );
      },
    },
    { name: "Status", key: "status" },
    { name: "From Date", key: "fromDate" },
    { name: "To Date", key: "toDate" },
    { name: "Department", key: "department" },
    { name: "JobTitle", key: "jobTitle" },
    { name: "WorkLocation", key: "workLocation" },
  ];

  return (
    <CustomPanel title="Self Roster">
      <EvoDataGrid
        columns={columns}
        rows={selfRosters}
        // rows={data.requestData}
        HeaderComponent={() => (
          <Box>
            <EvoButton
              btnText="Self Roster"
              startIcon={<AddIcon />}
              onClick={() => addSelfRoster(true)}
              />
          </Box>
        )}
        />
      {showAddModal && (
        <AddSelfRoster
        closeAddSelfRosterModal={closeAddSelfRosterModal}
        calendarData={data.calendarMockData}
        calendarColumns={data.calendarColumns}
        rosterRefetch={getSelfRosterRefetch}
        />
      )}
      {showEditModal && (
        <EditSelfRoster
          showEditModal={showEditModal}
          onCloseEdit={onCloseEdit}
          calendarData={weeklySelfRoster}
          calendarColumns={data.calendarColumns}
          approvalHistoryMock={getPublishedRosterByMe}
          approvalHistoryColumns={data.approvalHistoryColumns}
          editInputData={editInputData}
        />
      )}
    </CustomPanel>
  );
};

const styles = {
  editIcon: {
    color: "#124590 !important",
    fontSize: "large !important",
    cursor: "pointer !important",
  },
  checkboxParent: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default SelfRoster;
