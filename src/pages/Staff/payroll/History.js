import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { history } from "../../../services/api";

import React, { useEffect, useState } from "react";
import EvoDataGrid from "../../../components/EvoDataGrid";

const tableColumns = [
  { key: "userName", name: "User Name", width: 230 },
  { key: "action", name: "Action", width: 230 },
  { key: "Comments", name: "Comments", width: 230 },
  { key: "actionDate", name: "Action Date", width: 230 },
];

const History = (props) => {
  const { data } = props;

  const [historyData, setHistoryData] = useState([]);

  const commonReducer = useSelector((state) => state.commonReducer);

  const onSuccess = (data, context, variables) => {
    console.log("data", data);
    setHistoryData(data?.data?.data.historyListDetails);
  };
  const onError = () => {};

  const { mutate: historyMutate, isLoading: lineDataLoading } = useMutation(
    history,
    {
      onSuccess: (data, context, variables) =>
        onSuccess(data, context, variables),
      onError: (data, context, variables) => onError(data, context, variables),
    }
  );

  useEffect(() => {
    historyMutate({
      payrollAuditId: data.payrollAuditId,
      userId: commonReducer.userId,
    });
  }, []);

  return <EvoDataGrid columns={tableColumns} rows={historyData} />;
};

export default History;
