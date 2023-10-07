import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";

export const ActionButton = ({ data, item }) => {
  const { icon: Icon, ActionModal, onAction, tooltip } = item;
  const [actionData, setActionData] = useState();

  const handleOpenModal = () => setActionData(data);
  const handleClose = () => setActionData(null);
  const handleSuccess = (data) => {
    if (onAction) {
      onAction(data);
    }
    handleClose();
  };
  const onClick =
    "ActionModal" in item ? () => handleOpenModal() : () => onAction(data);
  return (
    <>
      <IconButton disableRipple onClick={onClick}>
        <Tooltip title={tooltip}>
          <Icon style={{ fontSize: "21px", color: "#124590" ,cursor:'pointer'}} />
        </Tooltip>
      </IconButton>
      {actionData && ActionModal && (
        <ActionModal
          handleClose={handleClose}
          data={actionData}
          onAction={handleSuccess}
        />
      )}
    </>
  );
};
