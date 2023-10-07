import CustomCheckBox from "../../../components/CustomCheckBox";
import { EvoHBox } from "../../../components/EvoBox";
import getTemplate from "../../../components/getTemplate";
import {
  EmployeeTypeMockData,
  GenderMock,
  includeMock,
  shiftMock,
  userRoleMock,
} from "../../RosterRules/Utils";

export const generateColumnsProfileCriteria = ({
  onChangeProfileCriteria,
  employeeTemplate,
  handleChangeEmployee,
  handleChangeJobTitle,
  handleChangeCategory,
  handleChangeNationality,
  handleChangeSubDepartment,
  deleteProfileCriteria,
  combinedRes,
  handleChangeHeirarchyLevel,
  handleChangeDepartment,
  onSelectDropdown = () => {},
}) => {
  return [
    {
      key: "fullName",
      name: "Employee",
      type: "lookup",
      width: 195,
      templateMethod: employeeTemplate,
      selectItem: handleChangeEmployee,
      readOnlyValue: (row) => row.departmentId,
    },

    {
      key: "jobTitle",
      name: "Job",
      type: "lookup",
      width: 250,
      editorProps: {
        width: 230,
      },
      templateMethod: () => getTemplate("JOB_TITLE_TEMPLATE_ACCESS_CONTROL"),
      selectItem: handleChangeJobTitle,
    },
    {
      key: "jobFamily",
      name: "Job Family",
      type: "dropdown",
      width: 250,
      editorProps: {
        width: 240,
        selectedId: "jobFamily",
        getoptionlabelkey: "jobFamily",
        data: combinedRes.jobFamily || [],
        caller: onSelectDropdown,
      },
    },
    {
      key: "meaning",
      name: "Employee Category",
      type: "lookup",
      width: 195,
      templateMethod: () => getTemplate("EMPLOYEE_CATEGORY"),
      selectItem: handleChangeCategory,
    },
    {
      key: "departmentName",
      name: "Department",
      type: "lookup",
      width: 250,
      editorProps: {
        width: 230,
      },
      readOnlyValue: (row) => row.fullName,
      templateMethod: () =>
        getTemplate(
          "DEPARTMENT",
          {
            pageNo: 1,
            pageSize: "1000",
            sortBy: "",
            asc: "",
          },
          (a) => a.items
        ),
      selectItem: handleChangeDepartment,
    },
    {
      key: "subDepartmentName",
      name: "Sub Department",
      type: "lookup",
      width: 195,
      templateMethod: () => getTemplate("SUB_DEPARTMENT"),
      selectItem: handleChangeSubDepartment,
    },
    {
      key: "businessUnit",
      name: "Business Unit",
      type: "dropdown",
      width: 195,
      editorProps: {
        width: 180,
        selectedId: "businessUnitName",
        getoptionlabelkey: "businessUnitName",
        data: combinedRes.businessUnit || [],
        caller: onSelectDropdown,
      },
    },
    {
      key: "legalEntityName",
      name: "Legal Entity",
      type: "dropdown",
      width: 195,
      editorProps: {
        width: 180,
        selectedId: "legalEntityName",
        getoptionlabelkey: "name",
        data: combinedRes.legalEntity || [],
        caller: (a, b, c) => {
          onSelectDropdown(a, {
            legalEntityId: b.legalEntityId,
            legalEntityName: b.name,
          });
        },
      },
    },
    {
      key: "payroll",
      name: "Payroll",
      type: "dropdown",
      width: 195,
      editorProps: {
        width: 180,
        selectedId: "payrollId",
        getoptionlabelkey: "payrollName",
        data: combinedRes.payroll || [],
        caller: onSelectDropdown,
      },
    },
    {
      key: "shiftType",
      name: "Shift Type",
      type: "dropdown",
      width: 195,
      editorProps: {
        width: 180,
        selectedId: "shiftType",
        getoptionlabelkey: "shiftType",
        data: shiftMock,
        caller: onSelectDropdown,
      },
    },
    {
      key: "employeeType",
      name: "Employee Type",
      type: "dropdown",
      width: 195,
      editorProps: {
        width: 180,
        selectedId: "employeeType",
        getoptionlabelkey: "value",
        data: EmployeeTypeMockData,
        caller: (a, b) => {
          onSelectDropdown(a, {
            employeeTypeId: b.id,
            employeeType: b.value,
          });
        },
      },
    },
    {
      key: "gender",
      name: "Gender",
      type: "dropdown",
      width: 195,
      editorProps: {
        width: 180,
        selectedId: "gender",
        getoptionlabelkey: "value",
        data: GenderMock,
        caller: (a, b) => {
          onSelectDropdown(a, { gender: b.gender });
        },
      },
    },
    {
      key: "meaning",
      name: "Religion",
      type: "lookup",
      width: 195,
      templateMethod: () => getTemplate("RELIGION"),
      selectItem: (a, b) => {
        onChangeProfileCriteria(
          { ...a, religion: a.lookUpCode },
          b,
          "meaning",
          "RELIGION"
        );
      },
    },
    {
      key: "nationName",
      name: "Nationality",
      type: "lookup",
      width: 195,
      templateMethod: () => getTemplate("NATIONALITY"),
      // selectItem: (a, b) => {
      //   onChangeProfileCriteria(
      //     { ...a, nationality: a.legislationCode },
      //     b,
      //     "nationality",
      //     "NATIONALITY"
      //   );
      // },
      selectItem: handleChangeNationality,
    },
    {
      key: "includeExcludeFag",
      name: "Include/Exclude",
      type: "dropdown",
      width: 195,
      editorProps: {
        width: 180,
        selectedId: "value",
        getoptionlabelkey: "value",
        data: includeMock,
        caller: (a, b) => {
          onSelectDropdown(a, { includeExcludeFag: b.value });
        },
      },
    },
    {
      key: "hierarchyLevel",
      name: "Hierarchy Level",
      type: "text",
      width: 195,
      textAlign: "right",
      editorProps: {
        width: 180,
        type: "number",
      },

      onChange: handleChangeHeirarchyLevel,
    },
    {
      key: "Action",
      name: "Action",
      type: "delete",
      onDeleted: (i) => deleteProfileCriteria(i),
    },
  ];
};

