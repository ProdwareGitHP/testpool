import React from "react";
import { CustomDialog } from "../../../components/CustomDialog";
import { useApproveHistoryDetails } from "../../../services/team";
import EvoDataGrid from "../../../components/EvoDataGrid";

export const ApprovalHistory = (props) => {
  const { togglerHandler } = props;
  const tableRows = [
    {
      seq: "1",
      transactionStatus: "Approved",
      actionTaken: "Initiate",
      comments: null,
      userName: "benjamin.hull",
      employeeNumber: "100765",
      fullName: "Benjamin Hull",
      jobTitle: "Physician-J230",
      departmentName: "U//32:Emergency Medicine Unit",
      emailAddress: "benjamin.hull@acme.com",
      personId: "300000004235424",
      createdOn: "2023-09-18 12:53:02.0",
      itemKey: "1393760",
      notifCommitId: "587935",
    },
    {
      seq: "2",
      transactionStatus: "Approved",
      actionTaken: "APPROVED",
      comments: "Approved.",
      userName: "macy.massay",
      employeeNumber: "101678",
      fullName: "Macy Massay",
      jobTitle: "Supervisor - Admin & Support-J554",
      departmentName: "S//37:Patient Access Sec",
      emailAddress: "macy.massay@acme.com",
      personId: "300000004265052",
      createdOn: "2023-09-18 13:04:53.0",
      itemKey: "1393760",
      notifCommitId: "587939",
    },
  ];
  // const { data: requestHistoryData, isLoading } = useApproveHistoryDetails({
  //   personRequestId: requestData?.personRequestId,
  // });

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
      title="Approval History"
      open="true"
      // isLoading={isLoading}
      handleClose={togglerHandler}
    >
      <EvoDataGrid columns={tableColumnsHistory} rows={tableRows} />
    </CustomDialog>
  );
};
