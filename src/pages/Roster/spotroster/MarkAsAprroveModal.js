import React, { useEffect, useState } from "react";
import { CustomDialog } from "../../../components/CustomDialog";
import { EvoHBox } from "../../../components/EvoBox";
import { EvoDataForm } from "../../../components/EvoDataForm";

const MarkAsAprroveModal = ({
  setOpenStatus,
  openStatus,
  comment,
  setComment,
  handleMarkApproved,
  handleSendForCorrection,
  handleSendForApproval,
  handleChangeCorrection,
  title,
  handleClose,
}) => {
  const handleChangeFunction = () => {
    if (openStatus === 1) {
      handleMarkApproved();
    } else if (openStatus === 2) {
      handleSendForCorrection();
    } else if (openStatus === 3) {
      handleChangeCorrection();
    } else if (openStatus === 4) {
    }
  };

  let formData = {
    items: [
      {
        label: "Comment",
        value: comment,
        onChange: (e) => {
          setComment(e.target.value);
        },
      },
    ],
  };
  return (
    <CustomDialog
      title={title}
      width="sm"
      handleClose={handleClose}
      actions={{ onSave: handleChangeFunction }}
    >
      <EvoDataForm formData={formData} />
    </CustomDialog>
  );
};

export default MarkAsAprroveModal;
