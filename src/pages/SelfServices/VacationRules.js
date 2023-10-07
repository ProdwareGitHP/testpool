import { default as React, useState } from "react";
import { useSelector } from "react-redux";
import { CustomPage } from "../../components/CustomPage";
import EvoDataGrid from "../../components/EvoDataGrid";
import { useVacatioRuleData } from "../../services/selfservice";
import VacationRuleModal from "./VacationRuleModal";
import { useQueryClient } from "react-query";

const VacationRules = (props) => {
  const { userId } = useSelector((state) => state.commonReducer);
  const queryClient = useQueryClient();

  const [errorProps, setSnakeBarProps] = React.useState({});

  const {
    data: vacationRule,
    isLoading,
    isFetching,
    invalidate,
  } = useVacatioRuleData({ userId });

  const tableColumns = [
    { key: "startDate", name: "Start Date", type: "date" },
    { key: "endDate", name: "End Date", type: "date" },
    { key: "taskName", name: "Task", width: 175 },
    { key: "actionType", name: "Action Type", width: 110 },
    { key: "fullName", name: "To User", width: 180 },
  ];

  const createrequesthandler = (data) => {
    invalidate();
    setSnakeBarProps({
      msz: "Vacation Rule Saved.",
      type: "success",
    });
  };

  const editrequesthandler = (data) => {
    invalidate();
    setSnakeBarProps({
      msz: "Vacation Rule Updated.",
      type: "success",
    });
  };

  return (
    <CustomPage
      title={props.title}
      isLoading={isLoading || isFetching}
      snakeBarProps={errorProps}
    >
      <EvoDataGrid
        height={400}
        columns={tableColumns}
        rows={vacationRule}
        CreatorModal={VacationRuleModal}
        rowCreated={createrequesthandler}
        RowEditorModal={VacationRuleModal}
        rowUpdated={editrequesthandler}
        enableExport
      />
    </CustomPage>
  );
};

export default VacationRules;
