export default function getTableColumns(props) {
  const { removeSplitShift } = props;
  var tableColumns = [
    {
      key: "workDurationName",
      name: "Work Duration",
      width: 150,
    },
    {
      key: "timeStart",
      name: "Time Start",
      type: "time",
    },
    {
      key: "timeEnd",
      name: "Time End",
      type: "time",
    },
    {
      key: "timeDuration",
      name: "Duration",
      width: 80,
      type: "float",
    },
    {
      key: "remove",
      name: "Remove",
      type: "delete",
      tooltip: "Remove",
      width: 90,
      onDeleted: removeSplitShift,
    },
  ];
  return tableColumns;
}
