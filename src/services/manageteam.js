import { apiConstant } from "./apiConstants";
import { useGet } from "./service";

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

export const useGetValueFromListData = (params, select) => {
  let context = useGet(
    apiConstant.getMangeTeamOpenFromValueList,
    params,
    select
  );
  return context;
};

export const useGetTeamTableData = (params, select, disable) => {
  let context = useGet(
    apiConstant.manageTeamMemberTableData,
    {},
    select,
    disable
  );
  return context;
};

export const useGetManageTeamData = () => {
  let context = useGet(apiConstant.getManageTeamTableData);
  return context;
};
