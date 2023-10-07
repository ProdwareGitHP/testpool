import { apiConstant } from "./apiConstants";
import { Get, Post, Put, Delete, useGet, useGet2 } from "./service";

export const loginUser = (params) => {
  return Post(apiConstant.login, params, false);
};
export const projectList = (params) => {
  return Post(apiConstant.projectList, params, false);
};

export const productivityData = (params) => {
  return Post(apiConstant.productivityData, params, false);
};

export const getUserQRCode = (params) => {
  return {
    data: {
      tenantName: "Test",
      xtenantId: "1004",
    },
  };
  //return Post(apiConstant.getUserQRCode, params, false);
};

export const dashboardList = (params) => {
  return Post(apiConstant.dashboardList, params, false);
};
export const getDetailById = (params) => {
  return Get(apiConstant.timehseetById, params, false);
};
export const payrollTtimehseetById = (params) => {
  return Get(apiConstant.payrollTtimehseetById, params, false);
};
export const savePersonTimesheet = (params) => {
  return Post(apiConstant.savePersonTimesheet, params, false);
};
export const saveRosterProfile = (params) => {
  return Post(apiConstant.saveRosterProfile, params);
};

export const deletePersonTimesheet = (params) => {
  return Delete(apiConstant.deletePersonTimesheet, params, false);
};
export const getAllProject = (params) => {
  return Get(apiConstant.getAllProject, params, false);
};
export const getAllTask = (params) => {
  return Get(apiConstant.getAllTask, params, false);
};
export const getAllExpenditure = (params) => {
  return Get(apiConstant.getAllExpenditure, params, false);
};

export const getTeamList = (params) => {
  return Post(apiConstant.getTeamList, params, false);
};

export const getRequestList = (params) => {
  return Get(`${apiConstant.getRequestList}`, params, false);
};

export const getRequestTypeList = (params) => {
  return Get(`${apiConstant.getRequestTypeList}`, params, false);
};

export const getResionList = (params) => {
  return Get(apiConstant.getResionList, params, false);
};

export const createRequestData = (params) => {
  return Post(apiConstant.createRequestData, params, false);
};

export const submitPersonTimesheet = (params) => {
  return Post(apiConstant.submitPersonTimesheet, params, false);
};

export const getSourceRoaster = (params) => {
  return Get(apiConstant.getSourceRoaster, params, false);
};

export const getDestinationRoster = (params) => {
  return Get(apiConstant.getDestinationRoster, params, false);
};

export const getRequestDetails = (params) => {
  return Get(apiConstant.getRequestDetails, params, false);
};

export const approveHistoryDetails = (params) => {
  return Get(apiConstant.approveHistoryDetails, params, false);
};

export const getDepartments = (params) => {
  return Get(apiConstant.getDepartments, params, false);
};

// export const getPayCodes = (params) => {
//   return Get(apiConstant.getPayCodes, params, false);
// };

// export const getJobs = (params) => {
//   return Get(apiConstant.getJobs, params, false);
// };

export const getallroasterdata = (params) => {
  return Get(
    apiConstant.getallRoasterProfileData + "/" + params.userId,
    params,
    false
  );
};

export const getallemployeedata = (params) => {
  return Post(
    apiConstant.getallRoasterEmpDetailTableData,

    params,
    false
  );
};

export const workDuration = (params) => {
  return Get(apiConstant.getWorkDurationData, params, false);
};

export const getallStaffData = (params) => {
  return Post(apiConstant.getAddStaffData, params, false);
};

export const workLocation = (params) => {
  return Get(apiConstant.getWorkLocationList, params, false);
};
export const onCall = (params) => {
  return Get(apiConstant.getOnCallLovList, params, false);
};
export const Emergency = (params) => {
  return Get(apiConstant.getEmergencyList, params, false);
};
export const Option1 = (params) => {
  return Post(apiConstant.postOption, params, false);
};
export const Option2 = (params) => {
  return Post(apiConstant.postOption2, params, false);
};
export const Department = (params) => {
  return Get(apiConstant.getDepartMentList, params, false);
};
export const GetAllTimesheetMaster = (params) => {
  return Get(apiConstant.allTimesheetMaster, params, false);
};
export const JobTitle = (params) => {
  return Get(apiConstant.getJobTitleList, params, false);
};
export const DutyManager = (params) => {
  return Get(apiConstant.getDutyManagerList, params, false);
};
export const DeleteRosterProfile = (params) => {
  return Delete(apiConstant.DeleteRoster, params, false);
};
export const GetSingleShift = (params) => {
  return Get(
    apiConstant.getUpdateSingleShift +
      "/" +
      params.loginUserId +
      "/" +
      params.personRosterPivoteId +
      "/" +
      params.personRosterId,

    {},
    false
  );
};

