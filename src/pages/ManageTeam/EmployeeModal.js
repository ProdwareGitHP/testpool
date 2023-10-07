import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { CustomDialog } from "../../components/CustomDialog";
import CustomFilterList from "../../components/CustomFilterList";
import EvoDataGrid from "../../components/EvoDataGrid";
import { createManageTeamMember } from "../../services/api";
import Dropdown from "../../components/EvoDropDown";

const ManageTeamMemberModal = (props) => {
  const {
    toggleHandler,
    rows,
    refetchTableData,
    setSnakeBarPropsManageTeam,
    oriPagedata,
    tableRows,
    setTableRows,
  } = props;
  const [mapPersonIdsToTeamMembers, setMapPersonIdsToTeamMembers] = useState({
    personId: null,
    teamId: null,
  });
  const [snakeBarPropsEmployeeModal, setSnakeBarPropsEmployeeModal] = useState(
    {}
  );
  const [isLoadingBut, setIsLoadingBut] = useState(false);
  const [filter, setFilter] = useState([]);

  const handleClose = () => {
    toggleHandler(false);
  };
  //Api for create team
  const { mutate: CreateManageTeamMemberMutate } = useMutation(
    createManageTeamMember,
    {
      onSuccess: (data, context, variables) =>
        onSuccessCreateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorCreateRequest(data, context, variables),
    }
  );

  const onSuccessCreateRequest = (data) => {
    if (data) {
      setSnakeBarPropsManageTeam({
        msz: "Team Members Saved Successfully.",
        type: "success",
      });

      setIsLoadingBut(false);
      toggleHandler(false);
      refetchTableData();
    }
  };

  const onErrorCreateRequest = (error) => {
    if (error) {
      setSnakeBarPropsEmployeeModal({
        msz: "Unable to update request",
        type: "error",
      });

      toggleHandler(true);
      setIsLoadingBut(false);
    }
  };
  const saveHandler = () => {
    // var keys = Object.keys(mapPersonIdsToTeamMembers);

    // if (keys.length) {
    //   let finalBodyData = {
    //     personIdTeamIdMap: {},
    //   };

    //   keys.length &&
    //     keys?.map((key) => {
    //       finalBodyData.personIdTeamIdMap[key] = mapPersonIdsToTeamMembers[key];
    //     });
    var pdata = {
      personId: mapPersonIdsToTeamMembers.personId,
      teamId: mapPersonIdsToTeamMembers.teamId,
    };
    setIsLoadingBut(true);
    CreateManageTeamMemberMutate(pdata);
    // } else {
    //   setSnakeBarPropsEmployeeModal({
    //     msz: "Please select the Team!",
    //     type: "error",
    //   });
    // }
  };

  const filterButtons = [
    {
      btnName: "Employee",
      filterKey: "employeeNumber",
      filterId: "employeeNumber",
      type: "Employee",
      columns: [
        {
          name: "Employee Number",
          key: "employeeNumber",
          width: 200,
        },
        {
          name: "Employee",
          key: "personName",
          width: 300,
        },
      ],
    },
    {
      btnName: "Department",
      filterKey: "departmentName",
      filterId: "departmentName",
      type: "Department",
      columns: [
        {
          name: "Department",
          key: "departmentName",
          width: 300,
        },
      ],
    },
    {
      btnName: "Job Title",
      filterKey: "jobTitle",
      filterId: "jobTitle",
      type: "Job Titles",

      columns: [
        {
          name: "Job Title",
          key: "jobTitle",
          width: 300,
        },
      ],
    },
    {
      btnName: "Profile",
      filterKey: "profileName",
      filterId: "profileName",
      type: "Profile",

      columns: [
        {
          name: "Profile",
          key: "profileName",
          width: 300,
        },
      ],
    },
    {
      btnName: "Team",
      filterKey: "teamName",
      filterId: "teamId",
      type: "Team",
      columns: [
        {
          name: "Team",
          key: "teamName",
          width: 300,
        },
      ],
      rows: rows || [],
    },
  ];

  const handleChangeWorkTeamName = (index, item) => {
    setMapPersonIdsToTeamMembers({
      ...mapPersonIdsToTeamMembers,
      personId: tableRows[index].personId,
      teamId: item.teamId,
    });
    var arr = [...teamDropdown];
    arr[index].teamId = item.teamId;
    arr[index].teamName = item.teamName;
    setTeamDropdown(arr);
  };

  const teamsArr = tableRows?.map((item) => {
    return {
      teamId: item.teamId ? item?.teamId : null,
      teamName: item.teamName ? item?.teamName : null,
    };
  });
  const [teamDropdown, setTeamDropdown] = useState(teamsArr);

  const tableColumns = [
    { key: "employeeNumber", name: "Employee Number", width: 180 },
    { key: "personName", name: "Employee", width: 150 },
    { key: "jobTitle", name: "Job", width: 230 },
    { key: "departmentName", name: "Department", width: 250 },
    { key: "profileName", name: "Profile", width: 150 },
    {
      key: "teamId",
      name: "Team",
      width: 200,
      type: "dropdown",
      editorProps: {
        width: 150,
        data: rows,
        selectedId: "teamId",
        caller: handleChangeWorkTeamName,
        getoptionlabelkey: "teamName",
      },
    },
  ];
  const [TableData, setTabledata] = useState([]);

  const filterLocalData = () => {
    let filteredData = tableRows ? [...tableRows] : [];
    if (filter) {
      for (const [key, value] of Object.entries(filter)) {
        filteredData = filteredData?.filter((item) => value.has(item[key]));
      }
    }
    setTabledata(filteredData);
  };

  useEffect(() => {
    filterLocalData();
  }, [filter, tableRows]);

  return (
    <CustomDialog
      title="Manage Team Members"
      maxWidth="lg"
      open="true"
      snakeBarProps={snakeBarPropsEmployeeModal}
      setSnakeBarProps={setSnakeBarPropsEmployeeModal}
      handleClose={handleClose}
      isLoading={isLoadingBut}
      actions={{ onSave: saveHandler, onCancel: handleClose }}
    >
      <CustomFilterList
        filterButtons={filterButtons}
        oriPagedata={tableRows}
        filter={filter}
        setFilter={setFilter}
        multiFilterSelection={false}
      />

      <EvoDataGrid columns={tableColumns} rows={TableData || []} height={300} />
    </CustomDialog>
  );
};

export default ManageTeamMemberModal;
