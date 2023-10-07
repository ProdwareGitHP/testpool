import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import CustomCheckBox from "../../components/CustomCheckBox";
import { CustomDialog } from "../../components/CustomDialog";
import { EvoButton } from "../../components/EvoButton";
import { deleteRole, saveUserRole, updateUserRole } from "../../services/api";

import {
  useGetTaskGroupDetails,
  useGetTaskGroup,
  useGetUserList,
} from "../../services/accesscontrol";

import { useSelector } from "react-redux";
import { EvoDataForm } from "../../components/EvoDataForm";
import EvoDataGrid from "../../components/EvoDataGrid";
import { EvoHBox } from "../../components/EvoBox";
import getTemplate from "../../components/getTemplate";
import DeleteModal from "../../components/DeleteModal";
import { useGetOperations } from "../../utils/commonService";
import { moduleSelector } from "../allModules";

const AccessRoleModal = (props) => {
  const {
    editData,
    getRolesRefetch = () => {},
    handleClose,
    setErrorProps,
  } = props;

  const commonReducer = useSelector((state) => state.commonReducer);
  const { isCreateOperation, isUpdateOperation } = useGetOperations({
    params: editData,
    key: "userTaskRoleId",
  });
  const [expandedGroupIds, setExpandedGroupIds] = useState(new Set(["Staff"]));

  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [checkBoxedArray, setCheckBoxedArray] = useState([]);
  const [userRemovalListFromBE, setUserRemovalListFromBE] = useState([]);

  const [groupData, setGroupData] = useState([]);
  const [roleName, setRoleName] = useState(editData?.roleName);

  const [checkStatus, setCheckStatus] = useState({
    foreverFlag: editData?.enabled == "Y" ? true : false,
  });
  const [addRow, setAddRow] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);

  const handleAddRow = () => {
    const addCriteria = [...addRow];
    addCriteria.push({ index: addCriteria.length });
    setAddRow(addCriteria);
  };

  const handleDeleteCriteria = (index, item) => {
    const deletevalCriteria = [...addRow];
    deletevalCriteria.splice(index, 1);
    setAddRow(deletevalCriteria);

    if (editData) {
      const newDeleteListForBE = [...userRemovalListFromBE, addRow[index]];
      setUserRemovalListFromBE(newDeleteListForBE);
    }
  };

  const onErrorSaveUserRole = (data, context, variables) => {
    if (data) {
      setSnakeBarProps({
        type: "error",
        msz: "Unable to save user role",
      });
    }
  };

  const onErrorUpdateUserRole = (data, context, variables) => {
    if (data) {
      setSnakeBarProps({
        type: "error",
        msz: "Unable to update user role",
      });
    }
  };

  const { data: tasks = [], isLoading: isLoading1 } =
    useGetTaskGroupDetails(moduleSelector);

  const { data: tasksAssignedToUserRes = [], isLoading: isLoading2 } =
    useGetTaskGroup({
      id: editData?.userTaskRoleId,
    });

  const onSuccessDeleteRole = (data, context, variables) => {
    if (data?.data?.data) {
      setErrorProps({
        type: "Success",
        msz: "User Role deleted.",
      });
      setOpenDelete(false);
      getRolesRefetch();

      handleClose();
    }
  };

  // need to fix error scenario after backend fix
  const onSuccessSaveUserRole = (data, context, variables) => {
    setSnakeBarProps({
      type: "success",
      msz: "User Role saved.",
    });
    getRolesRefetch();
    handleClose();
  };
  const onSuccessUpdateUserRole = (data, context, variables) => {
    setSnakeBarProps({
      type: "success",
      msz: "User Role updated.",
    });
    getRolesRefetch();
    handleClose();
  };

  const onErrorDeleteRole = (data, context, variables) => {
    if (data) {
      setSnakeBarProps({
        type: "error",
        msz: "Unable to delete user role",
      });
      setOpenDelete(false);
    }
  };

  const { mutate: mutateDeleteRole, isLoading: isLoading3 } = useMutation(
    deleteRole,
    {
      onSuccess: (data, context, variables) =>
        onSuccessDeleteRole(data, context, variables),
      onError: (data, context, variables) =>
        onErrorDeleteRole(data, context, variables),
    }
  );

  const { mutate: mutateSaveUserRole, isLoading: isLoading4 } = useMutation(
    saveUserRole,
    {
      onSuccess: (data, context, variables) =>
        onSuccessSaveUserRole(data, context, variables),
      onError: (data, context, variables) =>
        onErrorSaveUserRole(data, context, variables),
    }
  );

  const { mutate: mutateUpdateUserRole, isLoading: isLoading5 } = useMutation(
    updateUserRole,
    {
      onSuccess: (data, context, variables) =>
        onSuccessUpdateUserRole(data, context, variables),
      onError: (data, context, variables) =>
        onErrorUpdateUserRole(data, context, variables),
    }
  );

  const { data: userListRes } = useGetUserList({
    id: editData?.userTaskRoleId,
  });

  useEffect(() => {
    if (!editData || !userListRes) return;
    setAddRow(userListRes.map((el, i) => ({ ...el, index: i })));
  }, [userListRes, editData]);

  const canCreateHandler = (e, item) => {
    setCheckBoxedArray((prev) => {
      let index = prev.findIndex((i) => i.taskId === item.taskId);
      if (index > -1) {
        prev[index] = { ...prev[index], canCreate: e ? "Y" : "N" };
      } else {
        prev.push({
          taskId: item.taskId,

          canCreate: e ? "Y" : "N",
          readOnly: item.readOnly,
        });
      }
      return prev;
    });
  };

  const readOnlyHandler = (e, item) => {
    setCheckBoxedArray((prev) => {
      let index = prev.findIndex((i) => i.taskId === item.taskId);
      if (index > -1) {
        prev[index] = { ...prev[index], readOnly: e ? "Y" : "N" };
      } else {
        prev.push({
          taskId: item.taskId,
          canCreate: item.canCreate,
          readOnly: e ? "Y" : "N",
        });
      }
      return prev;
    });
  };

  const saveHandler = () => {
    if (roleName === "") {
      setSnakeBarProps({
        msz: "Role Name is required",
        type: "error",
      });
      return;
    }
    const isEmptyField = addRow.find((fn) => !fn.fullName);

    if (addRow.length && isEmptyField) {
      setSnakeBarProps({
        msz: "User is required",
        type: "error",
      });
      return;
    }
    let Pdata = {
      roleName: roleName,
      enabled: checkStatus.foreverFlag ? "Y" : "N",
      createdBy: commonReducer?.userId,
      lastUpdatedBy: commonReducer?.userId,
      taskDetailsLine: checkBoxedArray,
      userDetails: addRow,
    };

    mutateSaveUserRole(Pdata);
  };

  const updateHandler = () => {
    if (roleName === "") {
      setSnakeBarProps({
        msz: "Role Name is required",
        type: "error",
      });
      return;
    }
    const isEmptyField = addRow.find((fn) => !fn.fullName);

    if (addRow.length && isEmptyField) {
      setSnakeBarProps({
        msz: "User is required",
        type: "error",
      });
      return;
    }
    let pData = {
      userTaskRoleId: editData?.userTaskRoleId,
      roleName: roleName,
      enabled: checkStatus.foreverFlag ? "Y" : "N",
      createdBy: commonReducer?.userId,
      lastUpdatedBy: commonReducer?.userId,
      taskDetailsLine: checkBoxedArray,
      userDetails: addRow,
      userRemoveList: userRemovalListFromBE,
    };

    mutateUpdateUserRole(pData);
  };

  const deleteHandler = () => {
    let pData = {
      id: editData?.userTaskRoleId,
    };
    mutateDeleteRole(pData);
  };
  const deleteUserRole = () => {
    setOpenDelete(true);
  };
  const handleChangeUser = (item, index) => {
    var newArr = [...addRow];
    newArr[index].fullName = item.fullName || "";
    newArr[index].userId = item.userId || "";
    setAddRow(newArr);
  };

  const formData = {
    gap: 2,
    labelWidth: 90,
    title: "User Role",
    items: [
      {
        label: "Role Name",
        value: roleName,
        required: true,
        required: true,
        onChange: (e) => setRoleName(e.target.value),
      },
      {
        label: "Enabled ?",
        value: checkStatus.foreverFlag,
        type: "checkbox",
        onChangeCheck: (e) =>
          setCheckStatus({ ...checkStatus, foreverFlag: e }),
      },
    ],
  };

  const usersTableColumns = [
    {
      key: "index",
      name: "#",
      width: 14,
      renderCell: ({ row }) => row.index + 1,
    },
    {
      key: "fullName",
      columnKey: "fullName",
      name: "User",
      type: "lookup",
      width: 200,
      height: 90,
      templateMethod: () => getTemplate("USER_TEMPLATE"),
      selectItem: handleChangeUser,
    },
    {
      key: "hierarchy",
      name: "Action",
      type: "delete",
      onDeleted: (i) => handleDeleteCriteria(i),
      width: 80,
    },
  ];

  const tasksTableColumns = [
    {
      key: "groupName",
      name: "Group",
      width: 200,
    },
    { key: "taskName", name: "Task", width: 250 },
    {
      key: "canCreate",
      name: "Full Access ?",
      width: 160,
      type: "icon",
      renderCell: ({ row, column }) => (
        <EvoHBox justifyContent="center">
          <CustomCheckBox
            check={row[column.key] === "Y" ? true : false}
            onChangeCheck={(e) => {
              canCreateHandler(e, row);
            }}
          />
        </EvoHBox>
      ),
    },
    {
      key: "readOnly",
      name: "Read Only ?",
      type: "icon",
      width: 80,
      renderCell: ({ row, column }) => (
        <EvoHBox justifyContent="center">
          <CustomCheckBox
            check={row[column.key] === "Y" ? true : false}
            onChangeCheck={(e) => {
              readOnlyHandler(e, row);
            }}
          />
        </EvoHBox>
      ),
    },
  ];

  const AddUserHeaderComponent = () => (
    <EvoButton
      btnText="Add User"
      startIcon={<AddIcon />}
      onClick={handleAddRow}
    />
  );
  var actions = {
    onSave: isCreateOperation ? saveHandler : updateHandler,
  };
  if (isUpdateOperation) {
    actions.onDelete = deleteUserRole;
  }
  actions.onCancel = handleClose;
  const emptyAceess = {
    canCreate: "N",
    canDelete: "N",
    canEdit: "N",
    canView: "N",
  };
  function mergeAccess(acc, task) {
    let match = (tasksAssignedToUserRes || []).find(
      (ac) => ac.taskId === task.taskId
    );
    acc.push({
      ...task,
      ...(match || emptyAceess),
    });
    return acc;
  }
  return (
    <>
      {" "}
      <CustomDialog
        maxWidth="xl"
        title="User Role"
        open="true"
        width={"xl"}
        handleClose={handleClose}
        isLoading={isLoading1 || isLoading2 || isLoading4 || isLoading5}
        snakeBarProps={snakeBarProps}
        setSnakeBarProps={setSnakeBarProps}
        actions={
          editData === undefined
            ? { onSave: saveHandler, onCancel: handleClose }
            : {
                onSave: updateHandler,
                onDelete: deleteUserRole,
                onCancel: handleClose,
              }
        }
      >
        <Grid xs="12" style={{ display: "flex", flexDirection: "row" }}>
          <Grid xs="8">
            <EvoDataForm formData={formData} />

            <EvoDataGrid
              columns={tasksTableColumns}
              filterId="taskId"
              title="Tasks"
              rows={tasks?.reduce(mergeAccess, [])}
              groupByColumns={["groupName"]}
              expandedGroupIds={expandedGroupIds}
              setExpandedGroupIds={setExpandedGroupIds}
            />
          </Grid>

          <Grid
            xs="4"
            style={{
              border: "3px solid #ededed",
              padding: "5px",
              margin: "5px",
            }}
          >
            <EvoDataGrid
              HeaderComponent={AddUserHeaderComponent}
              columns={usersTableColumns}
              rows={addRow}
              filterId="taskId"
              title="Add User In Role"
            />
          </Grid>
        </Grid>
      </CustomDialog>
      {openDelete && (
        <DeleteModal
          toggleHandler={setOpenDelete}
          onDelete={deleteHandler}
          isLoading={isLoading3}
        />
      )}
    </>
  );
};

export default AccessRoleModal;
