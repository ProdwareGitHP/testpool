import { apiConstant } from "./apiConstants";
import { Get, useGet } from "./service";

export const useGetAllExpenditure = () => {
  let context = useGet(apiConstant.AllExpenditure);
  return context;
};
//  export const useGetAllProject =() =>{
//     let context = useGet(apiConstant.getAllProject);
//     return context;
//  }
//  export const useGetWorkDuration = () => {
//     let context = useGet(apiConstant.getworkDuration);
//     return context;
//  }

export const useDutyManager = () => {
  let context = useGet(apiConstant.getDutyManagerList);
  return context;
};
export const useGetDepartmentById = (params, select, disable) => {
  let context = useGet(
    apiConstant.getDepartMentData + "/" + params.profileId,
    null,
    select,
    disable
  );
  return context;
};

export const getJobTitleById = (params) => {
  var addUrl = "/" + params.departmentId + "/" + params.profileId;

  return Get(apiConstant.getJobTitleData, +addUrl, {}, false);
};

export const useGetJobTitleById = (params, select, disable) => {
  let context = useGet(
    apiConstant.getJobTitleData + "/" + params.departmentId,
    null,
    select,
    disable
  );
  return context;
};
export const useEmergency = () => {
  let context = useGet(apiConstant.getEmergencyList);
  return context;
};
export const useOnCall = () => {
  let context = useGet(apiConstant.getOnCallLovList);
  return context;
};

export const useWorkDuration = (params, select, disable) => {
  let context = useGet(
    apiConstant.getWorkDurationData,
    params,
    select,
    disable
  );
  return context;
};
export const useWorkLocation = (params, select, disable) => {
  let context = useGet(
    apiConstant.getWorkLocationData,
    // + "/" + params.profileId,
    null,
    select,
    disable
  );
  return context;
};
export const useGetAllRosterdata = (Params) => {
  let context = useGet(
    apiConstant.getallRoasterProfileData + "/" + Params.userId
  );
  return context;
};

export const useGetSingleShift = (params) => {
  let context = useGet(
    apiConstant.getUpdateSingleShift +
      "/" +
      params.personId +
      "/" +      
      params.personRosterId
  );
  return context;
};
export const useBussinessUnitData = (params, select, disable) => {
  let context = useGet(
    apiConstant.getBussinessUnitData,
    params,
    select,
    disable
  );
  return context;
};
export const useGetProfileById = (params, select, disable) => {
  let context = useGet(apiConstant.getallProfileData, params, select, disable);
  return context;
};
export const useGetDemandTemplateById = (params, select, disable) => {
  let context = useGet(
    apiConstant.getDemandTempDataById + "/" + params.id,
    null,
    select,
    disable
  );
  return context;
};

export const useGetDemandTemp = (params, select, disable) => {
  let context = useGet(
    apiConstant.getDemandTempData + "/" + params.userId,
    null,
    select,
    disable
  );
  return context;
};
export const useGetSkill = () => {
  let context = useGet(apiConstant.getSkillData);
  return context;
};
export const useGetCitizenData = (params, select, disable) => {
  let context = useGet(apiConstant.getCitizenShipData, params, select, disable);
  return context;
};
export const useWorkDurationSummaryData = (params, select, disable) => {
  let context = useGet(apiConstant.getSummaryData, params, select, disable);
  return context;
};
export const useWorkDurationCategory = (params, select, disable) => {
  let context = useGet(
    apiConstant.getWorkDurationCategory,
    params,
    select,
    disable
  );
  return context;
};
export const useGetWorkPlan = () => {
  let context = useGet(apiConstant.getWorkPlanDetail);
  return context;
};
export const useGetWorkRotataion = () => {
  let context = useGet(apiConstant.getWorkRotationData);
  return context;
};

export const useGetWorkRotationById = (params, select, disable) => {
  let context = useGet(
    apiConstant.getWorkRotationDataById + "/" + params.workRotationId,
    {},
    select,
    disable
  );
  return context;
};
export const useGetSplitSelectShift = () => {
  let context = useGet(apiConstant.getSplitShiftSelectData);
  return context;
};
export const useGetSplitShiftById = (params, select, disable) => {
  let context = useGet(
    apiConstant.getSplitShiftTableDatabyId + "/" + params.spliShiftId,
    {},
    select,
    disable
  );
  return context;
};

export const useGetAllTask = () => {
  let context = useGet(apiConstant.getAllTask);
  return context;
};

export const usePublishedRosters = (params) =>
  useGet(apiConstant.getPublishedRosters, params);

export const usePublishedRosterPopup = (params) =>
  useGet(apiConstant.getPublishedRosterPopup, params);

export const usePublishedRosterByMe = (params) =>
  useGet(apiConstant.getPublishedRosterByMe, params);

export const useGetEmployeeTypes = (params, select, disable) => {
  let context = useGet(apiConstant.getEmployeeTypes, params, select, disable);
  return context;
};

export const useGetDemandTemplateProfiles = (params, select, disable) => {
  let context = useGet(
    apiConstant.getDemandTemplateProfiles,
    params,
    select,
    disable
  );
  return context;
};