export const WorkDurationSummaryData = (params) => {
  return Get(apiConstant.getSummaryData, params, false);
};
export const WorkDurationCategory = (params) => {
  return Get(apiConstant.getWorkDurationCategory, params, false);
};
export const BussinessUnitData = (params) => {
  return Get(apiConstant.getBussinessUnitData, params, false);
};
export const LegalEntityData = (params) => {
  return Get(apiConstant.getLegalEntityData, params, false);
};
export const DepartmentLovData = (params) => {
  return Get(apiConstant.getDepartmentLov, params, false);
};

export const GetWorkDurationDetail = (params) => useGet(`${apiConstant.getDetailData}/${params?.id}`);

export const DeleteWorkDurationApi = (params) => {
  return Delete(
    apiConstant.DeleteWorkDurationData + "/" + params.workDurationId,
    null,
    false
  );
};

export const CreateWorkDuration = (params) => {
  return Post(apiConstant.createWorkDuration, params, false);
};

export const UpdateWorkDuration = (params) => {
  return Put(`${apiConstant.updateWorkDuration}?workDurationId=${params?.id}`, params, false);
};
export const GetWorkDurationCriteriaDetail = (params) => useGet(`${apiConstant.getCriteriaDetail}/${params?.id}`);

export const GetDemandTemplate = (params) => {
  return Get(apiConstant.getDemandTemplats, params, false);
};

export const GetDemandId = (params) => {
  return Get(
    apiConstant.getDemandId + "/" + params.demandId,

    params,
    false
  );
};

export const getEmployeeSuggestions = (params) => {
  return Post(apiConstant.getEmployeeSuggestions, params, false);
};

export const CreateEmployeeSuggestions = (params) => {
  return Post(apiConstant.createEmployeeSuggestions, params, false);
};

export const GenerateRotaShifts = (params) => {
  return Post(apiConstant.generateRotaShifts, params, false);
};

export const CreateFlexRota = (params) => {
  return Post(apiConstant.createFlexRota, params, false);
};

export const GetWorkRotation = (params) => {
  return Get(
    apiConstant.getworkRotation + "/" + params.userId,

    false
  );
};

export const GetWorkRotationDet = (params) => {
  return Get(
    apiConstant.getWorkRotationDet + "/" + params.workRotationId,

    false
  );
};
export const getWorkPlan = (params) => {
  return Get(apiConstant.getWorkPlanDetail, params, false);
};
export const getDemandbyTempID = (params) => {
  return Get(apiConstant.getDemandTempDetail, params, false);
};
export const createWorkPlan = (params) => {
  return Post(apiConstant.postWorkPlan, params, false);
};
export const updateWorkPlan = (params) => {
  return Post(apiConstant.updateWorkPlan, params, false);
};
export const deleteworkPlan = (id, params) => {
  return Delete(`${apiConstant.deleteWorkPlanDetail}/${id}`, params);
};
export const getWorkRotataion = (params) => {
  return Get(apiConstant.getWorkRotationData, params, false);
};

export const getWorkRotataionById = (params) => {
  return Get(
    apiConstant.getWorkRotationDataById + "/" + params.workRotationId,

    params
  );
};
export const createWorkRotation = (params) => {
  return Post(apiConstant.createWorkRotationData, params, false);
};
export const updateWorkRotation = (params) => {
  return Post(apiConstant.updateWorkRotationData, params, false);
};
export const useExpiryDate = (params, select, disable) => {
  return Post(apiConstant.expiryDateDate, params, select, disable);
};
export const deleteworkRotation = (id, params) => {
  return Delete(`${apiConstant.deleteWorkRotationData}/${id}`, params);
};
export const getSplitSelectShift = (params) => {
  return Get(apiConstant.getSplitShiftSelectData, params, false);
};

