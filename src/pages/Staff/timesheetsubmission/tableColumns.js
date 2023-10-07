import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SubHeader from "../../../components/EvoDataGrid/SubHeader";
import { EmployeeDetailModal } from "./EmployeeDetailModal";
import StatusCell from "./StatusCell";
import { paycodes, setCardValueByType } from "../../contants";

export default function getTableColumns(dayArr, oriPagedata, refetchList) {
  let columns = [
    {
      key: "action",
      name: "Action",
      type: "action",
      width: 60,
      frozen: true,
      icon: CalendarMonthIcon,
      ActionModal: EmployeeDetailModal,
      onAction: (data) => {
        refetchList();
      },
      tooltip: "View Timesheet",
    },
    {
      key: "fullName",
      name: "Employee",
      width: 200,
      type: "person",
      frozen: true,
    },
    { key: "shiftType", name: "Shift Type", width: 100, frozen: true },
    { key: "band", name: "Band", width: 60, frozen: true },
    {
      key: "days",
      name: "Status",
      width: 420,
      cells: dayArr,
      cellWidth: 60,
      renderHeaderCell: SubHeader,
      renderCell: StatusCell,
    },
    { key: "schHrs", name: "Scheduled Hrs", width: 120, type: "number" },
    { key: "wrkHrs", name: "Working Hrs", width: 120, type: "number" },
  ];

  paycodes.forEach(({ code, npayCodeName, width }) => {
    if (setCardValueByType(code, oriPagedata) > 0)
      columns.push({
        key: code,
        name: npayCodeName,
        width: width,
        type: "number",
      });
  });

  columns.push(
    ...[
      {
        key: "paidLeaveHrs",
        name: "Paid Leave Hrs",
        width: 120,
        type: "number",
      },
      {
        key: "unpaidLeaveHrs",
        name: "UnPaid Leave Hrs",
        width: 140,
        type: "number",
      },
      {
        key: "missingPunch",
        name: "Missing Punch",
        width: 120,
        type: "number",
      },
      {
        key: "departEarlyHrs",
        name: "Depart Early",
        width: 100,
        type: "number",
      },
      { key: "arriveLateHrs", name: "Arrive Late", width: 100, type: "number" },
      {
        key: "totalViolations",
        name: "Total Violations",
        width: 120,
        type: "number",
      },
    ]
  );

  return columns;
}
