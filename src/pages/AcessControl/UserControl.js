import React, { useState } from "react";
import { CustomPage } from "../../components/CustomPage";
import { EvoDataForm } from "../../components/EvoDataForm";
import EvoDataGrid from "../../components/EvoDataGrid";
import getTemplate from "../../components/getTemplate";
import { useTaskByUserId } from "../../services/accesscontrol";

import { moduleSelector } from "../../pages/allModules";
import { useGetTaskGroupDetails } from "../../services/accesscontrol";
import CustomCheckBox from "../../components/CustomCheckBox";
import { useMutation } from "react-query";
import { saveUser } from "../../services/api";
import { EvoHBox } from "../../components/EvoBox";

const UserControl = (props) => {
  const [employee, setEmployee] = useState(null);

  const [errorProps, setErrorProps] = useState(null);

  const {
    data: controlData,
    isLoading: isLoading2,
    refetch,
  } = useTaskByUserId(employee, employee ? false : true);

  const [expandedGroupIds, setExpandedGroupIds] = useState(new Set(["Staff"]));

  const { mutate: mutateSaveUserTask, isLoading: isSaving } = useMutation(
    saveUser,
    {
      onSuccess: (data) => {
        refetch();
        setErrorProps({
          type: "success",
          msz: "Task Control Updated",
        });
      },
      onError: (data) => {},
    }
  );

  const canCreateHandler = (item, checked) => {
    let pData = {
      userId: employee?.userId,
      taskId: item?.taskId,
      groupSeq: item?.taskGroupId,
      canView: item.canView === "Y" ? true : false,
      canCreateEditDeleteFlag: checked ? true : false,
    };
    mutateSaveUserTask(pData);
  };

  const canViewHandler = (item, checked) => {
    let pData = {
      userId: employee?.userId,
      taskId: item?.taskId,
      groupSeq: item?.taskGroupId,
      canView: checked ? true : false,
      canCreateEditDeleteFlag: item.canCreate === "Y" ? true : false,
    };
    mutateSaveUserTask(pData);
  };

  const tableColumns = [
    { key: "groupName", name: "Group", width: 200 },
    { key: "taskName", name: "Task", width: 250 },
    {
      key: "canCreate",
      name: "Create/Edit/Delete",
      width: 160,
      type: "icon",
      renderCell: ({ row, column }) =>
        employee ? (
          <EvoHBox justifyContent="center">
            <CustomCheckBox
              check={row[column.key] === "Y" ? true : false}
              onChangeCheck={(e) => canCreateHandler(row, e)}
            />
          </EvoHBox>
        ) : null,
    },
    {
      key: "canView",
      name: "View",
      type: "icon",
      width: 80,
      renderCell: ({ row, column }) =>
        employee ? (
          <EvoHBox justifyContent="center">
            <CustomCheckBox
              check={row[column.key] === "Y" ? true : false}
              onChangeCheck={(e) => canViewHandler(row, e)}
            />
          </EvoHBox>
        ) : null,
    },
  ];

  const emptyAceess = {
    canCreate: "N",
    canDelete: "N",
    canEdit: "N",
    canView: "N",
  };

  function mergeAccess(acc, task) {
    let match = (controlData || []).find((ac) => ac.taskId === task.taskId);
    acc.push({
      ...task,
      ...(match || emptyAceess),
    });
    return acc;
  }

  const { data: taskData = [] } = useGetTaskGroupDetails(moduleSelector);

  return (
    <CustomPage
      title={props.title}
      isLoading={isLoading2 || isSaving}
      snakeBarProps={errorProps}
    >
      <EvoDataForm
        formData={{
          item: {
            label: "Select Employee",
            value: employee,
            type: "lookup",
            editorProps: {
              template: getTemplate("USER_TEMPLATE"),
              columnKey: "fullName",
              selectItem: setEmployee,
            },
          },
        }}
      />
      {employee && (
        <EvoDataGrid
          title={employee?.fullName}
          columns={tableColumns}
          expandedGroupIds={expandedGroupIds}
          setExpandedGroupIds={setExpandedGroupIds}
          rows={taskData.reduce(mergeAccess, [])}
          filterId="taskId"
          groupByColumns={["groupName"]}
        />
      )}
    </CustomPage>
  );
};

export default UserControl;
