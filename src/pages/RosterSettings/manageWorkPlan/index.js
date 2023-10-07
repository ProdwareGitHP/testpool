import React, { useEffect, useState } from "react";
import { CustomPage } from "../../../components/CustomPage";
import EvoDataGrid from "../../../components/EvoDataGrid";
import ManageWorkPlanModal from "./ManageWorkPlanModal";
import { useGetAllWorkPlan } from "../../../services/rostersettings";
import CustomSearch from "../../../components/CustomSearch";

const ManageWorkPlan = (props) => {
  const [snakeBarPropsLandingPage, setSnakeBarPropsLandingPage] = useState({});
  const [workPlanList, setWorkPlanList] = useState([]);

  const {
    data: workPlanOriginalList,
    isLoading: isLoading1,
    refetch,
    isRefetching,
  } = useGetAllWorkPlan();

  useEffect(() => {
    if (workPlanOriginalList) {
      setWorkPlanList(workPlanOriginalList);
    }
  }, [workPlanOriginalList]);

  const searchColumns = [
    {
      name: "Work Plan",
      key: "workPlanName",
      maxLength: 50,
    },
  ];
  const tableColumns = [
    { key: "workPlanName", name: "Work Plan", width: 200 },
    { key: "active", name: "Active", width: 100 },
  ];

  const params = {
    setSnakeBarPropsLandingPage: setSnakeBarPropsLandingPage,
    refetchWorkPlans: refetch,
    editData: {
      workPlanName: "",
      active: "N",
    },
  };
  ManageWorkPlanModal.defaultProps = params;

  return (
    <CustomPage
      title={props.title}
      isLoading={isLoading1 || isRefetching}
      snakeBarProps={snakeBarPropsLandingPage}
    >
      <CustomSearch
        columns={searchColumns}
        data={workPlanOriginalList}
        setFilterData={setWorkPlanList}
      />
      <EvoDataGrid
        columns={tableColumns}
        rows={workPlanList || []}
        RowEditorModal={ManageWorkPlanModal}
        CreatorModal={ManageWorkPlanModal}
      />
    </CustomPage>
  );
};

export default ManageWorkPlan;
