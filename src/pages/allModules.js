const modules = {
  Dashboard: () => import("./Dashboard"),
  Notifications: () => import("./Notifications"),
  WebCheckIn: () => import("./WebCheckIn/WebCheckIn"),

  Team: () => import("./Staff/team"),
  TimesheetsSubmission: () => import("./Staff/timesheetsubmission"),
  ManagerDashboard: () => import("./Staff/managerdashboard"),
  ProductivityDashboard: () => import("./Staff/productivitydashboard"),
  PayrollAudit: () => import("./Staff/payroll"),

  Rosters: () => import("./Roster/spotroster"),
  ManageTeam: () => import("./ManageTeam"),

  ManageWorkDuration: () => import("./RosterSettings/manageWorkDuration/ManageWorkDuration.js"),
  ManageWorkRotations: () => import("./RosterSettings/ManageWorkRotation"),
  ManageWorkPlans: () => import("./RosterSettings/manageWorkPlan"),
  ShiftGroup: () => import("./RosterSettings/SplitShift"),

  DemandTemplates: () => import("./RosterRules"),

  UserControl: () => import("./AcessControl/UserControl"),
  ManageUserRoles: () => import("./AcessControl/ManageAccessRole"),
  ManageProfile: () => import("./AcessControl/ManageSchedulerProfile/ManageSchedulerProfile"),

  UserPreferences: () => import("./SelfServices/UserPreferences"),
  VacationRules: () => import("./SelfServices/VacationRules"),

  EmployeeTimesheetReport: () => import("./Reports/employeetimesheet"),
  RequestStatusReport: () => import("./Reports/requeststatus"),
  RosterDetailReport: () => import("./Reports/rosterdetail"),
  TimesheetReport: () => import("./Reports/timesheet"),

  PageNotFound: () => import("./PageNotFound"),
  BulkApproval: () => import("./Dashboard/BulkApproval"),
};

const moduleSelector = (data) =>
  data.filter((el) => Object.keys(modules).some((f) => f === el.taskCode));

export { modules, moduleSelector };
