import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { CustomDialog } from "../../../components/CustomDialog";
import { EvoButton } from "../../../components/EvoButton";
import {
  CreateSplitShift,
  UpdateSplitShift,
  GetSplitShiftData,
  deleteSplitShiftApi,
} from "../../../services/api";
import {
  useGetSplitSelectShift,
  useGetSplitShiftById,
} from "../../../services/rosterapi";
import {
  checkValidations,
  useGetOperations,
} from "../../../utils/commonService";
import { EvoDataForm } from "../../../components/EvoDataForm";
import EvoDataGrid from "../../../components/EvoDataGrid";
import getTableColumns from "./getTableColumns";
import DeleteModal from "../../../components/DeleteModal";
import moment from "moment";

const SplitShiftModal = (props) => {
  const {
    handleClose,
    editData,
    setSnakeBarPropsLandingPage,
    refetchSplitShiftList,
  } = props;
  const classes = useStyles();
  const {
    isCreateOperation,
    isUpdateOperation,
    value: splitShiftId,
  } = useGetOperations({
    params: editData,
    key: "spliShiftId",
  });
  const [snakeBarPropsSplitShiftDialog, setSnakeBarPropsSplitShiftDialog] =
    useState({});

  const [shiftName, setShiftName] = useState(editData.splitShiftName);
  const [selectedWorkDuration, setSelectedWorkDuration] = useState({});
  const [isLoading2, setIsLoading2] = useState(false);
  const [val, setVal] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userRemovalListFromBE, setUserRemovalListFromBE] = useState([]);

  const { data: splitShiftDropdownList, isLoading: isLoading1 } =
    useGetSplitSelectShift();

  // Validations on add Shift method
  const validateAddShifts = () => {
    const addSplitShiftValidations = [
      {
        msz: "Please enter split shift",
        type: "error",
        isMatch: shiftName === "",
      },
    ];
    return checkValidations({
      validations: addSplitShiftValidations,
      setSnakeBarProps: setSnakeBarPropsSplitShiftDialog,
    });
  };

  const removeSplitShift = (i) => {
    if (i >= 0) {
      var deleteval = [];
      if (val.length) {
        deleteval = [...val];
      }
      deleteval?.splice(i, 1);
      deleteval = deleteval.map((item, index) => {
        return { ...item, index: index };
      });
      setVal(deleteval);
    }
    if (editData) {
      const newDeleteListForBE = [...userRemovalListFromBE, val[i]];
      setUserRemovalListFromBE(newDeleteListForBE);
    }
  };
  const isTimeOverlapped = (obj) => {
    for (var i = 0; i < val.length; i++) {
      const { timeStart, timeEnd } = val[i];
      if (
        moment(obj.timeStart, "hh:mm A").isBetween(
          moment(timeStart, "hh:mm A"),
          moment(timeEnd, "hh:mm A")
        ) ||
        moment(obj.timeEnd, "hh:mm A").isBetween(
          moment(timeStart, "hh:mm A"),
          moment(timeEnd, "hh:mm A")
        ) ||
        moment(timeStart, "hh:mm A").isBetween(
          moment(obj.timeStart, "hh:mm A"),
          moment(obj.timeEnd, "hh:mm A")
        ) ||
        moment(timeEnd, "hh:mm A").isBetween(
          moment(obj.timeStart, "hh:mm A"),
          moment(obj.timeEnd, "hh:mm A")
        )
      ) {
        return true;
      }
    }
    return false;
  };
  const isDuplicateShift = (obj) => {
    for (var i = 0; i < val.length; i++) {
      const { workDurationId } = val[i];
      if (obj === workDurationId) {
        return true;
      }
    }
    return false;
  };

  const addShifts = async () => {
    if ("workDurationId" in selectedWorkDuration) {
      const workDurationId = selectedWorkDuration.workDurationId;
      setIsLoading2(true);
      const res = await GetSplitShiftData(workDurationId);
      if (res.status === 200) {
        const workDuration = res.data?.data;
        if (isDuplicateShift(workDuration.workDurationId)) {
          setSnakeBarPropsSplitShiftDialog({
            msz: "Duplicate Shift is not allowed",
            type: "error",
          });
        } else if (isTimeOverlapped(workDuration)) {
          setSnakeBarPropsSplitShiftDialog({
            msz: "Shift Time should not overlap with the added shifts.",
            type: "error",
          });
        } else {
          var list = [];
          if (val.length) {
            list = [...val];
          }
          if (
            typeof workDuration === "object" &&
            Object.keys(workDuration).length
          ) {
            list.push({
              ...workDuration,
              index: val.length,
            });
            setVal(list);
          }
        }
      } else {
      }
      setIsLoading2(false);
    }
  };

  //Api for create Split Shift
  const { mutate: CreateSplitShiftMutate, isLoading: isLoading3 } = useMutation(
    CreateSplitShift,
    {
      onSuccess: (data, context, variables) =>
        onSuccessCreateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorCreateRequest(data, context, variables),
    }
  );

  const onSuccessCreateRequest = (data, context) => {
    if (data) {
      setSnakeBarPropsLandingPage({
        msz: `${context.splitShift} is saved`,
        type: "success",
      });
      refetchSplitShiftList();

      handleClose();
    }
  };

  const onErrorCreateRequest = (error) => {
    if (error) {
      setSnakeBarPropsSplitShiftDialog({
        msz: error?.response?.data?.status?.description,
        type: "error",
      });

      handleClose();
    }
  };
  const validateSaveShifts = () => {
    const saveSplitShiftValidations = [
      {
        msz: "Please enter split shift",
        type: "error",
        isMatch: shiftName === "",
      },
      {
        msz: "Please add shift",
        type: "error",
        isMatch: val.length === 0,
      },
    ];

    return checkValidations({
      validations: saveSplitShiftValidations,
      setSnakeBarProps: setSnakeBarPropsSplitShiftDialog,
    });
  };

  const saveHandler = () => {
    if (validateSaveShifts()) {
      var list = [...val];
      list = list.map((item) => {
        delete item.index;
        return item;
      });
      var pData = {
        splitShift: shiftName,
        splitShiftWorkInfoDto: list,
      };
      CreateSplitShiftMutate(pData);
    }
  };

  //Api for create Split Shift
  const { mutate: UpdateSplitShiftMutate, isLoading: isLoading4 } = useMutation(
    UpdateSplitShift,
    {
      onSuccess: (data, context, variables) =>
        onSuccessUpdateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorUpdateRequest(data, context, variables),
    }
  );

  const onSuccessUpdateRequest = (data, context) => {
    if (data.status === 200) {
      setSnakeBarPropsLandingPage({
        msz: `${context.splitShift} is Updated`,
        type: "success",
      });
      refetchSplitShiftList();

      handleClose();
    }
  };

  const onErrorUpdateRequest = (error) => {
    if (error) {
      setSnakeBarPropsSplitShiftDialog({
        msz: error?.response?.data?.status?.description,
        type: "error",
      });

      handleClose();
    }
  };
  const updateHandler = () => {
    if (validateSaveShifts()) {
      var list = [...val];
      list = list.map((item) => {
        delete item.index;
        return item;
      });
      var pData = {
        spliShiftId: splitShiftId,
        splitShift: shiftName,
        splitShiftWorkInfoDto: list,
      };

      UpdateSplitShiftMutate(pData);
    }
  };

  //  API for Delete Work Plan
  const { mutate: DeleteWorkRotationMutate, isLoading: isLoading6 } =
    useMutation(deleteSplitShiftApi, {
      onSuccess: (data, context, variables) =>
        onSuccessDeleteRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorDeleteRequest(data, context, variables),
    });
  const onSuccessDeleteRequest = (data) => {
    if (data) {
      setSnakeBarPropsLandingPage({
        msz: `${editData?.splitShiftName} is deleted`,
        type: "success",
      });
      refetchSplitShiftList();

      setOpenDeleteModal(false);
      handleClose();
    }
  };
  const onErrorDeleteRequest = (error) => {
    if (error) {
      setSnakeBarPropsSplitShiftDialog({
        msz: "Some Network Issue !",
        type: "error",
      });
      setOpenDeleteModal(false);
      handleClose();
      refetchSplitShiftList();
    }
  };
  const deleteSplitShiftPopup = () => {
    setOpenDeleteModal(true);
  };
  const deleteSplitShift = () => {
    DeleteWorkRotationMutate(splitShiftId);
  };

  const splitShiftSelector = (obj) => {
    var list = [];
    if ("splitShiftWorkInfoDto" in obj) {
      list = [...obj.splitShiftWorkInfoDto];
    }
    list = list.map((item, index) => {
      return { ...item, index: index };
    });
    obj.splitShiftWorkInfoDto = list;

    return obj;
  };
  const { data: splitShiftData, isLoading: isLoading5 } = useGetSplitShiftById(
    {
      spliShiftId: splitShiftId,
    },
    splitShiftSelector,
    !isUpdateOperation
  );

  useEffect(() => {
    if (splitShiftData) {
      setVal(splitShiftData.splitShiftWorkInfoDto);
    }
  }, [splitShiftData]);

  // actions methods for Custom Dialog
  var actions = {};

  actions.onSave = isCreateOperation ? saveHandler : updateHandler;
  if (isUpdateOperation) {
    actions.onDelete = deleteSplitShiftPopup;
  }
  actions.onCancel = handleClose;

  const formData = {
    gap: 2,
    labelWidth: 90,
    direction: "column",
    items: [
      {
        label: "Split Shift",
        value: shiftName,
        required: true,
        editorProps: {
          width: 250,
          maxLength: 50,
        },
        onChange: (e) => setShiftName(e.target.value),
      },
      {
        label: "Select Shift",
        type: "dropdown",
        editorProps: {
          width: 250,
          id: "SelectShiftDropdown",
          data: splitShiftDropdownList,
          caller: setSelectedWorkDuration,
          month: selectedWorkDuration,
          getoptionlabelkey: "workDurationNameDesc",
        },
      },
    ],
  };

  var tableColumns = getTableColumns({
    removeSplitShift,
  });

  var totalDuration = moment.duration(0);

  if (Array.isArray(val)) {
    val.forEach((object) => {
      var durationParts = object.timeDuration.split(":");

      var duration = moment.duration({
        hours: durationParts[0],
        minutes: durationParts[1],
      });

      totalDuration.add(duration);
    });
  }

  var hours = totalDuration.hours();
  return (
    <>
      <CustomDialog
        // maxWidth="lg"
        // width={"700px"}
        title="Split Shift"
        open={true}
        isLoading={
          isLoading2 || isLoading3 || isLoading4 || isLoading5 || isLoading6
        }
        handleClose={handleClose}
        snakeBarProps={snakeBarPropsSplitShiftDialog}
        setSnakeBarProps={setSnakeBarPropsSplitShiftDialog}
        actions={actions}
      >
        <Grid>
          <Stack flexDirection={"row"} my={2}>
            <EvoDataForm formData={formData} />
            <Stack justifyContent={"end"} mr={3} paddingLeft={1}>
              <EvoButton
                btnText="Add"
                onClick={addShifts}
                startIcon={<AddIcon />}
              />
            </Stack>
          </Stack>
          <EvoDataGrid columns={tableColumns} rows={val} />
          <Box
            className={classes.textField}
            style={{ justifyContent: "flex-end" }}
          >
            <Grid item xs="">
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <Box textAlign="right">Total Shift Hours : </Box>
              </Typography>
            </Grid>
            <Grid xs="2">
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <Box textAlign="right">{hours}</Box>
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </CustomDialog>
      {openDeleteModal && (
        <DeleteModal
          title="Delete"
          onDelete={deleteSplitShift}
          toggleHandler={setOpenDeleteModal}
          text={editData?.splitShiftName}
        />
      )}
    </>
  );
};

export default SplitShiftModal;

const useStyles = makeStyles(() => ({
  textField: {
    display: "flex",
    alignItems: "center",
    margin: "10px",
  },
  addIcon: {
    color: "#60AA60",
    fontWeight: "bold",
    fontSize: "16px",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    height: "35px",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    // minWidth: "150%",
    margin: "5px",
    overflow: "scroll",
    minHeight: "fit-content",
  },
  innermainbox: {
    display: "inline-block",
    minWidth: "100%",
    verticalAlign: "top",
  },
  innerboxworkduration: {
    display: "flex !important",
    padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
  },
  time: {
    display: "flex",
    alignItems: "center",
    width: "20%",
  },
  duration: {
    display: "flex",
    alignItems: "center",
    width: "25%",
  },
  placer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
