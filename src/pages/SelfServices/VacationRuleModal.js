import { makeStyles } from "@mui/styles";
import moment from "moment";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../components/CustomDialog";
import { EvoDataForm } from "../../components/EvoDataForm";
import getTemplate from "../../components/getTemplate";
import { createRule, updateRule } from "../../services/api";
import { useTaskData } from "../../services/selfservice";
import { checkValidations, dateConverter } from "../../utils/commonService";
import UserModal from "./UserModal";

const actionDataArr = [{ actionId: 1, actionType: "Forward" }];

const VacationRuleModal = (props) => {
  const { handleClose, onSuccess, getAllrefetch, editData } = props;
  const [errorProps, setErrorProps] = useState({});
  const [userModaldialog, setUserModaldialog] = useState(false);
  const [startDate, setStartDate] = useState(
    editData === undefined ? null : new Date(dateConverter(editData?.startDate))
  );
  const [endDate, setEndDate] = useState(
    editData === undefined ? null : new Date(dateConverter(editData?.endDate))
  );

  const { data: tasksData } = useTaskData();
  const [task, setTask] = useState(
    editData === undefined ? null : editData?.taskName
  );

  const [actionType, setActionType] = useState(
    editData === undefined ? null : editData?.actionType
  );

  const [employeeData, setEmployeeData] = useState(editData);
  const getallUserDataProps = () => {
    return {
      pageNo: 1,
      pageSize: 10,
      sortBy: "",
      asc: "",
    };
  };

  const userTemplate = () => {
    return getTemplate("USER_TEMPLATE", getallUserDataProps());
  };
  const handelEmployeechange = (iitem) => {
    setEmployeeData(iitem);
  };

  const { mutate: CreateVactionRuleMutate, isLoading: isCreating } =
    useMutation(createRule, {
      onSuccess: onSuccess,
      onError: (error) => {
        if (error) {
          setErrorProps({
            msz: "Unable to create vacation rule",
            type: "error",
          });
        }
      },
    });
  const validate = () => {
    const validations = [
      {
        msz: "Please Enter The Start  Date !",
        type: "error",
        isMatch: startDate == null,
      },
      {
        msz: "Please Enter the  End Date!",
        type: "error",
        isMatch: endDate == null,
      },
      {
        msz: "Task is Required !",
        type: "error",
        isMatch: task?.taskId == undefined,
      },
      {
        msz: "Action Type is Required !",
        type: "error",
        isMatch: actionType == null,
      },
      {
        msz: "To User is Required !",
        type: "error",
        isMatch: employeeData?.userId === undefined,
      },
    ];
    return checkValidations({
      validations: validations,
      setSnakeBarProps: setErrorProps,
    });
  };
  const saveHandler = () => {
    if (validate()) {
      var pdata = {
        startDate: moment(startDate).format("DD-MM-YY"),
        endDate: moment(endDate).format("DD-MM-YY"),
        toUserId: employeeData?.userId,
        taskId: task?.taskId,
        actionType: actionType?.actionType,
      };

      setErrorProps(null);
      CreateVactionRuleMutate(pdata);
    }
  };

  const { mutate: UpdateVactionRuleMutate, isLoading } = useMutation(
    updateRule,
    {
      onSuccess: onSuccess,
      onError: (error) => {
        if (error) {
          setErrorProps({
            msz: "Unable to update vacation rule",
            type: "error",
          });
        }
      },
    }
  );

  const updateHandler = () => {
    if (validate()) {
      var pdata = {
        vacationRuleId: editData?.vacationRuleId,
        startDate: moment(startDate).format("DD-MM-YY"),
        endDate: moment(endDate).format("DD-MM-YY"),
        toUserId: employeeData?.userId,
        taskId: task?.taskId,
        actionType: actionType?.actionType,
      };

      setErrorProps(null);
      UpdateVactionRuleMutate(pdata);
    }
  };

  const formData = {
    gap: 2,
    labelWidth: 90,
    items: [
      {
        label: "Start Date",
        value: startDate,
        required: true,
        type: "date",
        styles: { width: 130, justifyContent: "end" },

        onChange: (date) => setStartDate(date),
      },
      {
        label: "End Date",
        value: endDate,
        required: true,
        type: "date",
        onChange: (date) => setEndDate(date),
        styles: { width: 130, justifyContent: "end" },
      },
      {
        label: "Task",
        value: task?.taskName,
        required: true,

        type: "dropdown",
        editorProps: {
          data: tasksData,
          caller: setTask,
          month: task,
          width: 220,
          selectIndex: tasksData?.findIndex(
            (item) => item?.taskId === editData?.taskId
          ),
          getoptionlabelkey: "taskName",
        },
      },
      {
        label: "Action Type",
        value: actionType?.actionType,
        required: true,

        type: "dropdown",
        editorProps: {
          width: 130,
          data: actionDataArr,
          caller: setActionType,
          month: actionType,
          getoptionlabelkey: "actionType",
          selectIndex: actionDataArr?.findIndex(
            (item) => item?.actionType === editData?.actionType
          ),
        },
      },
      {
        label: "To User",
        value: employeeData,
        type: "lookup",
        required: true,

        isVisble:
          startDate != null &&
          endDate != null &&
          task?.taskId != null &&
          actionType?.actionType != null,
        editorProps: {
          selectItem: handelEmployeechange,
          template: getTemplate(
            "USER_TEMPLATE",
            null,
            null,
            null,
            "Search & Select : To User"
          ),
          columnKey: "fullName",
        },
      },
    ],
  };

  return (
    <CustomDialog
      snakeBarProps={errorProps}
      setSnakeBarProps={setErrorProps}
      title={(editData === undefined ? "Add" : "Edit") + " Vacation Rule"}
      open={props}
      maxWidth="xs"
      isLoading={isLoading || isCreating}
      handleClose={handleClose}
      actions={{
        onSave: editData == undefined ? saveHandler : updateHandler,
        onCancel: handleClose,
      }}
    >
      <EvoDataForm formData={formData} />

      {userModaldialog && (
        <UserModal
          toggleHandler={setUserModaldialog}
          handelEmployeechange={handelEmployeechange}
          // user={user}
          open={userModaldialog}
        />
      )}
    </CustomDialog>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: "10px",
    width: 300,
    justifyContent: "space-between",
  },
}));
export default VacationRuleModal;