export const GetSplitShiftData = (id, params) => {
  return Get(`${apiConstant.getSplitSelectData}/${id}`, params);
};
export const CreateSplitShift = (params) => {
  return Post(apiConstant.createSplitShiftData, params, false);
};
export const UpdateSplitShift = (params) => {
  return Post(apiConstant.UpdateSplitShiftData, params, false);
};
export const deleteSplitShiftApi = (id, params) => {
  return Delete(`${apiConstant.deleteSplitShiftData}/${id}`, params);
};

export const getSplitShiftById = (params) => {
  return Get(
    apiConstant.getSplitShiftTableDatabyId + "/" + params.spliShiftId,

    params
  );
};
export const getManageTeamData = (params) => {
  return Get(apiConstant.getManageTeamTableData, params, false);
};

export const getValueFromListData = (params) => {
  return Get(
    apiConstant.getMangeTeamOpenFromValueList,

    params,
    false
  );
};
export const createManageTeam = (params) => {
  return Post(apiConstant.createTeam, params, false);
};
export const updateManageTeam = (params) => {
  return Post(apiConstant.updateTeam, params, false);
};
export const getTeamTableData = (params) => {
  return Get(
    apiConstant.manageTeamMemberTableData + "/" + params.userId,

    params,
    false
  );
};
export const createManageTeamMember = (params) => {
  return Post(apiConstant.createTeamMember, params, false);
};
export const deleteTeamById = (id, params) => {
  return Delete(`${apiConstant.deleteTeam}/${id}`, params);
};
export const PersonRosterDataWithDate = (params) => {
  return Delete(apiConstant.personRosterDataWithDate, params, false);
};
export const getDemandTemp = (params) => {
  return Get(
    apiConstant.getDemandTempData + "/" + params.userId,
    params,
    false
  );
};
export const getDemandTemplateById = (params) => {
  return Get(
    apiConstant.getDemandTempDataById + "/" + params.id,

    params,
    false
  );
};
export const getCitizen = (params) => {
  return Get(apiConstant.getCitizenShipData, params, false);
};
export const getSkill = (params) => {
  return Get(apiConstant.getSkillData, params, false);
};
export const createDemandTemplate = (params) => {
  return Post(apiConstant.createDemandTempData, params, false);
};
export const updateDemandTemplate = (params) => {
  return Post(apiConstant.updateDemandTempData, params, false);
};
export const getProfileById = (params) => {
  return Get(
    apiConstant.getallProfileData + "/" + params.userId,

    params,
    false
  );
};
export const getDepartmentById = (params) => {
  return Get(
    apiConstant.getDepartMentData +
      "/" +
      params.userId +
      "/ " +
      params.profileId,

    params,
    false
  );
};
export const getJobTitleById = (params) => {
  return Get(apiConstant.getJobTitleData + "/" + params.departmentId).then(
    (res) => res.data?.data
  );
};

export const getJobTitleByProfileId = (params) => {
  // window.alert(
  //   "/" + params.userId + "/ " + params.name + "/" + params.departmentId
  // );
  var addUrl = "/" + params.userId + "/" + params.name + "/" + params.profileId;
  return Get(apiConstant.getJobTitleData + addUrl, params, false);
};

export const getWorkLocationById = (params) => {
  return Get(
    apiConstant.getWorkLocationData +
      "/" +
      params.userId +
      "/ " +
      params.profileId,

    params,
    false
  );
};

export const ValidateRoster = (params) => {
  return Post(apiConstant.validateRoster, params, false);
};

export const GetChartData = (status, params) => {
  return Get(`${apiConstant.getChartdata}/${status}/view/data`, params);
};

export const GetEmployeeDetail = (params) => {
  return Get(
    apiConstant.getEmployeeDetail + "/" + params.personId,

    false
  );
};

export const timeZone = (params) => {
  return Get(apiConstant.getTimeZoneData, params, false);
};

export const saveReminder = (params) => {
  return Post(apiConstant.saveReminderData, params, false);
};
export const payrollAudit = (params) => {
  return Post(apiConstant.payrollAudit, params, false);
};

export const submitPayrollAudit = (params) => {
  return Post(apiConstant.submitPayrollAudit, params, false);
};

export const submitReadyForPayroll = (params) => {
  return Post(apiConstant.submitReadyForPayroll, params, false);
};

export const exportData = (params) => {
  return Post(apiConstant.exportData, params, false);
};

export const history = (params) => {
  return Post(apiConstant.history, params, false);
};

export const getLineData = (params) => {
  return Get(apiConstant.lineData, params, false);
};

