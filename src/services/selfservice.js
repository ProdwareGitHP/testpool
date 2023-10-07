import { apiConstant } from "./apiConstants";
import { useGet, useGet2 } from "./service";

export const useTimeZone = () => {
  let context = useGet(apiConstant.getTimeZoneData);
  return context;
};

export const useVacatioRuleData = (params) => {
  let context = useGet(apiConstant.vacationRule);
  return context;
};

export const useTaskData = (params) => {
  let context = useGet(apiConstant.taskData, params, false);

  return context;
};

export const useUserDetails = (params, select, disable) => {
  let context = useGet2(apiConstant.getUserData, params, select, disable);
  return context;
};
