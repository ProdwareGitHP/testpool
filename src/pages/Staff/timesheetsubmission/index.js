import { default as React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomFilterList from "../../../components/CustomFilterList";
import { CustomPage } from "../../../components/CustomPage";
import CustomSummaryList from "../../../components/CustomSummaryList";
import { EvoHBox } from "../../../components/EvoBox";
import EvoToggleButton from "../../../components/EvoButton/toggle";
import { useGetDashboardList } from "../../../services/timesheetsubmission";
import { FilterArray, dashboardDateWidgetOption } from "../../contants";
import { DateWidget } from "../shared/datewidget";
import { EmployeeTable } from "./EmployeeTable";
import filterButtons from "./filterButtons.json";
import getSummaryList from "./summaryList";

const TimesheetSubmission = (props) => {
  const { startDate, endDate, selectedProjectObjTeam, userId, employeeId } =
    useSelector((state) => state.commonReducer);
  const isLineManager = ["", undefined].includes(
    selectedProjectObjTeam.profileName
  );

  const [headerArr, setHeaderArr] = useState([]);
  const [counts, setCounts] = useState(0);

  //filters
  const [apprStatus, setApprStatus] = useState("");
  const [filter, setFilter] = useState([]);

  const resetCounts = () => {
    setCounts(0);
  };
  const handleCounts = (value) => {
    setCounts(value);
  };

  const clearFilter = () => {
    setApprStatus("");
    setFilter({});
  };

  const filterData = (data) => {
    let fdata = data.dashboardData.sort((x) =>
      x.personId === employeeId ? -1 : 0
    );

    if (filter) {
      for (const [key, value] of Object.entries(filter)) {
        fdata = fdata?.filter((item) => value.has(item[key]));
      }
    }

    return fdata;
  };

  const {
    data: oriPagedata = [],
    isLoading,
    isFetching,
    refetch: refetchList,
    
  } = useGetDashboardList(
    {
      userId: userId,
      startDate: startDate,
      endDate: endDate,
      profileId: isLineManager ? null : selectedProjectObjTeam.profileId,
      viewBy: isLineManager ? "LM" : "TK",
      appStatus: apprStatus,
    },
    filterData
  );
  return (
    <CustomPage
      title={props.title}
      isLoading={isLoading || isFetching}
      profileSelector={{
        managerFlag: true,
      }}
    >
      <EvoHBox divider>
        <DateWidget
          durationFilter={false}
          {...props}
          dateWidgetOption={dashboardDateWidgetOption}
        />

        <EvoToggleButton
          status={apprStatus}
          handlechange={setApprStatus}
          list={FilterArray}
          counts={counts}
          handleCounts={handleCounts}
          resetCounts={resetCounts}
        />

        <CustomFilterList
          filterButtons={filterButtons}
          oriPagedata={oriPagedata}
          setFilter={setFilter}
          filter={filter}
          onClearFilter={clearFilter}
        />
      </EvoHBox>

      <CustomSummaryList
        summaryList={getSummaryList(oriPagedata)}
        scrollable={false}
        isClickable={true}
        isSelectable={true}
      />

      <EmployeeTable
        refetchList={refetchList}
        oriPagedata={oriPagedata}
        handleCounts={handleCounts}
        apprStatus={apprStatus}
        isLoading={isLoading}
        headerArr={headerArr}
        setHeaderArr={setHeaderArr}
      />
    </CustomPage>
  );
};

export default TimesheetSubmission;
