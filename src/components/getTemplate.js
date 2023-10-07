const templates = {
  WORKROTATION_TEMPLATE: {
    btnName: "Search & Select : Work Rotation",
    filterKey: "workRotationId",
    methodName: "useGetWorkRotation",
    columns: [
      {
        name: "Work Rotation ",
        key: "workRotationName",
        width: 150,
      },
      {
        name: "Start From",
        key: "startDate",
        type: "date",
        excludeFromSearch: true,
      },
      {
        name: "No. of iterations",
        key: "iterations",
        excludeFromSearch: true,
        width: 150,
      },
      {
        name: "Expiry Date",
        key: "expiryDate",
        type: "date",
        excludeFromSearch: true,
      },
    ],
  },
  PROFILE_TEMPLATE: {
    btnName: "Search and Select: Profile",
    methodName: "useGetDemandTemplateProfiles",
    filterKey: "profileName",
    filterId: "profileName",
    columns: [
      {
        key: "profileName",
        name: "Profile",
        width: 180,
      },
      {
        key: "owner",
        name: "Owners",
        width: 220,
      },
    ],
  },

  SCHEDULER_PROFILE_TEMPLATE: {
    btnName: "Search and Select: Profile",
    methodName: "UseScheduleProfileData",
    filterKey: "profileName",
    filterId: "profileName",
    columns: [
      {
        key: "profileName",
        name: "Profile",
        width: 180,
      },
    ],
  },
  EMPLOYEE_TEMPLATE: {
    btnName: "Search & Select : User",
    filterKey: "employeeNumber",
    methodName: "useUserDetails",
    columns: [
      {
        name: "Employee Number",
        key: "employeeNumber",
        excludeFromColumns: true,
      },
      {
        name: "Employee Name",
        key: "personName",
        excludeFromColumns: true,
      },
      {
        name: "Employee",
        key: "employeeNumber",
        type: "person",
        excludeFromSearch: true,
      },
      {
        name: "Job Title",
        key: "jobTitle",
      },
      {
        name: "Department",
        key: "departmentName",
      },
      {
        name: "Location",
        key: "workLocation",
      },
    ],
  },
  ADD_STAFF_TEMPLATE: {
    btnName: "Add Staff",
    filterKey: "employeeNumber",
    methodName: "useGetallStaffData",
    columns: [
      {
        name: "Employee Number",
        key: "employeeNumber",
        excludeFromColumns: true,
      },
      {
        name: "Employee Name",
        key: "staffName",
        excludeFromColumns: true,
      },
      {
        name: "Employee",
        key: "staffName",
        type: "person",
        // status: false,
        excludeFromSearch: true,
      },
      {
        name: "Department",
        key: "department",
        width: 200,
        // excludeFromSearch: true,
      },
      {
        name: "Job Title",
        key: "jobTitle",
        width: 200,
        excludeFromSearch: true,
      },
      {
        name: "Location",
        key: "workLocation",
        width: 200,
        excludeFromSearch: true,
      },
    ],
  },
  TIMEZONE_TEMPLATE: {
    btnName: "Search & Select : TzVisibleName",
    filterKey: "internalName",
    methodName: "useTimeZone",
    columns: [
      {
        name: "Time Zone",
        key: "userVisibleName",
        width: 300,
      },
    ],
  },
  DEMAND_TEMPLATE: {
    btnName: "Search & Select : Demand Template",
    filterKey: "demandTemplateId",
    methodName: "useGetDemandTemp",
    columns: [
      {
        name: "Template Name",
        key: "demandTemplateName",
        width: 280,
      },
      {
        name: "Valid From",
        key: "validFrom",
        type: "date",
        excludeFromSearch: true,
      },
      {
        name: "Valid To",
        key: "validTo",
        type: "date",
        excludeFromSearch: true,
      },
    ],
  },
  STAFF_TEMPLATE: {
    btnName: "Search & Select : Staff",
    filterKey: "employeeNumber",
    filterId: "employeeNumber",
    methodName: "useGetallStaffData",
    columns: [
      {
        name: "Employee Number",
        key: "employeeNumber",
        width: 170,
      },
      {
        name: "Employee Name",
        key: "staffName",
        width: 200,
      },

      {
        name: "Department",
        key: "department",
        excludeFromSearch: true,
        width: 200,
      },
      {
        name: "Job Title",
        key: "jobTitle",
        excludeFromSearch: true,
        width: 190,
      },
      {
        name: "Location",
        key: "workLocation",
        excludeFromSearch: true,
        width: 200,
      },
    ],
  },
  DEPARTMENT_TEMPLATE: {
    btnName: "Search & Select : Department",
    filterKey: "departmentId",
    filterId: "departmentId",
    methodName: "useGetDepartmentById",
    columns: [
      {
        width: 250,
        name: "Department",
        key: "departmentName",
      },
    ],
  },
  JOB_TITLE_TEMPLATE: {
    btnName: "Search & Select : Job Title",
    filterKey: "jobTitleId",
    filterId: "jobTitleId",
    methodName: "useGetJobTitle",
    columns: [
      {
        name: "Job Title Name",
        key: "jobTitle",
        width: 300,
      },
    ],
  },
  JOB_TITLE_TEMPLATE_ACCESS_CONTROL: {
    btnName: "Search & Select : Job Title",
    filterKey: "jobTitleId",
    filterId: "jobTitleId",
    methodName: "useGetScheduleJobTitle",
    columns: [
      {
        name: "Job Title Name",
        key: "jobTitle",
        width: 320,
      },
    ],
  },
  DUTY_MANAGER_TEMPLATE: {
    btnName: "Search & Select : Duty Manager",
    filterKey: "employeeNumber",
    methodName: "useGetallStaffData",
    columns: [
      {
        name: "Employee Number",
        key: "employeeNumber",
        width: 160,
      },
      {
        name: "Employee Name",
        key: "staffName",
        width: 200,
      },

      {
        name: "Department",
        key: "department",
        width: 200,
        excludeFromSearch: true,
      },
      {
        name: "Job Title",
        key: "jobTitle",
        width: 200,
        excludeFromSearch: true,
      },
      {
        name: "Location",
        key: "workLocation",
        width: 200,
        excludeFromSearch: true,
      },
    ],
  },
  EMPLOYEE_ROSTER_TEMPLATE: {
    btnName: "Employee",
    filterKey: "employeeNumber",
    methodName: "useUserDetails",
    columns: [
      {
        name: "Employee Number",
        key: "employeeNumber",
      },
      {
        name: "Employee",
        key: "personName",
      },
    ],
  },
  USER_TEMPLATE: {
    btnName: "Search & Select : User",
    filterKey: "employeeNumber",
    filterId: "employeeNumber",
    methodName: "",
    columns: [
      {
        name: "Employee Number",
        key: "employeeNumber",
        width: 150,
      },
      {
        name: "Employee",
        key: "fullName",
        width: 150,
      },
      {
        name: "Job Title",
        key: "jobTitle",
        excludeFromSearch: true,
        width: 250,
      },
      {
        name: "Department",
        key: "departmentName",
        excludeFromSearch: true,
        width: 200,
      },
    ],
    rows: [
      {
        personId: 300000028662947,
        userId: 300000028894610,
        fullName: "Alesia Walka",
        employeeNumber: "104441",
        jobTitle: "Clerk-J564",
        departmentName: "U//98:Facilities O and M Sec",
      },
      {
        personId: 300000029310600,
        userId: 300000029070551,
        fullName: "Fernanda Bresser",
        employeeNumber: "104445",
        jobTitle: "Analyst-J624",
        departmentName: "U//47:HR Payroll and Pension Administration Sec",
      },
      {
        personId: 300000029310204,
        userId: 300000029070480,
        fullName: "Tyisha Opitz",
        employeeNumber: "104444",
        jobTitle: "Division Chief-J251",
        departmentName: "D//38:Endocrinology Div",
      },
      {
        personId: 300000029269440,
        userId: 300000029070232,
        fullName: "Ulysses Kramarczyk",
        employeeNumber: "104443",
        jobTitle: "Division Chief-J251",
        departmentName: "D//38:Endocrinology Div",
      },
      {
        personId: 300000028662973,
        userId: 300000028894661,
        fullName: "Brittni Jentzen",
        employeeNumber: "104442",
        jobTitle: "Clerk-J564",
        departmentName: "U//98:Facilities O and M Sec",
      },

      {
        personId: 300000027975865,
        userId: 300000028110017,
        fullName: "Jovita Rhea",
        employeeNumber: "104440",
        jobTitle: "Associate - Admin & Support-J366",
        departmentName: "S//88:Inventory Control Sec",
      },
      {
        personId: 300000027975826,
        userId: 300000028110258,
        fullName: "Iluminada Gius",
        employeeNumber: "104439",
        jobTitle: "Associate - Admin & Support-J366",
        departmentName: "U//39:Materials Management Unit",
      },
      {
        personId: 300000027975801,
        userId: 300000028110082,
        fullName: "Eden Orloski",
        employeeNumber: "104438",
        jobTitle: "Associate - Admin & Support-J366",
        departmentName: "U//42:Contracts and Services02 Sec",
      },
      {
        personId: 300000027975776,
        userId: 300000028110285,
        fullName: "Nichelle Withers",
        employeeNumber: "104437",
        jobTitle: "Associate - Admin & Support-J366",
        departmentName: "U//42:Contracts and Services02 Sec",
      },
      {
        personId: 300000027975751,
        userId: 300000028110222,
        fullName: "Gayla Saik",
        employeeNumber: "104436",
        jobTitle: "Associate - Admin & Support-J366",
        departmentName: "U//39:Materials Management Unit",
      },
      {
        personId: 300000027975726,
        userId: 300000028110152,
        fullName: "Elouise Rohrs",
        employeeNumber: "104435",
        jobTitle: "Associate - Admin & Support-J366",
        departmentName: "U//39:Materials Management Unit",
      },
      {
        personId: 300000027975701,
        userId: 300000028110190,
        fullName: "Sylvie Flori",
        employeeNumber: "104434",
        jobTitle: "Associate - Admin & Support-J366",
        departmentName: "U//39:Materials Management Unit",
      },
      {
        personId: 300000027975676,
        userId: 300000028094972,
        fullName: "Annelle Keehner",
        employeeNumber: "104433",
        jobTitle: "Associate - Admin & Support-J366",
        departmentName: "U//42:Contracts and Services02 Sec",
      },
      {
        personId: 300000027975650,
        userId: 300000028094925,
        fullName: "Lenna Pelayo",
        employeeNumber: "104432",
        jobTitle: "Associate - Admin & Support-J366",
        departmentName: "U//42:Contracts and Services02 Sec",
      },
      {
        personId: 300000027975625,
        userId: 300000028094977,
        fullName: "Gail Glover",
        employeeNumber: "104431",
        jobTitle: "Associate - Admin & Support-J366",
        departmentName: "U//72:Customs and Logistics Unit",
      },
      {
        personId: 300000027975599,
        userId: 300000028110114,
        fullName: "Dorothy Terry",
        employeeNumber: "104430",
        jobTitle: "Associate - Admin & Support-J366",
        departmentName: "U//72:Customs and Logistics Unit",
      },
      {
        personId: 300000027975573,
        userId: 300000028110049,
        fullName: "Loren Cisney",
        employeeNumber: "104429",
        jobTitle: "Associate - Admin & Support-J366",
        departmentName: "U//39:Materials Management Unit",
      },
      {
        personId: 300000023523345,
        userId: 300000023581662,
        fullName: "Gilma Saine",
        employeeNumber: "104428",
        jobTitle: "N/A",
        departmentName: "DN//:",
      },
    ],
  },
  ROSTER_SINGLE_EMPLOYEE_TEMPLATE: {
    btnName: "Search & Select : Copy Shift",
    filterKey: "personId",
    filterId: "personId",
    methodName: "",
    columns: [
      {
        name: "Employee Number",
        key: "employeeNumber",
        width: 150,
      },
      {
        name: "Employee Name",
        key: "fullName",
        width: 150,
      },
       ],
  },
  WORK_DURATION_TEMPLATE: {
    btnName: "Search & Select : Work Duration",
    filterKey: "workDurationId",
    filterId: "workDurationId",
    methodName: "useGetWorkDuration",
    columns: [
      {
        key: "workDurationCode",
        name: "Work Duration",
        width: 150,
      },
      {
        name: "Time",
        key: "time",
        width: 170,
      },
    ],
  },
  MANAGE_WORK_DURATION_DEPARMENT_TEMPLATE: {
    btnName: "Search & Select : Department",
    filterKey: "departmentId",
    filterId: "departmentId",
    methodName: "useAllDepartmentData",
    columns: [
      {
        name: "Department Name",
        key: "departmentName",
        width: "100%",
      },
    ],
  },
  SKILL_TEMPLATE: {
    btnName: "Search & Select : Skills",
    filterKey: "skill",
    filterId: "skill",
    methodName: "useGetSkill",
    columns: [
      {
        key: "skillName",
        name: "Skills",
        width: 300,
      },
    ],
  },
  WORK_LOCATION_TEMPLATE: {
    btnName: "Search & Select : Work Location",
    filterKey: "workLocationId",
    filterId: "workLocationId",
    methodName: "useGetWorkLocationList",
    columns: [
      {
        key: "workLocation",
        name: "Work Location",
        width: 300,
      },
    ],
  },
  DEPARTMENT: {
    btnName: "Search & Select : Department",
    filterKey: "departmentId",
    filterId: "departmentId",
    methodName: "useDepartmentData",
    columns: [
      {
        key: "departmentCode",
        name: "Department Code",
        width: 335,
      },
      {
        key: "departmentName",
        name: "Department Name",
        width: 335,
      },
    ],
  },
  EMPLOYEE_CATEGORY: {
    btnName: "Search & Select : Employee Category",
    filterKey: "employeeCategory",
    filterId: "employeeCategory",
    methodName: "useEmployeeCategoryData",
    columns: [
      {
        key: "meaning",
        name: "Employee Category",
        width: 335,
      },
    ],
  },
  SUB_DEPARTMENT: {
    btnName: "Search & Select : Sub Department",
    filterKey: "subDepartmentName",
    filterId: "subDepartmentName",
    methodName: "useSubDepartmentData",
    columns: [
      {
        key: "subDepartmentName",
        name: "Sub Department Name",
        width: 335,
      },
    ],
  },
  RELIGION: {
    btnName: "Search & Select : Religion",
    filterKey: "lookUpCode",
    filterId: "lookUpCode",
    methodName: "useGetReligionData",
    columns: [
      {
        key: "meaning",
        name: "Religion",
        width: 335,
      },
    ],
  },
  NATIONALITY: {
    btnName: "Search & Select : Nationality",
    filterKey: "legislationCode",
    filterId: "legislationCode",
    // methodName: "",
    methodName: "useGetcitizenData",
    columns: [
      {
        key: "meaning",
        name: "Nationality",
        width: 335,
      },
    ],
  },
  WORK_PLAN: {
    btnName: "Search & Select : Work Plan",
    filterKey: "workPlanId",
    filterId: "workPlanId",
    methodName: "useGetAllWorkPlan",
    columns: [
      {
        key: "workPlanName",
        name: "Work Plan",
        width: 150,
      },
      {
        name: "Sun",
        key: "workDurationNameD1",
        excludeFromSearch: true,
        width: 100,
      },
      {
        name: "Mon",
        key: "workDurationNameD2",
        excludeFromSearch: true,
        width: 100,
      },
      {
        name: "Tue",
        key: "workDurationNameD3",
        excludeFromSearch: true,
        width: 100,
      },
      {
        name: "Wed",
        key: "workDurationNameD4",
        excludeFromSearch: true,
        width: 100,
      },
      {
        name: "Thu",
        key: "workDurationNameD5",
        excludeFromSearch: true,
        width: 100,
      },
      {
        name: "Fri",
        key: "workDurationNameD6",
        excludeFromSearch: true,
        width: 100,
      },
      {
        name: "Sat",
        key: "workDurationNameD7",
        excludeFromSearch: true,
        width: 100,
      },
    ],
  },
  EMPLOYEE_FILTER_ROSTER_MODULE: {
    btnName: "Employee",
    filterKey: "personId",
    filterId: "personId",
    columns: [
      {
        name: "Employee Number",
        key: "employeeNumber",
        width: 300,
      },
      {
        name: "Employee",
        key: "fullName",
        width: 300,
      },
    ],
  },
  DEPARTMENT_FILTER_ROSTER_MODULE: {
    btnName: "Department",
    filterId: "departmentId",
    filterKey: "departmentId",
    columns: [
      {
        name: "Department",
        key: "department",
        width: 300,
      },
    ],
  },
  JOB_TITLE_FILTER_ROSTER_MODULE: {
    btnName: "Job Title",
    filterKey: "jobTitleId",
    filterId: "jobTitleId",
    columns: [
      {
        name: "Job Title",
        key: "jobTitle",
        width: 200,
      },
    ],
  },
  WORKLOCATION_FILTER_ROSTER_MODULE: {
    btnName: "Work Location",
    filterKey: "workLocationId",
    filterId: "workLocationId",
    methodName: "useGetWorkLocationList",
    columns: [
      {
        key: "locationName",
        name: "Work Location",
        width: 300,
      },
    ],
  },
  BUSINESS_UNIT_FILTER_ROSTER_MODULE: {
    btnName: "Business Unit",
    filterKey: "businessUnitId",
    filterId: "businessUnitId",
    methodName: "useBussinessUnitData",
    columns: [
      {
        key: "businessUnitName",
        name: "Business Unit",
        width: 300,
      },
    ],
  },
  LEGAL_ENTITY_FILTER_ROSTER_MODULE: {
    btnName: "Legal Entity",
    filterKey: "legalEntityId",
    filterId: "legalEntityId",
    methodName: "useLegalEntityData",
    columns: [
      {
        key: "name",
        name: "Legal Entity",
        width: 300,
      },
    ],
  },
  DUTY_MANAGER_FILTER_ROSTER_MODULE: {
    btnName: "Duty Manager",
    filterKey: "managerId",
    filterId: "managerId",
    columns: [
      {
        key: "managerName",
        name: "Duty Manager",
        width: 300,
      },
    ],
    rows: [],
  },
};

const getTemplate = (templateName, params, select, disable, btnName, rows) => {
  var res = null;
  if (templateName in templates) {
    res = { ...templates[templateName] };
    if (btnName) {
      res.btnName = btnName;
    }
    res.params = params;
    res.select = select;
    res.disable = disable;
    res.rows = rows;
  }
  return res;
};
export default getTemplate;
