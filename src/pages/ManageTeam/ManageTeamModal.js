import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../components/CustomDialog";
import { EvoDataForm } from "../../components/EvoDataForm";
import EvoSection from "../../components/EvoSection";
import {
  createManageTeam,
  deleteTeamById,
  updateManageTeam,
} from "../../services/api";
import { useGetValueFromListData } from "../../services/manageteam";
import DurationTable from "./DurationTable";
import { openDays } from "./Utils";

// import { useGetValueFromListData } from "../../services/managecontrol";
import {
  useGetManageTeamDataById,
  // useGetValueFromListData,
} from "../../services/managecontrol";
import { EvoHBox } from "../../components/EvoBox";
import { checkValidations } from "../../utils/commonService";
import DeleteModal from "../../components/DeleteModal";

const ManageTeamModal = (props) => {
  const {
    toggleHandler,
    workDurationArr,
    editData,
    getAllProjectRefetch,
    snakeBarPropsManageTeam,
    setSnakeBarPropsManageTeam,
  } = props;

  const [snakeBarPropsManageTeamModal, setSnakeBarPropsManageTeamModal] =
    useState({});

  const commonReducer = useSelector((state) => state.commonReducer);
  const [expanded, setExpanded] = React.useState("panel1");

  const [teamName, setTeamName] = useState(editData.teamName);
  const [isLoadingBut, setIsLoadingBut] = useState(false);

  const [check, setCheck] = useState({
    enable: editData.enabled === "Y" ? true : false,
  });
  const [maxWeek, setMaxWeeks] = useState(editData.maxWeeks);
  const [maxHours, setMaxHours] = useState(editData.maxHours);
  const [earlyWeeks, setEarlyWeeks] = useState(editData.earlyWeeks);
  const select = (arr) => {
    return arr.map((item) => {
      return {
        openFrom: item.meaning,
        openFromId: item.valueFromId,
      };
    });
  };
  const { data: getValueFromList } = useGetValueFromListData({}, select);
  const [valueFromList, setValueFromList] = useState({
    openFrom: editData.openFrom,
    openFromId: editData.openFromId,
  });

  const [days, setDays] = useState({
    id: editData.openDays,
    value: editData.openDays?.toString(),
  });

  const [workDurationArrSelected, setWorkDurationArrSelected] = useState(
    editData.workDurationIds
  );
  const [workDurationIds, setWorkDurationIds] = useState(
    editData.workDurationIds
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleCheck = (checked, optionId) => {
    let arr = [...workDurationArrSelected];
    let ind = arr.indexOf(optionId);
    if (ind > -1) {
      arr.splice(ind, 1);
    } else {
      arr.push(optionId);
    }
    setWorkDurationArrSelected(arr);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClose = () => {
    toggleHandler(false);
  };

  const { mutate: CreateManageTeamMutate } = useMutation(createManageTeam, {
    onSuccess: (data, context, variables) =>
      onSuccessCreateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorCreateRequest(data, context, variables),
  });

  const onSuccessCreateRequest = (data) => {
    if (data) {
      setSnakeBarPropsManageTeam({
        msz: "Team Saved Successfully.",
        type: "success",
      });

      setIsLoadingBut(false);
      toggleHandler(false);
      getAllProjectRefetch();
    }
  };

  const onErrorCreateRequest = (error) => {
    if (error) {
      setSnakeBarPropsManageTeamModal({
        msz: "Unable to create team",
        type: "error",
      });
      setIsLoadingBut(false);
      toggleHandler(true);
    }
  };

  const validate = () => {
    const validations = [
      {
        msz: "Please enter the Team Name!",
        type: "error",
        isMatch: teamName === "",
      },
      {
        msz: "Self-Scheduling Open From is required",
        type: "error",
        isMatch: valueFromList.openFromId === "",
      },
      {
        msz: "Self-Scheduling Open Days is required.",
        type: "error",
        isMatch: days.id === "",
      },
      {
        msz: "How many maximum weeks employee can do self-scheduling? is required",
        type: "error",
        isMatch: maxWeek === null || maxWeek === "",
      },
      {
        msz: "Max hours employee can self-schedule in a week? is required",
        type: "error",
        isMatch: maxHours === null || maxHours === "",
      },
      {
        msz: "How early employee can self-schedule?(Weeks) is required",
        type: "error",
        isMatch: earlyWeeks === null || earlyWeeks === "",
      },

      {
        msz: "The value must be a number",
        type: "error",
        isMatch: isNaN(Number(maxWeek)),
      },
      {
        msz: "The value must be a number",
        type: "error",
        isMatch: isNaN(Number(maxHours)),
      },
      {
        msz: "The value must be a number",
        type: "error",
        isMatch: isNaN(Number(earlyWeeks)),
      },
    ];

    return checkValidations({
      validations: validations,
      setSnakeBarProps: setSnakeBarPropsManageTeamModal,
    });
  };
  const saveHandler = () => {
    if (validate()) {
      var pdata = {
        teamName: teamName,
        enabled: check.enable == true ? "Y" : "N",
        openFromId: valueFromList.openFromId,
        openDays: days.id,
        maxWeeks: parseInt(maxWeek),
        maxHours: parseInt(maxHours),
        earlyWeeks: parseInt(earlyWeeks),
        workDurationIds: workDurationArrSelected,
      };
      setIsLoadingBut(true);
      CreateManageTeamMutate(pdata);
    }
  };
  //Api for update team
  const { mutate: UpdateManageTeamMutate } = useMutation(updateManageTeam, {
    onSuccess: (data, context, variables) =>
      onSuccessUpdateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorUpdateRequest(data, context, variables),
  });

  const onSuccessUpdateRequest = (data) => {
    if (data) {
      setSnakeBarPropsManageTeam({
        msz: "Team Saved Successfully.",
        type: "success",
      });

      setIsLoadingBut(false);
      toggleHandler(false);
      getAllProjectRefetch();
    }
  };

  const onErrorUpdateRequest = (error) => {
    if (error) {
      setSnakeBarPropsManageTeamModal({
        msz: "Unable to update team",
        type: "error",
      });

      toggleHandler(true);
    }
  };
  const updateHandler = () => {
    if (validate()) {
      var pdata = {
        teamId: editData?.teamId,
        teamName: teamName,
        enabled: check.enable == true ? "Y" : "N",
        openFromId: valueFromList.openFromId,
        openDays: days.id,
        maxWeeks: parseInt(maxWeek),
        maxHours: parseInt(maxHours),
        earlyWeeks: parseInt(earlyWeeks),
        workDurationIds: workDurationArrSelected,
      };
      setIsLoadingBut(true);
      UpdateManageTeamMutate(pdata);
    }
  };

  const { mutate: DeleteWorkPlanMutate, isLoading: isLoading3 } = useMutation(
    deleteTeamById,
    {
      onSuccess: (data, context, variables) =>
        onSuccessDeleteRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorDeleteRequest(data, context, variables),
    }
  );
  const onSuccessDeleteRequest = (data) => {
    if (data?.data?.data) {
      setSnakeBarPropsManageTeam({
        msz: "Team deleted Successfully.",
        type: "success",
      });
      setOpenDeleteModal(false);
      toggleHandler();
      getAllProjectRefetch();
    }
  };
  const onErrorDeleteRequest = (error) => {
    if (error) {
      setSnakeBarPropsManageTeamModal({
        msz: error?.response?.data?.status?.description,
        type: "error",
      });
      setOpenDeleteModal(false);
    }
  };
  const deleteTeam = () => {
    const id = editData?.teamId;
    DeleteWorkPlanMutate(id);
  };

  const { data: getManageTeamById } = useGetManageTeamDataById({
    teamId: editData == undefined ? null : editData?.teamId,
  });

  // useEffect(() => {
  if (getManageTeamById) {
  }
  // }, [getManageTeamById]);

  const getSelectIndex = (arr, key, value) => {
    var index = arr?.findIndex((item) => key in item && item[key] === value);
    return index;
  };

  const formData = {
    gap: 3,
    labelWidth: 250,
    items: [
      {
        label: "Team Name",
        value: teamName,
        onChange: (e) => setTeamName(e.target.value),
      },
      {
        label: "Enabled",
        value: check.enable,
        type: "checkbox",
        onChangeCheck: (e) => setCheck({ ...check, enable: e }),
      },
      {
        label: "Self Scheduling Open From",
        type: "dropdown",
        editorProps: {
          width: 200,
          id: "Value From",
          data: getValueFromList,
          caller: setValueFromList,
          month: valueFromList,
          selectIndex: getSelectIndex(
            getValueFromList,
            "openFromId",
            valueFromList.openFromId
          ),
          getoptionlabelkey: "openFrom",
        },
      },
      {
        label: "Self Scheduling Open Days",
        type: "dropdown",
        editorProps: {
          data: openDays,
          caller: setDays,
          month: days,
          selectIndex: getSelectIndex(openDays, "id", days.id),
          getoptionlabelkey: "value",
        },
      },
      {
        label: "How many maximum weeks employee can do self-scheduling?",
        value: maxWeek,
        textAlign: "right",
        onChange: (e) => setMaxWeeks(e.target.value),
      },
      {
        label: "Max hours employee can self-schedule in a week?",
        textAlign: "right",
        value: maxHours,

        onChange: (e) => setMaxHours(e.target.value),
      },
      {
        label: "How early employee can self-schedule?( Weeks)",
        textAlign: "right",
        value: earlyWeeks,

        onChange: (e) => setEarlyWeeks(e.target.value),
      },
    ],
  };
  return (
    <>
      <CustomDialog
        title="Manage Team"
        handleClose={handleClose}
        snakeBarProps={snakeBarPropsManageTeamModal}
        setSnakeBarProps={setSnakeBarPropsManageTeamModal}
        isLoading={isLoadingBut}
        actions={
          "teamId" in editData
            ? {
                onSave: updateHandler,
                onDelete: handleOpenDelete,
                onCancel: handleClose,
              }
            : {
                onSave: saveHandler,
                onCancel: handleClose,
              }
        }
      >
        <EvoHBox alignItems="start" gap={5}>
          <EvoDataForm formData={formData} />
          <EvoSection title={"Applicable Shifts"}>
            <DurationTable
              workDurationArr={workDurationArr}
              workDurationArrSelected={workDurationArrSelected}
              workDurationIds={workDurationIds}
              handleCheck={handleCheck}
            />
          </EvoSection>
        </EvoHBox>
      </CustomDialog>
      {openDeleteModal && (
        <DeleteModal
          toggleHandler={setOpenDeleteModal}
          onDelete={deleteTeam}
          isLoading={isLoading3}
        />
      )}
    </>
  );
};
ManageTeamModal.defaultProps = {
  editData: {
    teamName: "",
    enabled: "N",
    maxWeeks: null,
    maxHours: null,
    earlyWeeks: null,
    workDurationIds: [],
    openFrom: "",
    openFromId: "",
    openDays: "",
  },
};

export default ManageTeamModal;
const useStyles = makeStyles(() => ({
  mainGrid: {
    display: "flex",
    flexDirection: "row",
  },
  contentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5px",
    marginRight: "50px",
  },
  shiftsBox: {
    border: "1px solid rgba(0, 0, 0, 0.125)",
  },
  selectButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
}));
