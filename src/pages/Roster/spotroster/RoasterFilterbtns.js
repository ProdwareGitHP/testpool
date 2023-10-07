import React, { useState } from "react";
import { useSelector } from "react-redux";
import { EvoButton } from "../../../components/EvoButton";
import { Cancel, Done } from "@mui/icons-material";
import MarkAsAprroveModal from "./MarkAsAprroveModal";

const RoasterFilterbtns = ({
  apprStatus,
  setSnakeBarRosterProps,
  checked,
  sendApprovalMutate,
  markApprovedMutate,
}) => {
  const commonReducer = useSelector((state) => state.commonReducer);
  const [openStatus, setOpenStatus] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState();

  const handleButtonClick = (e, title) => {
    setOpenStatus(e);
    setTitle(title);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setComment("");
  };
  let pData = {
    userId: commonReducer.userId,
    startDate: commonReducer.startDate,
    endDate: commonReducer.endDate,
    profileId: commonReducer.selectedProjectObj.profileId,
    employeeNumbers: checked,
    comments: comment,
  };
  const handleSendForApproval = () => {
    if (checked.length === 0) {
      setSnakeBarRosterProps({
        msz: "Select atleast one Employee!",
        type: "error",
      });
      return;
    }

    sendApprovalMutate(pData);
  };
  const handleMarkApproved = () => {
    markApprovedMutate({ ...pData, action: "APPROVED" });
  };
  const handleSendForCorrection = () => {
    markApprovedMutate({ ...pData, action: "RMI" });
  };
  const handleChangeCorrection = () => {
    markApprovedMutate({ ...pData, action: "SUBMIT" });
  };
  return (
    <>
      {apprStatus === "D" && (
        <EvoButton
          btnText="Send for approval"
          startIcon={<Done />}
          onClick={handleSendForApproval}
          style={{
            fontSize: "14px",
            backgroundColor: "#124590",
            textTransform: "Capitalize",
            fontFamily: "Inter",
          }}
        />
      )}
      {apprStatus === "C" &&
        commonReducer.selectedProjectObj.role !== "Approver" && (
          <>
            <EvoButton
              btnText="Send for approval"
              startIcon={<Done />}
              onClick={() => {
                if (checked.length === 0) {
                  setSnakeBarRosterProps({
                    msz: "Select atleast one Employee!",
                    type: "error",
                  });
                  return;
                }
                handleButtonClick(3, "Send For Approval After Correction");
              }}
              style={{
                fontSize: "14px",
                backgroundColor: "#124590",
                textTransform: "Capitalize",
                fontFamily: "Inter",
              }}
            />
            {/* <EvoButton
              btnText="Withdraw"
              onClick={() => {
                if (checked.length === 0) {
                  setSnakeBarRosterProps({
                    msz: "Select atleast one Employee!",
                    type: "error",
                  });
                  return;
                }
                handleButtonClick(4, "Withdraw");
              }}
              startIcon={<Cancel sx={{ color: "red" }} />}
              style={{
                fontSize: "14px",
                backgroundColor: "#124590",
                textTransform: "Capitalize",
                fontFamily: "Inter",
              }}
            /> */}
          </>
        )}
      {apprStatus === "PA" &&
        commonReducer.selectedProjectObj.role === "Approver" && (
          <>
            <EvoButton
              btnText="Mark As Approved"
              onClick={() => {
                if (checked.length === 0) {
                  setSnakeBarRosterProps({
                    msz: "Select atleast one Employee!",
                    type: "error",
                  });
                  return;
                }
                handleButtonClick(1, "Mark As Approved");
              }}
              startIcon={<Done />}
              style={{
                fontSize: "14px",
                backgroundColor: "#124590",
                textTransform: "Capitalize",
                fontFamily: "Inter",
              }}
            />
            <EvoButton
              btnText="Send For Correction"
              onClick={() => {
                if (checked.length === 0) {
                  setSnakeBarRosterProps({
                    msz: "Select atleast one Employee!",
                    type: "error",
                  });
                  return;
                }
                handleButtonClick(2, "Send For Correction");
              }}
              startIcon={<Done />}
              style={{
                fontSize: "14px",
                backgroundColor: "#124590",
                textTransform: "Capitalize",
                fontFamily: "Inter",
              }}
            />
          </>
        )}

      {isModalOpen && (
        <MarkAsAprroveModal
          setOpenStatus={setOpenStatus}
          openStatus={openStatus}
          comment={comment}
          setComment={setComment}
          handleMarkApproved={handleMarkApproved}
          handleSendForCorrection={handleSendForCorrection}
          handleChangeCorrection={handleChangeCorrection}
          title={title}
          handleClose={closeModal}
        />
      )}
    </>
  );
};

export default RoasterFilterbtns;
