import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { CustomPage } from "../../components/CustomPage";
import CustomSearch from "../../components/CustomSearch";
import EvoDataGrid from "../../components/EvoDataGrid";

import DemTempEdit from "./DemTempEdit";
import { useGetDemandTemp } from "../../services/rosterapi";

function Index(props) {
  const { userId } = useSelector((state) => state.commonReducer);
  const [snakeBarPropsLandingPage, setSnakeBarPropsLandingPage] = useState({});
  const [demandTemplateList, setDemandTemplateList] = useState([]);

  const {
    data: demandTemplatesOriginalList,
    isLoading,
    refetch,
  } = useGetDemandTemp({
    userId: userId,
  });

  useEffect(() => {
    if (demandTemplatesOriginalList) {
      setDemandTemplateList(demandTemplatesOriginalList);
    }
  }, [demandTemplatesOriginalList]);
  const columns = [
    {
      name: "Template Name",
      key: "demandTemplateName",
    },
    {
      name: "Profile",
      key: "profile",
    },
  ];

  const tableColumns = [
    {
      key: "action",
      name: "Action",
      type: "editor",
      Editor: DemTempEdit,
      colSpan(args) {
        if (args.type === "HEADER") {
          return 2;
        }
        return undefined;
      },
    },
    {
      key: "action2",
      name: "Action",
      width: 60,
      type: "copy",
      Editor: DemTempEdit,
    },
    { key: "demandTemplateName", name: "Template Name", width: 300 },
    { key: "validFrom", name: "Valid From", width: 150 },
    { key: "validTo", name: "Valid To", width: 150 },
    { key: "profile", name: "Profile", width: 100 },
  ];

  const params = {
    setSnakeBarPropsLandingPage: setSnakeBarPropsLandingPage,
    refetchDemandTemplates: refetch,
    editData: {
      profile: "",
      profileId: "",
      demandTemplateName: "",
      validFrom: null,
      validTo: null,
    },
  };
  DemTempEdit.defaultProps = params;

  return (
    <>
      <CustomPage
        title={props.title}
        isLoading={isLoading}
        snakeBarProps={snakeBarPropsLandingPage}
      >
        <>
          <CustomSearch
            columns={columns}
            data={demandTemplatesOriginalList}
            setFilterData={setDemandTemplateList}
          />

          <EvoDataGrid
            columns={tableColumns}
            rows={demandTemplateList}
            CreatorModal={DemTempEdit}
          />
        </>
      </CustomPage>

      {/* {status == 1 && (
        <DemTempEdit
          setStatus1={setStatus}
          demandTempId={clicked}
          editData={editData}
          setErrorProps={setErrorProps}
          citizenData={citizenData}
          skillData={skillData}
          getAllProjectRefetch={getAllProjectRefetch}
        />
      )} */}
    </>
  );
}

export default Index;
