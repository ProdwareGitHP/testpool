import AddIcon from "@mui/icons-material/Add";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../../components/CustomDialog";
import { EvoButton } from "../../../components/EvoButton";
import EvoDataGrid from "../../../components/EvoDataGrid";
import {
  createWorkRotation,
  updateWorkRotation,
  deleteworkRotation,
} from "../../../services/api";
import {
  checkValidations,
  dateConverter,
  useGetOperations,
} from "../../../utils/commonService";
import { useGetWorkRotationById } from "../../../services/rosterapi";
import { EvoDataForm } from "../../../components/EvoDataForm";
import getTemplate from "../../../components/getTemplate";
import getTableColumns from "./getTableColumns";
import DeleteModal from "../../../components/DeleteModal";

const NewRotationModal = (props) => {
  const {
    handleClose,
    editData,
    setSnakeBarPropsLandingPage,
    refetchWorkDurationList,
  } = props;
  const {
    isCreateOperation,
    isUpdateOperation,
    value: workRotationId,
  } = useGetOperations({
    params: editData,
    key: "workRotationId",
  });
  const isReadOnlyOperation = isUpdateOperation && editData.expiryDate !== null;
  const [snakeBarPropsRotationDialog, setSnakeBarPropsRotationDialog] =
    useState({});

  const commonReducer = useSelector((state) => state.commonReducer);
  const [startDate, setStartDate] = React.useState(null);
  const [workRotationName, setWorkRotationName] = useState("");
  const [noRotation, setNoRotation] = useState(editData.noRotation);
  const [checkStatus, setCheckStatus] = useState({
    foreverFlag: false,
  });

  const [val, setVal] = useState([]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleAdd = () => {
    var valList = [];
    if (Array.isArray(val)) {
      if (val.length) {
        valList = [...val];
      }
      valList.push({
        index: valList.length,
        sequence: "",
        iteration: "",
        workPlanId: "",
        workPlanDto: {},
      });
    }
    setVal(valList);
  };

  //Api for create work Rotation
  const { mutate: CreateWorkRotationMutate, isLoading: isLoading1 } =
    useMutation(createWorkRotation, {
      onSuccess: (data, context, variables) =>
        onSuccessCreateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorCreateRequest(data, context, variables),
    });

  const onSuccessCreateRequest = (data) => {
    if (data) {
      setSnakeBarPropsLandingPage({
        msz: "Work Rotation Saved.",
        type: "success",
      });
      handleClose();
      refetchWorkDurationList();
    }
  };

  const onErrorCreateRequest = (error) => {
    if (error) {
      setSnakeBarPropsRotationDialog({
        msz: error?.response?.data?.status?.description,
        type: "error",
      });
    }
  };

  const WorkRotationValidations = [
    {
      msz: "Please enter any value in Work Rotation!",
      type: "error",
      isMatch: workRotationName === "",
    },

    {
      msz: "Please enter the start from date value!",
      type: "error",
      isMatch: startDate === null,
    },
    {
      msz: "No of Rotation value must be a number!",
      type: "error",
      isMatch: isNaN(noRotation),
    },

    {
      msz: "Please enter value between 0 to 99 !",
      type: "error",
      isMatch: noRotation < 0 || noRotation > 99,
    },
  ];

  let getWorkDurationValidations = () => {
    let WorkDurationsValidations = [];
    val.map((item) => {
      if ("workPlanId" in item) {
        var isMatched = item.workPlanId === "";
        if (isMatched) {
          WorkDurationsValidations.push({
            msz: "Please enter any value in Work Plan!",
            type: "error",
            isMatch: isMatched,
          });
        }
      }
      if ("sequence" in item) {
        var isMatched = item.sequence === "";
        if (isMatched) {
          WorkDurationsValidations.push({
            msz: "Please enter the Sequence!",
            type: "error",
            isMatch: isMatched,
          });
        }
      }
      if ("sequence" in item) {
        isMatched = isNaN(item.sequence);
        if (isMatched) {
          WorkDurationsValidations.push({
            msz: "Sequence value must be a number",
            type: "error",
            isMatch: isMatched,
          });
        }
      }

      if ("sequence" in item) {
        isMatched = item.sequence < 0 || item.sequence > 99;
        if (isMatched) {
          WorkDurationsValidations.push({
            msz: "Please enter Sequence value between 0 to 99 !",
            type: "error",
            isMatch: isMatched,
          });
        }
      }

      if ("iteration" in item) {
        isMatched = item.iteration === "";
        if (isMatched) {
          WorkDurationsValidations.push({
            msz: "Please enter Iteration value  !",
            type: "error",
            isMatch: isMatched,
          });
        }
        isMatched = item.iteration < 0 || item.iteration > 99;
        if (isMatched) {
          WorkDurationsValidations.push({
            msz: "Please enter Iteration value between 0 to 99 !",
            type: "error",
            isMatch: isMatched,
          });
        }
      }
      if ("iteration" in item) {
        isMatched = isNaN(item.iteration);
        if (isMatched) {
          WorkDurationsValidations.push({
            msz: "The value must be a number",
            type: "error",
            isMatch: isMatched,
          });
        }
      }
      
    });
    return WorkDurationsValidations;
  };
  // Validations on save method
  const validateOnSave = () => {
    if (val.length) {
      var validations = [];
      if (
        Array.isArray(WorkRotationValidations) &&
        WorkRotationValidations.length
      ) {
        var WorkDurationsValidations = getWorkDurationValidations();
        validations = [...WorkRotationValidations, ...WorkDurationsValidations];
      }
      return checkValidations({
        validations: validations,
        setSnakeBarProps: setSnakeBarPropsRotationDialog,
      });
    } else {
      return checkValidations({
        validations: WorkRotationValidations,
        setSnakeBarProps: setSnakeBarPropsRotationDialog,
      });
    }
  };

  const saveHandler = () => {
    if (validateOnSave()) {
      var pdata = {
        forverFlag: checkStatus.foreverFlag == true ? "Y" : "N",
        numberOfrotation: noRotation,
        userId: commonReducer.userId,
        startFrom: dateConverter(startDate),
        workRotationName: workRotationName,
        workRotationLineList: getWorkRotationLineList(),
      };
      CreateWorkRotationMutate(pdata);
    }
  };

  const getWorkRotationLineList = () => {
    if (Array.isArray(val) && val.length) {
      var res = [...val].map((val) => ({
        iteration: val.iteration,
        sequence: val.sequence,
        workPlanId: val.workPlanId,
      }));
      return res;
    } else {
      return [];
    }
  };

  //Api for create work Rotation
  const { mutate: updateWorkRotationMutate, isLoading: isLoading2 } =
    useMutation(updateWorkRotation, {
      onSuccess: (data, context, variables) =>
        onSuccessUpdateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorUpdateRequest(data, context, variables),
    });

  const onSuccessUpdateRequest = (data) => {
    if (data) {
      setSnakeBarPropsLandingPage({
        msz: "Work Rotation Updated Successfully.",
        type: "success",
      });
      handleClose();
      refetchWorkDurationList();
    }
  };
  // api error
  const onErrorUpdateRequest = (error) => {
    if (error) {
      setSnakeBarPropsRotationDialog({
        msz: error?.response?.data?.status?.description,
        type: "error",
      });
    }
  };
  // Validations on save method
  const validateOnUpdate = () => {
    if (val.length) {
      var validations = [];
      if (
        Array.isArray(WorkRotationValidations) &&
        WorkRotationValidations.length
      ) {
        var WorkDurationsValidations = getWorkDurationValidations();
        validations = [...WorkRotationValidations, ...WorkDurationsValidations];
      }
      return checkValidations({
        validations: validations,
        setSnakeBarProps: setSnakeBarPropsRotationDialog,
      });
    } else {
      return checkValidations({
        validations: WorkRotationValidations,
        setSnakeBarProps: setSnakeBarPropsRotationDialog,
      });
    }
  };

  const updateHandler = () => {
    if (validateOnUpdate()) {
      var pdata = {
        workRotationId: editData?.workRotationId,
        forverFlag: checkStatus.foreverFlag == true ? "Y" : "N",
        numberOfrotation: noRotation,
        userId: commonReducer.userId,
        startFrom: dateConverter(startDate),
        workRotationName: workRotationName,
        workRotationLineList: getWorkRotationLineList(),
      };
      updateWorkRotationMutate(pdata);
    }
  };

  //  API for Delete Work Plan
  const { mutate: DeleteWorkRotationMutate, isLoading: isLoading3 } =
    useMutation(deleteworkRotation, {
      onSuccess: (data, context, variables) =>
        onSuccessDeleteRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorDeleteRequest(data, context, variables),
    });
  const onSuccessDeleteRequest = (data) => {
    if (data) {
      setSnakeBarPropsLandingPage({
        msz: "Work Rotation deleted.",
        type: "success",
      });
      refetchWorkDurationList();

      setOpenDeleteModal(false);
      handleClose();
    }
  };
  const onErrorDeleteRequest = (error) => {
    if (error) {
      setSnakeBarPropsRotationDialog({
        msz: "Unable to Delete Rotation",
        type: "error",
      });
      setOpenDeleteModal(false);
    }
  };

  const deleteWorkRotationValue = () => {
    const id = editData?.workRotationId;
    DeleteWorkRotationMutate(id);
  };
  const workRotationSelector = (rotation) => {
    var list = rotation?.workRotationLineList;
    if (Array.isArray(list)) {
      list = list.map((item, index) => {
        var workPlanName = "";
        if (item.workPlanDto !== null && "workPlanName" in item.workPlanDto) {
          workPlanName = item.workPlanDto?.workPlanName;
        }
        return {
          ...item,
          workPlanName: workPlanName,
          index: index,
        };
      });
    } else {
      list = [];
    }

    rotation.workRotationLineList = list;
    return rotation;
  };
  const { data: singleWorkRotation, isLoading: isLoading4 } =
    useGetWorkRotationById(
      {
        workRotationId: workRotationId,
      },
      workRotationSelector,
      !isUpdateOperation
    );

  useEffect(() => {
    if (singleWorkRotation) {
      setWorkRotationName(singleWorkRotation?.workRotationName);
      setStartDate(new Date(singleWorkRotation?.startFrom));
      setNoRotation(singleWorkRotation?.numberOfrotation);
      setCheckStatus({
        foreverFlag: singleWorkRotation.forverFlag == "Y" ? true : false,
      });
      setVal(singleWorkRotation?.workRotationLineList);
    }
  }, [singleWorkRotation]);

  const workPlanTemplate = () => {
    return getTemplate("WORK_PLAN");
  };

  const updateArr = (index, arr) => {
    var newArr = [...val];
    if (newArr && newArr.length) {
      arr.map((item) => {
        newArr[index][item.key] = item.newValue ? item.newValue : "";
      });

      setVal(newArr);
    }
  };

  const handleChangeWorkPlanName = (item, index) => {
    var arr = [
      { key: "workPlanId", newValue: item["workPlanId"] },
      { key: "workPlanName", newValue: item["workPlanName"] },
      { key: "workPlanDto", newValue: item },
    ];
    updateArr(index, arr);
  };

  const handleSequence = (value, index) => {
    var arr = [{ key: "sequence", newValue: value }];
    updateArr(index, arr);
  };
  const handleIteration = (value, index) => {
    var arr = [{ key: "iteration", newValue: value }];
    updateArr(index, arr);
  };
  const deleteWorkRotations = (i) => {
    var deleteval = [...val];
    deleteval?.splice(i, 1);
    deleteval = deleteval.map((item, index) => {
      return { ...item, index: index };
    });
    setVal(deleteval);
  };
  const renderWorkDurationCell = ({ row, column }) => {
    if (row.workPlanDto !== null && column.key in row.workPlanDto) {
      return row.workPlanDto[column.key];
    } else {
      return "";
    }
  };

  var tableColumns = getTableColumns({
    deleteWorkRotations,
    workPlanTemplate,
    handleChangeWorkPlanName,
    handleSequence,
    handleIteration,
    renderWorkDurationCell,
    isReadOnlyOperation,
  });
  const formData = {
    gap: 2,
    labelWidth: 120,
    direction: "column",
    items: [
      {
        label: "Work Rotation",
        value: workRotationName,
        required: true,
        onChange: (e) => setWorkRotationName(e.target.value),
        editorProps: {
          disabled: isReadOnlyOperation,
          maxLength: 100,
        },
      },
      {
        label: "Start From",
        value: startDate,
        required: true,
        type: "date",
        styles: { width: 170, justifyContent: "end" },
        onChange: (date) => setStartDate(date),
        editorProps: {
          disabled: isReadOnlyOperation,
        },
      },
      {
        label: "No. of Rotation",
        value: noRotation,
        required: true,
        type: "number",
        textAlign: "left",
        onChange: (e) => setNoRotation(e.target.value),
        isVisble: !checkStatus.foreverFlag,
        editorProps: {
          disabled: isReadOnlyOperation,
          maxLength: 3,
        },
      },

      {
        label: "Forever Flag",
        value: checkStatus.foreverFlag,
        type: "checkbox",
        onChangeCheck: (e) =>
          setCheckStatus({ ...checkStatus, foreverFlag: e }),
      },
    ],
  };
  const HeaderComponent = () => (
    <EvoButton
      btnText="New"
      startIcon={<AddIcon />}
      onClick={() => handleAdd(true)}
    />
  );
  const deleteWorkRotationPopup = () => {
    setOpenDeleteModal(true);
  };
  // actions methods for Custom Dialog
  var actions = {};
  if (!isReadOnlyOperation) {
    actions.onSave = isCreateOperation ? saveHandler : updateHandler;
  }
  if (editData.expiryDate === null) {
    actions.onDelete = deleteWorkRotationPopup;
  }
  actions.onCancel = handleClose;

  return (
    <>
      <CustomDialog
        open={true}
        maxWidth="lg"
        title="Work Rotation"
        handleClose={handleClose}
        isLoading={isLoading1 || isLoading2 || isLoading4}
        snakeBarProps={snakeBarPropsRotationDialog}
        setSnakeBarProps={setSnakeBarPropsRotationDialog}
        actions={actions}
      >
        <Grid style={{ marginBottom: "30px" }}>
          <Grid>
            <Box mb={2}>
              <EvoDataForm formData={formData} />
            </Box>
            <EvoDataGrid
              columns={tableColumns}
              rows={val}
              HeaderComponent={!isReadOnlyOperation ? HeaderComponent : ""}
            />
          </Grid>
        </Grid>
      </CustomDialog>
      {openDeleteModal && (
        <DeleteModal
          title="Confirm Delete"
          toggleHandler={setOpenDeleteModal}
          onDelete={deleteWorkRotationValue}
          isLoading={isLoading3}
        />
      )}
    </>
  );
};

export default NewRotationModal;