export const generateProfileCriteriaRow = () => {
  return {
    fullName: "",
    job: "",
    jobFamily: "",
    employeeCategory: "",
    department: "",
    subDepartment: "",
    businessUnit: "",
    legalEntity: "",
    payroll: "",
    shiftType: "",
    employeeType: "",
    gender: "",
    religion: "",
    nationality: "",
    includeExcludeFag: "Include",
    hierarchyLevel: 0,
  };
};

export const generateAddUserRow = () => {
  return { user: "", userType: "", readOnly: "Y", canCreate: "N" };
};

export const generateColumnsAddUser = (
  onChangeAddUserCol,
  onSelectDropdown,
  handleChangeCheck,
  onDeleteAddUser
) => {
  return [
    {
      key: "fullName",
      name: "User",
      type: "lookup",
      width: 200,
      templateMethod: () => getTemplate("USER_TEMPLATE"),
      selectItem: onChangeAddUserCol,
    },
    {
      key: "userType",
      name: "User Role",
      type: "dropdown",
      width: 150,
      editorProps: {
        width: 130,
        data: userRoleMock,
        caller: onSelectDropdown,
        getoptionlabelkey: "userType",
        selectedId: "userType",
      },
    },
    {
      key: "readOnly",
      name: "Read Only",
      type: "icon",
      width: 150,
      renderCell: ({ row, column }) => (
        <EvoHBox justifyContent="center">
          <CustomCheckBox
            check={row[column.key] === "Y" ? true : false}
            disabled
            onChangeCheck={(e) =>
              handleChangeCheck(
                row.index,
                "readOnly",
                e.target.checked ? "Y" : "C"
              )
            }
          />
        </EvoHBox>
      ),
    },
    {
      key: "canCreate",
      name: "Create/Edit/Delete",
      width: 150,
      type: "icon",
      renderCell: ({ row, column }) => (
        <EvoHBox justifyContent="center">
          <CustomCheckBox
            check={row[column.key] === "Y"}
            onChangeCheck={(e) => {
              handleChangeCheck(row.index, "canCreate", e ? "Y" : "C");
            }}
          />
        </EvoHBox>
      ),
    },
    {
      key: "hierarchy",
      name: "Action",
      type: "delete",
      onDeleted: onDeleteAddUser,
    },
  ];
};

