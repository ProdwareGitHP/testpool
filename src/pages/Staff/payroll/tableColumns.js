import HistoryIcon from "@mui/icons-material/History";
import HistoryPopUp from "./HistoryPopUp";
import ViewPopUp from "./ViewPopUp";
import SubHeader from "../../../components/EvoDataGrid/SubHeader";
import HoursCell from "./HoursCell";

export default function getTableColumns(payrollData) {
  return [
    {
      key: "fullName",
      name: "Employee",
      type: "person",
    },
    {
      key: "departmentName",
      name: "Department",
      width: 200,
    },
    {
      key: "locationName",
      name: "Location",
      width: 180,
    },
    {
      key: "legalEntity",
      name: "Legal Entity",
      width: 180,
    },
    {
      key: "businessUnitName",
      name: "Business Unit",
      width: 120,
    },
    {
      key: "oldHours",
      name: "Old Hours",
      cells: payrollData?.hours ? Object.keys(payrollData?.hours) : [],
      cellWidth: 90,
      renderHeaderCell: SubHeader,
      renderCell: HoursCell,
      width: 300,
    },
    {
      key: "newHours",
      name: "New Hours",
      cells: payrollData?.hours ? Object.keys(payrollData?.hours) : [],
      cellWidth: 90,
      renderHeaderCell: SubHeader,
      renderCell: HoursCell,
      width: 300,
    },
    {
      key: "status",
      name: "Status",
      width: 100,
    },
    {
      key: "shiftType",
      name: "Shift Type",
      width: 90,
    },
    {
      key: "band",
      name: "Band",
      width: 80,
    },
    {
      key: "view",
      name: "View",
      type: "editor",
      Editor: ViewPopUp,
      onUpdated: () => {},
      tooltip: "View Payroll Audit",
    },
    {
      key: "history",
      name: "History",
      type: "action",
      width: 70,
      icon: HistoryIcon,
      ActionModal: HistoryPopUp,
      tooltip: "View History",
    },
  ];
}
