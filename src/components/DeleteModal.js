import { Grid, Typography } from "@mui/material";
import React from "react";
import { CustomDialog } from "./CustomDialog";

const DeleteModal = (props) => {
  const { title, toggleHandler, onDelete, text, isLoading } = props;

  const handleClose = () => {
    toggleHandler(false);
  };
  const textWithId = `Are you sure you want to delete ${text}?`;

  return (
    <>
      <CustomDialog
        maxWidth="md"
        title={title}
        open={true}
        handleClose={handleClose}
        isLoading={isLoading}
        actions={{
          onDelete: onDelete,
          onCancel: handleClose,
        }}
      >
        <Grid>
          <Typography>
            {text ? textWithId : "Are you sure you want to delete?"}
          </Typography>
        </Grid>
      </CustomDialog>
    </>
  );
};
DeleteModal.defaultProps = {
  text: "",
  onDelete: () => {},
  toggleHandler: () => {},
  title: "Confirm Delete",
  isLoading: false,
};

export default DeleteModal;