export const generateSnakeBarProps = {
  VALID_PROFILE: {
    msz: "Profile is required.",
    type: "error",
  },
  VALID_START_DATE: {
    msz: "Start Date are required.",
    type: "error",
  },
  VALID_END_DATE: {
    msz: "Start Date are required.",
    type: "error",
  },
  VALID_DATE: {
    msz: "End Date should be after Start Date.",
    type: "error",
  },
};

export const generateApiError = (error) => {
  const message = error?.message || "Something went wrong!";
  return {
    msz: message,
    type: "error",
  };
};

export const generateUserRolePayload = (data) => {
  return data.map((dat) => {
    const obj = {
      userId: dat.userId,
      canCreate: dat.canCreate,
      userType: dat.userType,
      fullName: dat.fullName,
    };
    if (dat?.userProfileAssocId) {
      obj.userProfileAssocId = dat.userProfileAssocId;
    }
    if (dat?.profileId) {
      obj.profileId = dat.profileId;
    }
    return obj;
  });
};

export const generateProfileCriteriaPayload = (data) => {
  return data.map((dat) => {
    return {
      personId: dat.FULL_NAME?.personId || "",
      fullName: dat.fullName,
      jobId: dat.JOB_TITLE?.jobTitleId || null,
      departmentId: dat.DEPARTMENT_CODE?.departmentId || null,
      employeeTypeId: dat.employeeTypeId,
      positionId: null, // need to check
      includeExcludeFag: dat.includeExcludeFag,
      businessUnitId: dat.businessUnitId,
      payrollId: dat.payrollId,
      hierarchyLevel: dat.hierarchyLevel, // need to check
      jobFamily: dat.jobFamily,
      legalEntityId: dat.legalEntityId,
      gender: dat.gender,
      nationality: dat.nationality,
      religion: dat.religion,
      subDepartmentId: dat.SUB_DEPARTMENT?.subDepartmentId || null,
      employeeCatogery: dat.employeeCategory, // needs to change the key in backend
      shiftType: dat.shiftType,
    };
  });
};

export const generateEditedProfileCriteria = (data) => {
  return data.map((dat, i) => {
    return {
      index: i,
      fullName: dat.fullName,
      job: dat.jobTitle,
      jobFamily: dat.jobFamily,
      employeeCategory: dat.employeeCatogery,
      department: dat.departmentName,
      departmentId: dat.departmentId,
      subDepartment: dat.subDepartmentName,
      businessUnit: dat.businessUnit,
      legalEntity: dat.legalEntity,
      payroll: dat.payroll,
      shiftType: dat.shiftType,
      employeeType: dat.employeeType,
      gender: dat.gender,
      religion: dat.religion,
      nationality: dat.nationality,
      includeExcludeFag: dat.includeExcludeFag,
      hierarchyLevel: dat.hierarchyLevel,

      FULL_NAME: {
        personId: dat.datpersonId,
        userId: null,
        fullName: "",
        employeeNumber: "",
        jobTitle: "",
        departmentName: "",
      },
      jobTitle: "",
      JOB_TITLE: {
        jobTitleId: "",
        jobTitle: "",
      },
      EMPLOYEE_CATEGORY: {
        employeeCategory: "",
        meaning: "",
      },
      departmentCode: "",
      DEPARTMENT_CODE: {
        departmentId: null,
        departmentName: "",
        departmentCode: "",
      },
      subDepartmentName: "",
      SUB_DEPARTMENT: {
        subDepartmentId: "",
        subDepartmentName: "",
      },
      businessUnitName: "",
      businessUnitId: "",
      legalEntityId: "",
      legalEntityName: "",
      payrollId: "",
      payrollName: "",
      employeeTypeId: null,
      RELIGION: {
        meaning: "",
        lookUpCode: "",
        religion: "",
      },
      NATIONALITY: {
        legislationCode: "",
        meaning: "",
        nationality: "",
      },
      includeExcludeFag: "Include",
    };
  });
};

export const generateEditedUserRows = (data) => {
  return data.map((dat, i) => {
    return {
      ...dat,
      index: i,
      // canCreateOrEdit: dat.canCreate,
      readOnly: "Y",
    };
  });
};
