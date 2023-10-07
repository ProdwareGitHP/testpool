import React, { useEffect, useState } from "react";
import { CustomPage } from "../../../components/CustomPage";
import CustomSearch from "../../../components/CustomSearch";
import EvoDataGrid from "../../../components/EvoDataGrid";
import WorkDurationModalRosterSetting from "./WorkDurationModalRosterSetting";
import {
  useWorkDurationSummaryData,
  useWorkDurationCategory,
} from "../../../services/rosterapi";
import { getTimeFormat } from "./utils";

const ManageWorkDuration = (props) => {
  const [workDurationList, setWorkDurationList] = useState([]);
  const [originalWorkDurationList, setOriginalWorkDurationList] = useState([]);
  const [snakeBarPropsLandingPage, setSnakeBarPropsLandingPage] = useState({});

  const workDurationSelector = (arr) => {
    if (Array.isArray(arr) && arr.length) {
      arr = arr.map((item) => {
        return {
          ...item,
          startTime: getTimeFormat(item.timeStart),
          endTime: getTimeFormat(item.timeEnd),
        };
      });
      return arr;
    }
    return [];
  };
  const {
    data: workDurationOriginalList,
    isLoading: isLoading1,
    refetch: refetchWorkDurationList,
  } = useWorkDurationSummaryData(null, workDurationSelector);
  useEffect(() => {
    if (workDurationOriginalList) {
      setWorkDurationList(workDurationOriginalList);
    }
  }, [workDurationOriginalList]);

  const { data: workDurationCategoryList } = useWorkDurationCategory(
    null,
    null,
    !workDurationList.length
  );
  useEffect(() => {
    if (workDurationList.length && workDurationCategoryList) {
      var mapWorkDurationCategories = {};
      workDurationCategoryList.map((item) => {
        mapWorkDurationCategories[item.workDurationCategoryId] =
          item.workDurationCategory;
      });
      var list = [];
      if (workDurationList.length) {
        list = [...workDurationList];
      }
      list = list.map((item) => {
        return {
          ...item,
          workDurationCategory:
            mapWorkDurationCategories[item.workDurationCategoryId],
        };
      });
      setWorkDurationList(list);
      setOriginalWorkDurationList(list);
    }
  }, [workDurationCategoryList]);

  const searchColumns = [
    {
      name: "Work Duration Code",
      key: "workDurationCode",
    },
    {
      name: "Work Duration Name",
      key: "workDurationName",
    },
    {
      name: "Time",
      key: "time",
    },
  ];
  const tableColumns = [
    { key: "workDurationCode", name: "Work Duration Code", width: 200 },
    { key: "workDurationName", name: "Work Duration Name", width: 200 },
    { key: "validFrom", name: "Valid From", type: "date" },
    { key: "validTo", name: "Valid To", type: "date" },
    { key: "startTime", name: "Time Start", type: "time" },
    { key: "endTime", name: "Time End", type: "time" },
    { key: "duration", name: "Duration", width: 80, type: "float" },
    { key: "workDurationCategory", name: "Duration Category", width: 150 },
  ];

  const params = {
    setSnakeBarPropsLandingPage: setSnakeBarPropsLandingPage,
    refetchWorkDurationList: refetchWorkDurationList,
    editData: {
      workDurationCode: "",
      workDurationName: "",
      validFrom: null,
      validTo: null,
      startTime: "",
      endTime: "",
      sun: "Y",
      mon: "Y",
      tue: "Y",
      wed: "Y",
      thu: "Y",
      fri: "Y",
      sat: "Y",
    },
  };
  WorkDurationModalRosterSetting.defaultProps = params;

  return (
    <CustomPage
      title={props.title}
      isLoading={isLoading1}
      snakeBarProps={snakeBarPropsLandingPage}
    >
      <>
        <CustomSearch
          columns={searchColumns}
          data={originalWorkDurationList}
          setFilterData={setWorkDurationList}
        />

        <EvoDataGrid
          columns={tableColumns}
          rows={workDurationList}
          CreatorModal={WorkDurationModalRosterSetting}
          RowEditorModal={WorkDurationModalRosterSetting}
        />
      </>
    </CustomPage>
  );
};
export default ManageWorkDuration;
