import { makeStyles } from "@mui/styles";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../../components/CustomDialog";
import {
  submitPayrollAudit,
  submitReadyForPayroll,
} from "../../../services/api";

import React, { useState } from "react";

const ApprovePopUp = (props) => {
  const {
    open,
    handleClose,
    onSuccess,

    subButton,
    submitData,
  } = props;

  const [comments, setComments] = useState("");
  const [snakeBarProps, setSnakeBarProps] = useState({});

  const { userId } = useSelector((state) => state.commonReducer);

  const onError = (error, data) => {
    if (error) {
      setSnakeBarProps({
        msz: "Unable to submit request!",
        details: [error.response?.data?.error],
        type: "error",
      });
    }
  };

  const { mutate: CreateAuditData, isLoading: isSaving1 } = useMutation(
    submitPayrollAudit,
    {
      refetchQueries: [{ query: submitPayrollAudit }],
      onSuccess: onSuccess,
      onError: onError,
    }
  );

  const { mutate: CreateAuditData2, isLoading: isSaving2 } = useMutation(
    submitReadyForPayroll,
    {
      refetchQueries: [{ query: submitReadyForPayroll }],
      onSuccess: onSuccess,
      onError: onError,
    }
  );

  const submitHandler = () => {
    if (submitData.length == 0) {
      setSnakeBarProps({
        msz: "Select atleast one Item",
        type: "error",
      });
      return;
    }

    if (comments.length == 0) {
      setSnakeBarProps({
        msz: "Cannot submit without any comments",
        type: "error",
      });
      return;
    }

    let temp = {
      userId: userId,
      payrollAuditId: submitData,
      comments: comments,
    };

    setSnakeBarProps(null);
    if (subButton == "Submit") {
      CreateAuditData({ ...temp, action: "SUBMIT" });
    } else {
      if (subButton == "RequestForCorrection") {
        CreateAuditData2({ ...temp, action: "RMI" });
      } else if (subButton == "ReadyForPayroll") {
        CreateAuditData2({ ...temp, action: "APPROVED" });
      } else if (subButton == "Transferred") {
        CreateAuditData2({ ...temp, action: "APPROVED" });
      }
    }
  };

  const classes = useStyles();
  const commentHandler = (e) => {
    setComments(e.target.value);
  };

  return (
    <CustomDialog
      title={"Approve"}
      handleClose={handleClose}
      open={open}
      maxWidth="xs"
      snakeBarProps={snakeBarProps}
      actions={{
        onOk: submitHandler,
        onCancel: handleClose,
        isSaving: isSaving1 || isSaving2,
      }}
    >
      <div className={classes.commentsCSS}>
        <div>Comments</div>
        <textarea
          style={{ width: "60%" }}
          onChange={commentHandler}
          value={comments}
          rows="5"
          cols="20"
        ></textarea>
      </div>
    </CustomDialog>
  );
};

export default ApprovePopUp;

const useStyles = makeStyles(() => ({
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    height: "35px",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    // minWidth: "150%",
    margin: "5px",
    overflow: "scroll",
    minHeight: "fit-content",
  },
  innermainbox: {
    display: "inline-block",
    minWidth: "100%",
    verticalAlign: "top",
  },
  innerboxworkduration: {
    display: "flex !important",
    padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
  },
  selectButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  commentsCSS: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));
