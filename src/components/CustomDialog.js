import { Box, Dialog } from "@mui/material";
import Paper from "@mui/material/Paper";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SaveIcon from "@mui/icons-material/Done";
import {Done, InfoRounded, Logout} from "@mui/icons-material";
import React from "react";
import Draggable from "react-draggable";
import { CustomPanel } from "./CustomPanel";
import { EvoHBox, EvoHNavBox } from "./EvoBox";
import { EvoButton } from "./EvoButton";

function PaperComponent(prop) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Box id="draggable-dialog-title">
        <Paper {...prop} />
      </Box>
    </Draggable>
  );
}

const DialogActions = ({ actions }) => {
  const buttonProps = {
    Filter: { startIcon: <FilterAltIcon /> },
    Save: { startIcon: <SaveIcon /> },
    Delete: { startIcon: <DeleteIcon /> },
    Cancel: {
      startIcon: <CancelIcon />,
      onClick: () => actions.onCancel(false),
      variant: "outlined",
    },
    Approve: { startIcon: <Done /> },
    Submit: { startIcon: <Done /> },
    ['Request More Info']: { startIcon: <InfoRounded /> },
    Forward: { startIcon: <Logout /> },
  };

  return (
    <EvoHBox>
      {Object.keys(actions).map((onKey) => {
        let key = onKey.replace("on", "");
        return (
          <EvoButton
            btnText={key}
            onClick={actions[onKey]}
            {...buttonProps[key]}
          />
        );
      })}
    </EvoHBox>
  );
};

export const CustomDialog = ({
  handleClose,
  fullScreen,
  width,
  actions = {},
  ...props
}) => {
  const { isSaving, ...allActions } = actions;

  const onClose = (event, reason) => {
    if (reason !== "backdropClick") {
      handleClose(event, reason);
    }
  };

  const FooterComponent = actions
    ? () => <EvoHNavBox Right={<DialogActions actions={allActions} />} />
    : null;

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      maxWidth={false}
      onClose={onClose}
      {...props}
    >
      <CustomPanel
        // headerStyle={{ cursor: "move" }}
        contentStyle={{ maxHeight: "70vh", width: width }}
        FooterComponent={FooterComponent}
        onClose={handleClose}
        isSaving={isSaving}
        {...props}
      />
    </Dialog>
  );
};
