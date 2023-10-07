import { apiConstant } from "./apiConstants";
import { Post, useGet, useGet2 } from "./service";

export const useGetDepartmentById = (params, select, disable) => {
  let context = useGet(
    apiConstant.getDepartMentData +
      "/" +
      params.userId +
      "/ " +
      params.profileId,
    params,
    select,
    disable
  );

  return context;
};

export const useGetJobTitle = (params, select, disable) => {
  var addUrl = "/" + params.departmentId;
  let context = useGet(
    apiConstant.getJobTitleData + addUrl,
    null,
    select,
    disable
  );
  return context;
};

export const useGetDutyManager = (params) => {
  let context = useGet(apiConstant.getDutyManagerList);

  return context;
};

export const useGetWorkRotationDet = (params) => {
  let context = useGet(
    apiConstant.getWorkRotationDet + "/" + params.workRotationId
  );

  return context;
};

export const useGetDemandData = (params) => {
  let context = useGet(apiConstant.getDemandId + "/" + params.demandId);

  return context;
};

export const useGetEmployeeSuggestion = (params, select, disable) => {
  let context = useGet2(
    apiConstant.getEmployeeSuggestions,
    params,
    select,
    disable
  );
  return context;
};

export const useGetValidateRoster = (params, select, disable) => {
  let context = useGet2(apiConstant.validateRoster, params, select, disable);
  return context;
};

export const useGetallStaffData = (params, select, disable) => {
  let context = useGet2(apiConstant.getAddStaffData, params, select, disable);
  return context;
};

export const useGetWorkDuration = (params, select, disable) => {
  return useGet(apiConstant.getWorkDurationData, params, select, disable);
};
export const useGetOnCallList = (params, select, disable) => {
  let context = useGet(apiConstant.getOnCallLovList, params, select, disable);
  return context;
};
export const useGetOnEmergencyList = (params, select, disable) => {
  let context = useGet(apiConstant.getEmergencyList, params, select, disable);
  return context;
};

export const useGetWorkLocationList = (params, select, disable) => {
  let context = useGet(apiConstant.getWorkLocationData, null, select, disable);
  return context;
};

export const useGetSelfRosters = (params) => {
  return useGet(
    `${apiConstant.getSelfRosters}?personId=${params.personId}&page=${params.page}&size=${params.size}`
  );
};

export const useGetSelfRosterWorkDurationsByPersonId = (params) => {
  return useGet(apiConstant.getSelfRosterWorkDurationByPersonId, params);
};

export const useGetSelfRostersApprovalHistory = (params) => {
  return useGet(
    `${apiConstant.getSelfRostersApprovalHistory}?selfRosterId=${params.selfRosterId}&page=${params.page}&size=${params.size}`
  );
};

export const useGetSelfRostersWorkDuration = (params) => {
  return useGet(
    `${apiConstant.getSelfRostersWorkDuration}?personId=${params.personId}`
  );
};

export const createSelfRoster = (params) => {
  return Post(apiConstant.createSelfRoster, params, false);
};
export const sendApproval = (params) => {
  return Post(apiConstant.sendForApproval, params, false);
};
export const sendRmiForApproval = (params) => {
  return Post(apiConstant.sendForRmiRequest, params, false);
};

export const useGetSelfRostersWeeklyWorkDuration = (params) => {
  return useGet(
    `${apiConstant.getSelfRostersWeeklyWorkDuration}?selfRosterId=${params.selfRosterId}&page=${params.page}&size=${params.size}`
  );
};

export const useGetAllEmployeeList = (params, select, disable) => {
  var context = useGet2(
    apiConstant.getallRoasterEmpDetailTableData,
    params,
    select,
    disable
  );
  return context;
};

export const useGetEmployeeDetails = (params, select, disable) => {
  return useGet2(
    apiConstant.getRosterSinglePersonData,
    params,
    select,
    disable
  );
};

export const useGetPersonRosterData = (params, select, disable) => {
  return useGet2(apiConstant.getPersonRosterdata, params, select, disable);
};
