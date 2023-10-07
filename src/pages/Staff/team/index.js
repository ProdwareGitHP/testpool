import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomFilterList from "../../../components/CustomFilterList";
import { CustomPage } from "../../../components/CustomPage";
import CustomSummaryList from "../../../components/CustomSummaryList";
import { EvoHBox } from "../../../components/EvoBox";
import { useGetTeamList } from "../../../services/team";
import { teamDateWidgetOption } from "../../contants";
import { DateWidget } from "../shared/datewidget";
import { EmployeeTable } from "./EmployeeTable";
import filterButtons from "./filterButtons.json";
import getTeamSummaryList from "./summaryButtons";

const Team = (props) => {
  const { startDate, endDate, selectedProjectObjTeam, employeeId, userId } =
    useSelector((state) => state.commonReducer);

  const isLineManager = ["", undefined].includes(
    selectedProjectObjTeam?.profileName
  );

  const [filter, setFilter] = useState([]);
  const [selectedSumamry, setSelectedSummary] = useState(null);
  const { data: oriPagedata, isLoading } = useGetTeamList({
    startDate: startDate,
    endDate: endDate,
    profileId: isLineManager ? "" : selectedProjectObjTeam.profileId,
    viewBy: isLineManager ? "LM" : "TK",
    personId: employeeId,
    userId: userId,
  });
  const [TableData, setTabledata] = useState([]);
  const filterLocalData = () => {
    let filteredData = oriPagedata ? [...oriPagedata] : [];
    if (selectedSumamry) {
      if (selectedSumamry.label === "Scheduled Hrs") {
        filteredData=filteredData?.filter((item)=>item.schHrs !== null)
      }
      else {
        filteredData = filteredData?.filter((item) => selectedSumamry.label === item.violationCode);
      }
    }
    if (filter) {
      for (const [key, value] of Object.entries(filter)) {
        filteredData = filteredData?.filter((item) => value.has(item[key]));
      }
    }
    // console.log(oriPagedata);
    // debugger 
    setTabledata(filteredData);
  };
  const onClear=async()=>{
    setSelectedSummary(null)
    setTabledata(oriPagedata);
  }
  console.log(TableData);
  useEffect(() => {
    filterLocalData();
  }, [filter, selectedSumamry, oriPagedata]);

  return (
    <CustomPage
      title={props.title}
      isLoading={isLoading}
      profileSelector={{
        managerFlag: true
      }}
    >
      <EvoHBox divider>
        <DateWidget
          durationFilter={true}
          {...props}
          dateWidgetOption={teamDateWidgetOption}
        />

        <CustomFilterList
          filterButtons={filterButtons}
          oriPagedata={oriPagedata || []}
          setFilter={setFilter}
          onClearFilter={()=>{onClear()}}
          filter={filter}
        />
      </EvoHBox>

      <CustomSummaryList
        summaryList={getTeamSummaryList(TableData)}
        scrollable={true}
        onClick={setSelectedSummary}
        selectedFilter={selectedSumamry}
      />

      <EmployeeTable oriPagedata={oriPagedata || []} filterData={TableData} title={props.title}/>
    </CustomPage>
  );
};

export default Team;
