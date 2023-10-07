import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

export const DeleteButton = ({ deleteData: deleteDataProp, item }) => {
  const { Delete: DeleteComponentModal, onDeleted, tooltip } = item;
  const [deleteData, setDeleteData] = useState();

  const handleDeleteRow = () => {
    setDeleteData(deleteDataProp);
    onDeleted(deleteDataProp?.index);
  };
  const handleClose = () => setDeleteData(null);
  const handleSuccess = (data) => {
    onDeleted(data);
    handleClose();
  };

  const classes = makeStyles(() => ({
    icon: {
      color: "red",
      fontSize: "15px",
      //marginLeft: "15px",
      // marginTop: "5px",
      cursor: "pointer",
    },
  }))();

  return (
    <>
      <Tooltip title={tooltip || "Delete"}>
        <RemoveCircleIcon
          className={classes.icon}
          onClick={() => handleDeleteRow()}
        />
      </Tooltip>

      {deleteData && DeleteComponentModal && (
        <DeleteComponentModal
          handleClose={handleClose}
          deleteData={deleteData}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};
