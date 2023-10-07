import React from "react";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Box, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { EvoButton } from "../../../components/EvoButton";
import { useGetRequestList } from "../../../services/team";
import EvoDataGrid from "../../../components/EvoDataGrid";
import { useState } from "react";
import { RequestCreateModal } from "./RequestCreateModal";
import { RequestViewModal } from "./RequestViewModal";

const RequestCreator = ({ userid, person, setSnakeBarProps }) => {
  const classes = useStyles();

  const [createRequest, setCreateRequest] = useState(false);
  const [requestItemData, setRequestItemData] = useState({});
  const [requesPreview, setRequesPreview] = useState(false);
  // const [snakeBarProps, setSnakeBarProps] = useState({});

  const {
    data: requestData,
    isLoading,
    refetch,
  } = useGetRequestList({
    personId: userid,
  });

  const createrequesthandler = () => {
    setCreateRequest(false);
    refetch();
    setSnakeBarProps({
      msz: "Request created successfully",
      type: "success",
    });
  };

  const requestDetaisClickHandler = (item) => {
    setRequestItemData(item);
    setRequesPreview(true);
  };

  const tableColumns = [
    {
      name: "Details",
      key: "details",
      type: "icon",
      width: 80,
      renderCell: ({ row }) => {
        return (
          <Box className={classes.checkboxParent}>
            <Tooltip title="View Request">
              <MarkunreadMailboxIcon
                className={classes.checkboxicon}
                onClick={() => requestDetaisClickHandler(row)}
              />
            </Tooltip>
          </Box>
        );
      },
    },
    { name: "Request Type", key: "requestName", width: 180 },
    { name: "Start Date", key: "dateStart", type: "date" },
    { name: "End Date", key: "dateEnd", type: "date" },
    { name: "Time/Hours", key: "times" },
    { name: "Creation Date", key: "createdOn", type: "date" },
    { name: "Status", key: "status" },
  ];

  return (
    <>
      <EvoDataGrid
        columns={tableColumns}
        rows={requestData}
        HeaderComponent={() => (
          <Box>
            <EvoButton
              btnText="Create Request"
              startIcon={<NoteAddIcon />}
              onClick={() => setCreateRequest(true)}
            />
          </Box>
        )}
      />
      {createRequest && (
        <RequestCreateModal
          onClose={setCreateRequest}
          onCreate={createrequesthandler}
          person={person}
        />
      )}

      {requesPreview && (
        <RequestViewModal
          togglerHandler={setRequesPreview}
          requestData={requestItemData}
        />
      )}
    </>
  );
};

export default RequestCreator;

const useStyles = makeStyles(() => ({
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    fontSize: "14px",
    "& p": {
      // borderRight: '1px solid #979991',
      textAlign: "center",
      fontSize: "14px",
      padding: "10px",
    },
  },
  headerdata: {
    borderBottom: "1px solid #E9E9E9",
    padding: "1px",
    fontSize: "14px",
    "& p": {
      // borderRight: '1px solid #979991',
      paddingLeft: "5px",
      textAlign: "center",
      fontSize: "14px",
    },
  },
  checkboxicon: {
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
}));
