import { Typography } from "@mui/material";
import React from "react";
import { CustomDialog } from "../../../components/CustomDialog";
import { useApproveHistoryDetails } from "../../../services/team";
import { RequestDetail } from "./RequestDetail";
import EvoDataGrid from "../../../components/EvoDataGrid";

export const RequestViewModal = (props) => {
  const { togglerHandler, requestData } = props;

  const { data: requestHistoryData, isLoading } = useApproveHistoryDetails({
    personRequestId: requestData?.personRequestId,
  });

  const tableColumnsHistory = [
    {
      key: "fullName",
      name: "Employee",
      type: "person",
    },
    {
      key: "actionTaken",
      name: "Action",
      width: 100,
    },
    {
      key: "transactionStatus",
      name: "Action Type",
      width: 150,
    },
    {
      key: "comments",
      name: "Comments",
      width: 100,
    },
    {
      key: "createdOn",
      name: "Date",
      type: "datetime",
      width: 200,
    },
  ];

  return (
    <CustomDialog
      title="Request Details"
      open="true"
      isLoading={isLoading}
      handleClose={togglerHandler}
    >
      <RequestDetail requestData={requestData} editable={false}/>

      <EvoDataGrid
        title="Approval History"
        columns={tableColumnsHistory}
        rows={requestHistoryData}
      />
    </CustomDialog>
  );
};
