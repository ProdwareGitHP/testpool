import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

export const EditButton = ({ editData: editDataProp, item }) => {
  const { Editor: EditComponentModal, onUpdated, tooltip } = item;
  const [editData, setEditData] = useState();

  const handleOpenModal = () => setEditData(editDataProp);
  const handleClose = () => setEditData(null);
  const handleSuccess = (data) => {
    onUpdated(data);
    handleClose();
  };

  const classes = makeStyles(() => ({
    icon: {
      color: "#124590",
      fontSize: "16px",
      cursor: "pointer",
    },
  }))();

  return (
    <>
      <Tooltip title={tooltip || "Edit"}>
        <EditIcon className={classes.icon} onClick={() => handleOpenModal()} />
      </Tooltip>

      {editData && EditComponentModal && (
        <EditComponentModal
          handleClose={handleClose}
          editData={editData}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};
