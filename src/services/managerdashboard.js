import { apiConstant } from "./apiConstants";
import { useGet } from "./service";

export const useTimeZone = () => {
  let context = useGet(apiConstant.getTimeZoneData);
  return context;
};

export const useGetMonth = () => {
  let context = useGet(apiConstant.getMonthdata);
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

export const useGetChartData = (status, params, select) => {
  let context = useGet(
    `${apiConstant.getChartdata}/${status}/view/data`,
    params,
    select,
    true
  );
  return context;
};
