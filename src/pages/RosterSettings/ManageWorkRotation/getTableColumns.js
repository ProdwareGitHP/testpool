export default function getTableColumns(props) {
  const {
    deleteWorkRotations,
    workPlanTemplate,
    handleChangeWorkPlanName,
    handleSequence,
    handleIteration,
    renderWorkDurationCell,
    isReadOnlyOperation,
  } = props;
  var tableColumns = [
    {
      key: "remove",
      name: "Action",
      type: "delete",
      width: 80,
      onDeleted: deleteWorkRotations,
    },
    {
      key: "workPlanName",
      name: "Work plan",
      type: "lookup",
      required: true,
      width: 200,
      templateMethod: workPlanTemplate,
      selectItem: handleChangeWorkPlanName,
      editorProps: {
        disabled: isReadOnlyOperation,
      },
    },
    {
      key: "sequence",
      name: "Sequence",
      type: "text",
      textAlign: "right",
      value: "",
      onChange: handleSequence,
      width: 150,
      editorProps: {
        maxLength:3,
        disabled: isReadOnlyOperation,
      },
    },
    {
      key: "iteration",
      name: "Iteration",
      value: "",
      type: "text",
      textAlign: "right",

      onChange: handleIteration,
      width: 150,
      editorProps: {
        disabled: isReadOnlyOperation,
        maxLength:5
      },
    },

    {
      key: "workDurationNameD1",
      name: "Sun",
      width: 100,
      renderCell: renderWorkDurationCell,
    },
    {
      key: "workDurationNameD2",
      name: "Mon",
      width: 100,
      renderCell: renderWorkDurationCell,
    },
    {
      key: "workDurationNameD3",
      name: "Tue",
      width: 100,
      renderCell: renderWorkDurationCell,
    },
    {
      key: "workDurationNameD4",
      name: "Wed",
      width: 100,
      renderCell: renderWorkDurationCell,
    },
    {
      key: "workDurationNameD5",
      name: "Thu",
      width: 100,
      renderCell: renderWorkDurationCell,
    },
    {
      key: "workDurationNameD6",
      name: "Fri",
      width: 100,
      renderCell: renderWorkDurationCell,
    },
    {
      key: "workDurationNameD7",
      name: "Sat",
      width: 100,
      renderCell: renderWorkDurationCell,
    },
  ];
  if (isReadOnlyOperation) {
    tableColumns.splice(0, 1);
  }
  return tableColumns;
}
