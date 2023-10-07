import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

export const CopyButton = (props) => {
  var { editData: editDataProp, item } = props;
  var data = { ...editDataProp };
  data.demandTemplateIdToCopy = data.demandTemplateId;
  data.validFrom = null;
  data.validTo = null;
  data.demandTemplateName = "";
  delete data.demandTemplateId;

  const { Editor: EditComponentModal, onUpdated, tooltip } = item;
  const [editData, setEditData] = useState();

  const handleOpenModal = () => setEditData(data);
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
      <Tooltip title={tooltip || "Copy"}>
        <FileCopyIcon
          className={classes.icon}
          onClick={() => handleOpenModal()}
        />
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