export const saveViewData = (params) => {
  return Post(apiConstant.viewSave, params, false);
};

export const createRule = (params) => {
  return Post(apiConstant.createVactionRule, params, false);
};
export const updateRule = (params) => {
  return Post(apiConstant.updateVacationRule, params, false);
};
export const taskData = (params) => {
  return Get(apiConstant.taskData, params, false);
};
export const EmployeeVacatioRuleData = (params) => {
  return Get(apiConstant.userData, params, false);
};
export const getUserDetails = (params) => {
  return Request(apiConstant.getUserData, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getUserData = (params) => {
  return Post(apiConstant.userDataPage, params, false);
};
export const SearchEmployeeData = (params) => {
  return Get(apiConstant.searchUser, params, false);
};
export const VacatioRuleData = (params) => {
  return Get(apiConstant.vacationRule, params, false);
};
export const AddAccessModal = (params) => {
  return Get(apiConstant.searchUser, params, false);
};

export const manageAccessRoleGetData = (params) => {
  return Get(apiConstant.manageAccessRoleGet, params, false);
};
export const getTaskGroup = (params) => {
  return Get(
    apiConstant.taskGroupGet + "/" + params.id,

    params,
    false
  );
};

export const getTaskGroupDetails = (params) => {
  return Get(apiConstant.taskDetails, params, false);
};

export const userList = (params) => {
  return Get(apiConstant.userList + "/" + params.id, {}, false);
};

export const saveUserRole = (params) => {
  return Post(apiConstant.saveUserRole, params, false);
};

export const updateUserRole = (params) => {
  return Post(apiConstant.updateUserRole, params, false);
};
export const deleteRole = (params) => {
  return Delete(
    apiConstant.deleteRole + "/" + params.id,

    params,
    false
  );
};
// Manage User
export const getScheduleProfileData = (params) => {
  return Get(apiConstant.getScheduleProfileData, params, false);
};
export const getScheduleEmpData = (params) => {
  return Get(
    apiConstant.getScheduleEmpData + "/" + params.profileId,

    params,
    false
  );
};
export const getScheduleUserData = (params) => {
  return Get(
    apiConstant.getScheduleUserData + "/" + params.profileId,

    params,
    false
  );
};
export const getProfileCriteria = (params) => {
  return Get(apiConstant.getProfileCriteria, params, false);
};

export const getProfileCriteriaById = (params, id) => {
  return Get(
    apiConstant.getProfileCriteriaById + "/" + params.id,

    params,
    false
  );
};

export const getTaskByUserId = (params, id) => {
  return Get(
    apiConstant.getUserControlTask + "/" + params.id,

    params,
    false
  );
};
export const getScheduleJobTitle = (params) => {
  return Get(apiConstant.getScheduleJobTitle, params, false);
};
export const getScheduleJobFamily = (params) => {
  return Get(apiConstant.getScheduleJobFamily, params, false);
};

export const getEmployeeCategoryData = (params) => {
  return Get(apiConstant.getEmployeeCatogery, params, false);
};
// export const getDepartmentData = (params) => {
//   return Get(apiConstant.getDepartmentDetail, params, false);
// };

export const getSubDepartmentData = (params) => {
  return Get(apiConstant.getSubDepartmentDetail, params, false);
};

export const getPayrollData = (params) => {
  return Get(apiConstant.getPayrollDetails, params, false);
};
export const getReligionData = (params) => {
  return Get(apiConstant.getReligionDetails, params, false);
};

export const submitManageSchedulerProfile = (params) => {
  return Post(apiConstant.saveManageSchedulerProfile, params, false);
};
export const updateManageSchedulerProfile = (params) => {
  return Post(apiConstant.updateManageSchedulerProfile, params, false);
};

export const deleteManageProfile = (params) => {
  return Delete(
    apiConstant.deleteManageSchedulerProfile + "/" + params.id,

    params,
    false
  );
};

export const saveUser = (params) => {
  return Post(apiConstant.saveUserControl, params);
};

//refactored data
export const useDynamicUserMenu = ({ userId }) => {
  let context = useGet(apiConstant.dynamicMenu + "/" + userId);

  if (context.data) {
    return {
      ...context,
      data: context.data.sort((data1, data2) =>
        data1.groupName.localeCompare(data2.groupName)
      ),
    };
  } else {
    return context;
  }
};
