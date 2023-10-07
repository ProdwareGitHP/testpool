import { FileCopy } from "@mui/icons-material";
import Dropdown from "../../components/EvoDropDown";
import { GenderMock, getSelectIndex } from "./Utils";

const getTableColumns = (props) => {
  const {
    deleteSplitShift,
    onCopy,
    departmentList = [],
    handleChangeDepartment,
    jobTitlesList,
    handleChangeJobTitle,
    workDurationTemplate,
    handleChangeWorkDuration,
    handleChangeFTE,
    handleChangeDays,
    skillTemplate,
    handleChangeSkill,
    workLocationTemplate,
    handleChangeWorkLocation,
    handleChangeGender,
    handleChangeEmployeeType,
    employeeTypesList,
    bussinessUnitList = [],
    handleChangeBusinessUnit,
    citizenList = [],
    handleChangeCitizen,
  } = props;

  var tableColumns = [
    {
      key: "remove",
      name: "Action",
      type: "delete",
      onDeleted: deleteSplitShift,
      colSpan(args) {
        if (args.type === "HEADER") {
          return 2;
        }
        return undefined;
      },
    },
    {
      key: "action",
      name: "",
      width: 80,
      type: "action",
      icon: FileCopy,
      onAction: onCopy,
      tooltip: "Copy",
    },
    {
      key: "departmentId",
      name: "Department",
      type: "dropdown",
      width: 250,
      editorProps: {
        width: 230,
        data: departmentList,
        selectedId: "departmentId",
        caller: handleChangeDepartment,
        getoptionlabelkey: "department",
      },
    },
    {
      key: "jobTitleId",
      name: "Job Title",
      width: 230,
      editorProps: {
        width: 210,
      },
      renderCell: ({ row, column }) => {
        var jobTitlesArr =
          row.departmentId in jobTitlesList
            ? jobTitlesList[row.departmentId]
            : [];
        const selectIndex = getSelectIndex(
          jobTitlesArr,
          "jobTitleId",
          row[column.key]
        );
        const month = selectIndex >= 0 ? jobTitlesArr[selectIndex] : {};
        return (
          <Dropdown
            {...column.editorProps}
            data={jobTitlesArr}
            month={month}
            getoptionlabelkey={"jobTitle"}
            caller={(value) => {
              handleChangeJobTitle(row.index, value);
            }}
            selectIndex={selectIndex}
          />
        );
      },
    },
    {
      width: 220,
      key: "workDurationCode", // this key is shown in text field
      name: "Work Duration",
      type: "lookup",
      editorProps: {
        width: 200,
      },
      templateMethod: workDurationTemplate,
      selectItem: handleChangeWorkDuration,
    },
    {
      width: 120,
      key: "timeStart",
      name: "Time Start",
    },
    {
      width: 120,
      key: "timeend",
      name: "Time End",
    },
    {
      key: "fte",
      name: "FTE",
      width: 100,
      type: "text",
      onChange: handleChangeFTE,
    },
    {
      key: "employeeTypeId",
      name: "Employee Type",
      type: "dropdown",
      width: 220,
      editorProps: {
        width: 200,
        data: employeeTypesList,
        selectedId: "employeeTypeId",
        caller: handleChangeEmployeeType,
        getoptionlabelkey: "employeeTypes",
      },
    },
    {
      key: "days",
      name: "Days",
      width: 450,
      type: "day",
      hasLabel: false,
      onChange: handleChangeDays,
    },
    {
      width: 220,
      key: "skillName",
      name: "Skills",
      type: "lookup",

      templateMethod: skillTemplate,
      selectItem: handleChangeSkill,
    },
    {
      key: "businessId",
      name: "Bussiness Unit",
      type: "dropdown",
      width: 220,
      editorProps: {
        width: 200,
        data: bussinessUnitList,
        selectedId: "businessId",
        caller: handleChangeBusinessUnit,
        getoptionlabelkey: "business",
      },
    },
    {
      width: 220,
      key: "workLocation",
      name: "Work Location",
      type: "lookup",
      templateMethod: workLocationTemplate,
      selectItem: handleChangeWorkLocation,
    },
    {
      key: "gender",
      name: "Gender",
      type: "dropdown",
      width: 220,
      editorProps: {
        width: 200,
        data: GenderMock,
        selectedId: "gender",
        caller: handleChangeGender,
        getoptionlabelkey: "value",
      },
    },
    {
      key: "nationality",
      name: "Nationality",
      type: "dropdown",
      width: 220,
      editorProps: {
        width: 200,
        data: citizenList,
        selectedId: "legislationCode",
        caller: handleChangeCitizen,
        getoptionlabelkey: "meaning",
      },
    },
  ];
  return tableColumns;
};
export default getTableColumns;
