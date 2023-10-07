import { Box } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../../components/CustomDialog";
import { createRequestData } from "../../../services/api";
import { dateConverter, timeConverter } from "../../../utils/commonService";
import { RequestDetail } from "./RequestDetail";
import * as requestProcessor from "./requestProcessor";
import moment from "moment";

export const RequestCreateModal = (props) => {
  const { onClose, onCreate, person, title } = props;
  const { userId } = useSelector((state) => state.commonReducer);
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [requestData, setRequestData] = useState({
    effectiveDate: new Date(),
    dateStart: new Date(),
    dateEnd: new Date(),
    timeStart: timeConverter(person?.schTimeStart),
    timeEnd: timeConverter(person?.schTimeEnd),
    personId: person?.personId,
  });
  console.log(requestData);
  const { mutate: CreateRequestMutate, isLoading: isSaving } = useMutation(
    createRequestData,
    {
      onSuccess: (data) => {
        if (data) {
          onCreate();
        } else {
          setSnakeBarProps({
            msz: "Unable to create request!",
            details: data?.data?.msg,
            type: "error",
          });
        }
      },
      onError: (error, data) => {
        if (error) {
          setSnakeBarProps({
            msz: "Unable to create request!",
            details: [error.response?.data?.status?.description],
            type: "error",
          });
        }
      },
    }
  );
  const submitclickhandler = () => {
    try {
      if (!requestData?.reqCode) {
        throw "Request Type is required";
      }

      let methodName = "createParams_" + requestData?.reqCode;
      let params = requestProcessor[methodName](requestData);

      var pData = {
        timeHour: "T",
        requestMasterId: requestData.requestMasterId,
        personId: person?.personId,
        createdBy: userId + "",
        lastUpdatedBy: userId,
        status: "SUBMIT",
        dmlMode: "INS",
        ...params,
      };

      setSnakeBarProps(null);
      CreateRequestMutate(pData);

      return;
    } catch (error) {
      setSnakeBarProps({
        msz: error,
        type: "error",
      });
      return;
    }
  };

  const updateRequestData = (params) => {
    setRequestData({ ...requestData, ...params });
    setSnakeBarProps(null);
  };

  return (
    <CustomDialog
      title={title ?? "Create Request"}
      handleClose={onClose}
      snakeBarProps={snakeBarProps}
      actions={{
        onSave: submitclickhandler,
        onCancel: onClose,
        isSaving: isSaving,
      }}
    >
      <RequestDetail
        requestData={requestData}
        updateRequestData={updateRequestData}
        editable={true}
      />
    </CustomDialog>
  );
};
