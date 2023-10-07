import { apiConstant } from "./apiConstants";
import { useGet, useGet2, useGetCombined, usePost } from "./service";
import FILTER_MODAL_DATA from "../pages/AcessControl/Modals/modalData.json";

export const UseScheduleProfileData = () => {
  let context = useGet(apiConstant.getScheduleProfileData);

  return context;
};
export const useScheduleEmpData = (params) => {
  let context = useGet(apiConstant.getScheduleEmpData + "/" + params.profileId);

  return context;
};
export const useScheduleUserData = (params) => {
  let context = useGet(
    apiConstant.getScheduleUserData + "/" + params.profileId
  );

  return context;
};
export const useProfileCriteria = () => {
  let context = useGet(apiConstant.getProfileCriteria);
  return context;
};

export const useProfileCriteriaById = (params) => {
  let context = useGet(apiConstant.getProfileCriteriaById + "/" + params.id);

  return context;
};

export const useTaskByUserId = (params, disable) => {
  let context = useGet(
    apiConstant.getUserControlTask + "/" + params?.userId,
    null,
    null,
    disable
  );

  return context;
};
export const useGetReligionData = () => {
  let context = useGet(apiConstant.getReligionDetails);
  return context;
};

export const useGetScheduleJobTitle = () => {
  let context = useGet(apiConstant.getScheduleJobTitle);
  return context;
};

export const useScheduleJobFamily = () => {
  let context = useGet(apiConstant.getScheduleJobFamily);
  return context;
};

export const useEmployeeCategoryData = () => {
  let context = useGet(apiConstant.getEmployeeCatogery);
  return context;
};

export const useDepartmentData = (params, select, disable) => {
  let context = useGet2(
    apiConstant.getDepartmentDetail,
    params,
    select,
    disable
  );
  return context;
};

export const useSubDepartmentData = () => {
  let context = useGet(apiConstant.getSubDepartmentDetail);
  return context;
};

export const usePayrollData = () => {
  let context = useGet(apiConstant.getPayrollDetails);
  return context;
};

export const useGetcitizenData = () => {
  let context = useGet(apiConstant.getCitizenShipData);
  return context;
};

export const useGetSkill = (params, select, disable) => {
  let context = useGet(apiConstant.getSkillData, params, select, disable);
  return context;
};

export const useBussinessUnitData = (params) => {
  let context = useGet(apiConstant.getBussinessUnitData);
  return context;
};

export const useLegalEntityData = (params) => {
  let context = useGet(apiConstant.getLegalEntityData);
  return context;
};

export const useGetProfileCriteriaById = (params, id) => {
  let context = useGet(apiConstant.getProfileCriteriaById + "/" + params?.id);
  return context;
};

export const useManageAccessRoleGetData = (params) => {
  let context = useGet(apiConstant.manageAccessRoleGet);
  return context;
};

export const useGetTaskGroupDetails = (select) => {
  let context = useGet(apiConstant.taskDetails, null, select);
  return context;
};
export const useGetTaskGroup = (params) => {
  let context = useGet(apiConstant.taskGroupGet + "/" + params.id);
  return context;
};
export const useGetUserList = (params) => {
  let context = useGet(apiConstant.userList + "/" + params.id);
  return context;
};

export const useGetScheduleJobFaimly = (select) => {
  let context = useGet(apiConstant.getJobFamilyData);
  return context;
};

export const UseGetScheduleUserData = (params) => {
  let context = useGet(apiConstant.getUserData + "/" + params.profileId);
  return context;
};
export const useGetTaskByUserId = (params) => {
  let context = useGet(apiConstant.getUserControlTask + "/" + params.userId);
  return context;
};
export const useGetNationality = () => {
  return new Promise((res) =>
    res({
      data: FILTER_MODAL_DATA.NATIONALITY_MODAL.rows,
    })
  );
};

export const useGetInitialData = () => {
  const apis = [
    { url: apiConstant.getBussinessUnitData, key: "businessUnit" },
    { url: apiConstant.getJobFamilyData, key: "jobFamily" },
    { url: apiConstant.getLegalEntityData, key: "legalEntity" },
    { url: apiConstant.getPayrollDetails, key: "payroll" },
  ];

  return useGetCombined(apis);
};
