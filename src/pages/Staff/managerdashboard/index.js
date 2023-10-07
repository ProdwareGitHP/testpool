import React, { useEffect, useState } from "react";
import { CustomPage } from "../../../components/CustomPage";
import { EvoHBox } from "../../../components/EvoBox";
import { EvoDataForm } from "../../../components/EvoDataForm";
import {
  useGetChartData,
  useGetMonth,
} from "../../../services/managerdashboard";
import { getRangeDate } from "../../../utils/commonService";
import CostCenterChart from "./CostCenterChart";
import ViewSelector from "./viewSelector";

const ManagerDashboard = (props) => {
  const [status, setStatus] = useState("cost/center");
  const [month, setMonth] = useState();

  const onOptionChange = (newData) => {
    setMonth(newData);
  };

  const { data: monthsData } = useGetMonth();

  const {
    data: costCenterData,
    isLoading,
    isFetching,

    refetch: getChartData,
  } = useGetChartData(status, getRangeDate(month));

  useEffect(() => {
    if (status && month) {
      getChartData();
    }
  }, [status, month]);

  return (
    <CustomPage title={props.title} isLoading={isLoading || isFetching}>
      <EvoHBox divider>
        <EvoDataForm
          formData={{
            item: {
              label: "Select Month",
              type: "dropdown",
              editorProps: {
                width: 120,
                data: monthsData,
                caller: onOptionChange,
                getoptionlabelkey: "payPeriodName",
              },
            },
          }}
        />

        <ViewSelector status={status} setStatus={setStatus} />
      </EvoHBox>

      <CostCenterChart
        selectedMonth={month}
        status={status}
        costCenterData={costCenterData}
      />
    </CustomPage>
  );
};

export default ManagerDashboard;
