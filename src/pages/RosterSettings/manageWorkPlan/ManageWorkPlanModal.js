import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../../components/CustomDialog";
import {
  createWorkPlan,
  deleteworkPlan,
  updateWorkPlan,
} from "../../../services/api";
import { modalDayMock } from "./utils";
import { useWorkDurationSummaryData } from "../../../services/rostersettings";
import EvoDataGrid from "../../../components/EvoDataGrid";
import { EvoDataForm } from "../../../components/EvoDataForm";
import {
  checkValidations,
  useGetOperations,
} from "../../../utils/commonService";

import DeleteModal from "../../../components/DeleteModal";
import { Box, Typography } from "@mui/material";
import { EvoHBox } from "../../../components/EvoBox";

const ManageWorkPlanModal = (props) => {
  const { editData, setSnakeBarPropsLandingPage, refetchWorkPlans } = props;
  const [updateLoader, setUpdateLoader] = useState(false);
  const { isCreateOperation, isUpdateOperation } = useGetOperations({
    params: editData,
    key: "workPlanId",
  });

  const [snakeBarPropsWorkPlan, setSnakeBarPropsWorkPlan] = useState({});

  const commonReducer = useSelector((state) => state.commonReducer);
  const [WorkPlan, setWorkPlan] = useState(editData.workPlanName);

  const [checkStatus, setCheckStatus] = useState({
    Active: editData.active == "Y" ? true : false,
  });
  const [days, setDays] = useState({
    D1: editData?.d1 ? editData.d1 : 0,
    D2: editData?.d2 ? editData.d2 : 0,
    D3: editData?.d3 ? editData.d3 : 0,
    D4: editData?.d4 ? editData.d4 : 0,
    D5: editData?.d5 ? editData.d5 : 0,
    D6: editData?.d6 ? editData.d6 : 0,
    D7: editData?.d7 ? editData.d7 : 0,
  });

  useEffect(() => {
    if (isUpdateOperation) {
      setUpdateLoader(true);
      setTimeout(() => setUpdateLoader(false), [1000]);
    }
  }, []);
  const [openDelete, setOpenDelete] = useState(false);

  // API for create work plan
  const { mutate: CreateWorkPlanMutate, isLoading: isLoading1 } = useMutation(
    createWorkPlan,
    {
      onSuccess: (data, context, variables) =>
        onSuccessCreateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorCreateRequest(data, context, variables),
    }
  );
  const onSuccessCreateRequest = (data) => {
    setSnakeBarPropsLandingPage({
      msz: "Work Plan saved",
      type: "success",
    });
    props.handleClose();
    refetchWorkPlans();
  };
  const onErrorCreateRequest = (error) => {
    if (error) {
      setSnakeBarPropsWorkPlan({
        msz: error?.response?.data?.status?.description,
        type: "error",
      });
    }
  };

  //  Save api method
  const saveWorkPlan = () => {
    if (validateOnSaveAndUpdate()) {
      var pdata = {
        userId: commonReducer.userId,
        active: checkStatus.Active == true ? "Y" : "N",
        workPlanName: WorkPlan,
        ...getDurations(),
      };
      CreateWorkPlanMutate(pdata);
    }
  };

  // API for update work plan
  const { mutate: UpdateWorkPlanMutate, isLoading: isLoading2 } = useMutation(
    updateWorkPlan,
    {
      onSuccess: (data, context, variables) =>
        onSuccessUpdateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorUpdateRequest(data, context, variables),
    }
  );
  const onSuccessUpdateRequest = (data) => {
    if (data) {
      setSnakeBarPropsLandingPage({
        msz: "Work Plan Updated",
        type: "success",
      });
      props.handleClose();
      refetchWorkPlans();
    }
  };
  const onErrorUpdateRequest = (error) => {
    if (error) {
      setSnakeBarPropsWorkPlan({
        msz: error?.response?.data?.status?.description,
        type: "error",
      });
    }
  };

  //  Validations on update method
  const validateOnSaveAndUpdate = () => {
    var daysArr = Object.keys(days);
    var emptyValues = daysArr.filter((day) => {
      return days[day] === 0 || days[day]?.id === 0;
    });
    var hasSelected = emptyValues.length === daysArr.length;
    const validations = [
      {
        msz: "Please enter the Work Plan!",
        type: "error",
        isMatch: WorkPlan === "",
      },
      {
        msz: "Active is required!",
        type: "error",
        isMatch: checkStatus.Active === false,
      },
      {
        msz: "Please select atleast one shift",
        type: "error",
        isMatch: hasSelected,
      },
    ];
    var res = checkValidations({
      validations: validations,
      setSnakeBarProps: setSnakeBarPropsWorkPlan,
    });
    return res;
  };
  const getDurations = () => {
    var durations = {};

    Object.keys(days).map((day) => {
      durations[`workDurationId${day}`] =
        days[day] !== 0 && typeof days[day] === "object"
          ? days[day]?.id
          : days[day];
    });

    return durations;
  };
  const validate = () => {
    const validations = [
      {
        msz: "Please enter the Work Plan!",
        type: "error",
        isMatch: WorkPlan === "",
      },
    ];
    return checkValidations({
      validations: validations,
      setSnakeBarProps: setSnakeBarPropsWorkPlan,
    });
  };
  // Update api method
  const UpdateWorkPlan = () => {
    if (validate()) {
      var pdata = {
        userId: commonReducer.userId,
        active: checkStatus.Active == true ? "Y" : "N",
        workPlanName: WorkPlan,
        workPlanId: editData?.workPlanId,
        ...getDurations(),
      };
      UpdateWorkPlanMutate(pdata);
    }
  };

  //  API for Delete Work Plan
  const { mutate: DeleteWorkPlanMutate, isLoading: isLoading3 } = useMutation(
    deleteworkPlan,
    {
      onSuccess: (data, context, variables) =>
        onSuccessDeleteRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorDeleteRequest(data, context, variables),
    }
  );
  const onSuccessDeleteRequest = (data) => {
    if (data) {
      setSnakeBarPropsLandingPage({
        msz: "Work Plan Deleted",
        type: "success",
      });
      setOpenDelete(false);
      props.handleClose();
      refetchWorkPlans();
    }
  };
  const onErrorDeleteRequest = (error) => {
    if (error) {
      setSnakeBarPropsWorkPlan({
        msz: error?.response?.data?.status?.description,
        type: "error",
      });
      setOpenDelete(false);
    }
  };
  //  Delete api method
  const deleteWorkPlanValue = () => {
    const id = editData?.workPlanId;
    DeleteWorkPlanMutate(id);
  };
  const deleteWorkPlanPopup = () => {
    setOpenDelete(true);
  };

  // Selector Method for Work Duration List
  const workDurationSelector = (arr) => {
    if (arr) {
      var workDurationArr = [
        {
          id: 0,
          label: "",
          value: "",
        },
      ];
      arr?.map((item) => {
        workDurationArr.push({
          id: item.workDurationId,
          label: item.workDurationCode,
          value: item.workDurationCode,
        });
      });
      return workDurationArr;
    } else {
      return [];
    }
  };

  const { data: workDurationList, isLoading } = useWorkDurationSummaryData(
    {},
    workDurationSelector
  );

  const getSelectIndex = (arr, key, value) => {
    if (arr && value) {
      var index = arr?.findIndex((item) => key in item && item[key] == value);
      return index;
    } else {
      return -1;
    }
  };

  const handleWorkShifts = (columnKey, item) => {
    let newObj = days;
    newObj[columnKey] = item;
    setDays(newObj);
  };

  const tableColumns = modalDayMock.map((item, index) => {
    const column = {
      name: item.label,
      key: item.label,
      formatter: ({ value }) => value, // Display the shift name in the cell

      width: 120,
      type: "dropdown",
      columnKey: item.duration,
      editorProps: {
        width: 100,
        id: `shift_${index}`,
        data: workDurationList,
        caller: handleWorkShifts,
        month: days[item.duration],
        selectIndex: getSelectIndex(
          workDurationList,
          "id",
          days[item.duration]
        ),
        getoptionlabelkey: "label",
      },
    };

    column.renderSummaryCell = () => (
      <EvoHBox>
        <Typography
          mt={1}
          style={{ fontSize: "14px", fontWeight: 600, textAlign: "center" }}
        >
          {item.shift}
        </Typography>
      </EvoHBox>
    );

    return column;
  });

  const formData = {
    gap: 1,
    labelWidth: 100,
    direction: "column",
    items: [
      {
        label: "Work Plan",
        value: WorkPlan,
        required: true,
        onChange: (e) => setWorkPlan(e.target.value),
      },
      {
        label: "Active",
        value: checkStatus.Active,
        type: "checkbox",
        required: true,
        onChangeCheck: (e) => setCheckStatus({ ...checkStatus, Active: e }),
      },
    ],
  };
  // actions methods for Custom Dialog
  var actions = {
    onSave: isCreateOperation ? saveWorkPlan : UpdateWorkPlan,
  };
  if (isUpdateOperation) {
    actions.onDelete = deleteWorkPlanPopup;
  }
  actions.onCancel = props?.handleClose;

  return (
    <>
      <CustomDialog
        maxWidth="lg"
        width="lg"
        title="Work Plan"
        open={true}
        handleClose={actions.onCancel}
        snakeBarProps={snakeBarPropsWorkPlan}
        setSnakeBarProps={setSnakeBarPropsWorkPlan}
        actions={actions}
        isLoading={isLoading1 || isLoading2 || isLoading || updateLoader}
      >
        <EvoDataForm formData={formData} />
        <EvoDataGrid
          columns={tableColumns}
          rows={[days]}
          topSummaryRows={[0]}
        />
      </CustomDialog>

      {openDelete && (
        <DeleteModal
          title="Confirm Delete"
          toggleHandler={setOpenDelete}
          onDelete={deleteWorkPlanValue}
          isLoading={isLoading3}
        />
      )}
    </>
  );
};

export default ManageWorkPlanModal;
