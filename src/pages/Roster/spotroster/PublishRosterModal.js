import React from "react";
import { CustomDialog } from "../../../components/CustomDialog";
import { EvoHBox } from "../../../components/EvoBox";
import CustomCheckBox from "../../../components/CustomCheckBox";
import { Typography } from "@mui/material";

const PublishRosterModal = (props) => {
  const { setStatus1, resetChecked } = props;
  const handleClose1 = () => {
    setStatus1(0);
    if (resetChecked) {
      resetChecked();
    }
  };
  return (
    <CustomDialog
      maxWidth="md"
      title="Publish Roster"
      open={true}
      handleClose={handleClose1}
      actions={{ onPublish: "" }}
    >
      <EvoHBox>
        <CustomCheckBox />
        <Typography sx={{ fontSize: "14px", fontFamily: "Inter" }}>
          Send email notification for roster?
        </Typography>
      </EvoHBox>
    </CustomDialog>
  );
};

export default PublishRosterModal;
