import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { makeStyles } from "@mui/styles";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CustomPage } from "../../../components/CustomPage";
import CustomSearch from "../../../components/CustomSearch";
import EvoDataGrid from "../../../components/EvoDataGrid";
import { getWorkPlan, getWorkRotataion } from "../../../services/api";
import ExpireModal from "./ExpireModal";
import NewRotationModal from "./NewRotationModal";
import { useGetWorkRotataion } from "../../../services/rosterapi";
import { useGetAllWorkPlan } from "../../../services/rostersettings";

const ManageWorkRotation = (props) => {
  const classes = useStyles();
  const [expireModal, setExpireModal] = React.useState(false);
  const [workRotationList, setWorkRotationList] = useState([]);
  const [snakeBarPropsLandingPage, setSnakeBarPropsLandingPage] = useState({});
  const [editData, setEditData] = useState("");

  const openExpireModal = (item) => {
    setEditData(item);
    setExpireModal(true);
  };

  //Api for get work rotation
  const {
    data: workRotationOriginalList,
    isLoading: isLoading1,
    refetch: refetchWorkDurationList,
  } = useGetWorkRotataion();

  useEffect(() => {
    if (workRotationOriginalList) {
      setWorkRotationList(workRotationOriginalList);
    }
  }, [workRotationOriginalList]);

  const searchColumns = [
    {
      name: "Work Rotation",
      key: "workrotationName",
      maxLength: 50,
    },
  ];
  const tableColumns = [
    { key: "workrotationName", name: "Work Rotation", width: 200 },
    { key: "startDate", name: "Start From", width: 150 },
    { key: "iterations", name: "No. of Rotation", width: 200 },
    { key: "foreverFlag", name: "Forever Flag", width: 100 },
    {
      key: "expiryDate",
      name: "Expiry Date",
      width: 100,
      renderCell: (props) => {
        const { row } = props;
        return row?.expiryDate == null ? (
          <Box className={classes.ActionBox}>
            <Tooltip title="Expire">
              <AccessTimeFilledIcon
                className={classes.ExpireIcon}
                onClick={() => openExpireModal(row)}
              />
            </Tooltip>
          </Box>
        ) : (
          moment(row?.expiryDate).format("DD-MMM-YYYY")
        );
      },
    },
  ];

  const params = {
    setSnakeBarPropsLandingPage: setSnakeBarPropsLandingPage,
    refetchWorkDurationList: refetchWorkDurationList,
    editData: {
      noRotation: 5,
    },
  };
  NewRotationModal.defaultProps = params;
  console.log("my snakeBarPropsLandingPage", snakeBarPropsLandingPage);

  return (
    <CustomPage
      title={props.title}
      isLoading={isLoading1}
      snakeBarProps={snakeBarPropsLandingPage}
    >
      <>
        <CustomSearch
          columns={searchColumns}
          data={workRotationOriginalList}
          setFilterData={setWorkRotationList}
        />

        <EvoDataGrid
          columns={tableColumns}
          rows={workRotationList}
          RowEditorModal={NewRotationModal}
          CreatorModal={NewRotationModal}
        />
      </>

      {expireModal && (
        <ExpireModal
          editData={editData}
          handleClose={() => setExpireModal(false)}
          refetchWorkDurationList={refetchWorkDurationList}
          setSnakeBarPropsLandingPage={setSnakeBarPropsLandingPage}
        />
      )}
    </CustomPage>
  );
};

export default ManageWorkRotation;

const useStyles = makeStyles(() => ({
  ExpireIcon: {
    color: "red",
    fontSize: "20px",
    cursor: "pointer",
  },
  ActionBox: {
    width: "5%",
    display: "flex",
    alignItems: "center",
    padding: "5px 25px",
  },
}));
