import React, { useEffect, useState } from "react";
import { CustomPage } from "../../../components/CustomPage";
import EvoDataGrid from "../../../components/EvoDataGrid";
import { useSplitShiftData } from "../../../services/rostersettings";
import SplitShiftModal from "./SplitShiftModal";
import CustomSearch from "../../../components/CustomSearch";

const SplitShift = (props) => {
  const [snakeBarPropsLandingPage, setSnakeBarPropsLandingPage] = useState({});
  const [splitShiftList, setSplitShiftList] = useState([]);
  const {
    data: splitShiftOriginalList,
    isLoading,
    refetch: refetchSplitShiftList,
  } = useSplitShiftData();

  useEffect(() => {
    if (splitShiftOriginalList) {
      setSplitShiftList(splitShiftOriginalList);
    }
  }, [splitShiftOriginalList]);

  const searchColumns = [
    {
      name: "Split Shift",
      key: "splitShiftName",
      maxLength: 50,
    },
    {
      name: "Shift",
      key: "shifts",
    },
  ];
  const tableColumns = [
    { key: "splitShiftName", name: "Split Shift", width: 250 },
    { key: "shifts", name: "Shifts", width: 250 },
  ];
  const params = {
    setSnakeBarPropsLandingPage: setSnakeBarPropsLandingPage,
    refetchSplitShiftList: refetchSplitShiftList,
    editData: {
      splitShiftName: "",
    },
  };
  SplitShiftModal.defaultProps = params;

  return (
    <CustomPage
      title={props.title}
      isLoading={isLoading}
      snakeBarProps={snakeBarPropsLandingPage}
      setSnakebarProps={setSnakeBarPropsLandingPage}
    >
      <CustomSearch
        columns={searchColumns}
        data={splitShiftOriginalList}
        setFilterData={setSplitShiftList}
      />

      <EvoDataGrid
        columns={tableColumns}
        rows={splitShiftList}
        RowEditorModal={SplitShiftModal}
        CreatorModal={SplitShiftModal}
      />
    </CustomPage>
  );
};

export default SplitShift;
