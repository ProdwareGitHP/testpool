import React, { useState } from "react";

import { Box } from "@mui/material";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { EvoHBox, EvoHNavBox } from "../../../components/EvoBox";
import { EvoButton } from "../../../components/EvoButton";
import { updateState } from "../../../redux/commonSlice";
import { PersonRosterDataWithDate } from "../../../services/api";
import { isPreviousURLMatched } from "../../../utils/commonService";
import DeleteModal from "./DeleteModal";
import GenerateFormDemand from "./GenerateFormDemand";
import RotaSelect from "./RotaSelect";
import ValidateRosterModal from "./ValidateRosterModal";

import WorkHistoryRoundedIcon from "@mui/icons-material/WorkHistoryRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import UploadIcon from "@mui/icons-material/Upload";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { filterEmployeeNumber, isEmptyShifts } from "../utils";
import PublishRosterModal from "./PublishRosterModal";

const summaryKeys = {
  totalSchHours: "totalSchHours",
  draft: "draft",
  pendingApproval: "pendingApproval",
  correction: "correction",
  underPublish: "underPublish",
  publish: "publish",
  onCall: "onCall",
};

const RosterActions = (props) => {
  const {
    oriPagedata,
    data,
    setSnakeBarProps,
    refetchEmployeeList,
    checked,
    resetChecked,
  } = props;
  // debugger;
  const commonReducer = useSelector((state) => state.commonReducer);

  const [status, setStatus] = React.useState(0);
  const [isLoadingBut, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPreviousURLMatched(commonReducer)) {
      dispatch(updateState({ selectedSummary: summaryKeys.totalSchHours }));
    }
  }, []);

  const { mutate: DeletePersonData, isLoading } = useMutation(
    PersonRosterDataWithDate,
    {
      onSuccess: (data, context, variables) => onCreateRequest(data),
      onError: (data, context, variables) => onErrorRequest(data),
    }
  );

  const onCreateRequest = (data) => {
    setSnakeBarProps({
      msz: "Shift(s) deleted successfully",
      type: "success",
    });
    refetchEmployeeList();
    resetChecked();
    setStatus(0);
  };

  const onErrorRequest = (data) => {
    setSnakeBarProps({
      msz: "Unable to delete Shift(s)",
      type: "error",
    });
  };

  const isProfileNotSelected = () => {
    return Object.keys(commonReducer?.selectedProjectObj).length === 0
      ? true
      : false;
  };

  const isProfileSelected = () => {
    return Object.keys(commonReducer?.selectedProjectObj).length > 0
      ? true
      : false;
  };

  const isUnPublished = () => {
    return commonReducer.selectedSummary === summaryKeys.underPublish;
  };

  const isPublished = () => {
    return commonReducer.selectedSummary === summaryKeys.publish;
  };

  const btnKeys = {
    publish: "publish",
    quickRoster: "quickRoster",
    rota: "rota",
    demand: "demand",
    delete: "delete",
    validate: "validate",
    import: "import",
  };

  const buttonIcons = {
    publish: null,
    quickRoster: <WorkHistoryRoundedIcon fontSize="small" />,
    rota: <WorkHistoryRoundedIcon fontSize="small" sx={{ color: "skyblue" }} />,
    demand: <LeaderboardIcon fontSize="small" sx={{ color: "orange" }} />,
    delete: <RemoveCircleRoundedIcon fontSize="small" sx={{ color: "red" }} />,
    validate: (
      <FactCheckRoundedIcon fontSize="small" sx={{ color: "greenyellow" }} />
    ),
    import: <UploadIcon fontSize="small" sx={{ color: "yellow" }} />,
  };

  const buttonsArr = [
    commonReducer.selectedProjectObj.role !== "Approver" && {
      label: "Publish",
      onClick: () => {
        if (checked.length === 0) {
          setSnakeBarProps({
            msz: "Select atleast one Employee!",
            type: "error",
          });
          return;
        }
        setStatus(5);
      },
      key: btnKeys.publish,
    },
    // {
    //   label: "Quick Roster",
    //   onClick: () => {},
    //   key: btnKeys.quickRoster,
    // },
    {
      label: "Rota",
      onClick: () => {
        setStatus(2);
      },
      key: btnKeys.rota,
    },
    {
      label: "Demand",
      onClick: () => {
        setStatus(1);
      },
      key: btnKeys.demand,
    },
    {
      label: "Delete",
      onClick: () => {
        if (checked.length === 0) {
          setSnakeBarProps({
            msz: "Select atleast one Employee!",
            type: "error",
          });
          return;
        }
        setStatus(3);
      },
      key: btnKeys.delete,
    },
    {
      label: "Validate",
      onClick: () => {
        setStatus(4);
      },
      key: btnKeys.validate,
    },
    {
      label: "Import",
      onClick: () => {},
      key: btnKeys.import,
    },
  ];
  const btnsVisible = {
    profileNotSelected: [btnKeys.validate],
    profileSelected: [
      btnKeys.quickRoster,
      btnKeys.rota,
      btnKeys.demand,
      btnKeys.delete,
      btnKeys.validate,
      btnKeys.import,
    ],
    unPublished: [
      btnKeys.publish,
      btnKeys.quickRoster,
      btnKeys.rota,
      btnKeys.demand,
      btnKeys.delete,
      btnKeys.validate,
      btnKeys.import,
    ],
    published: [
      btnKeys.publish,
      btnKeys.quickRoster,
      btnKeys.rota,
      btnKeys.demand,
      btnKeys.delete,
      btnKeys.validate,
      btnKeys.import,
    ],
  };

  let arr = [];
  if (isProfileNotSelected()) {
    arr = btnsVisible.profileNotSelected;
  } else if (isUnPublished()) {
    arr = btnsVisible.unPublished;
  } else if (isPublished()) {
    arr = btnsVisible.published;
  } else if (isProfileSelected()) {
    arr = btnsVisible.profileSelected;
  }

  return (
    <>
      <EvoHNavBox
        Right={buttonsArr
          .filter((item) => arr.includes(item.key))
          .map((item, index) => (
            <EvoButton
              key={index}
              startIcon={buttonIcons[item.key]}
              btnText={item.label}
              onClick={item.onClick}
            />
          ))}
      />

      {status == 1 && (
        <GenerateFormDemand
          setSnakeBarProps={setSnakeBarProps}
          setStatus1={setStatus}
          refetchEmployeeList={refetchEmployeeList}
        />
      )}

      {status == 2 && (
        <RotaSelect
          setSnakeBarProps={setSnakeBarProps}
          setStatus1={setStatus}
          status1={status}
          refetchEmployeeList={refetchEmployeeList}
        />
      )}

      {status == 3 && (
        <DeleteModal
          setStatus1={setStatus}
          checked={checked}
          setSnakeBarProps={setSnakeBarProps}
          DeletePersonData={DeletePersonData}
          isLoading={isLoading}
          isEmptyShiftValues={isEmptyShifts(filterEmployeeNumber(checked, data))}
          resetChecked={resetChecked}
        />
      )}

      {status == 4 && <ValidateRosterModal setStatus1={setStatus} />}
      {status == 5 && (
        <PublishRosterModal
          setStatus1={setStatus}
          resetChecked={resetChecked}
        />
      )}
    </>
  );
};

export default RosterActions;
