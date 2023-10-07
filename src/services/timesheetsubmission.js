import { apiConstant } from "./apiConstants";
import { useGet, useGet2 } from "./service";

//mutate is used in get api
export const useDetailById = (params) => {
  let context = useGet(apiConstant.timehseetById, params);
  return context;
};

export const usePayrollTtimehseetById = (params, onSuccess) => {
  let context = useGet(
    apiConstant.payrollTtimehseetById,
    params,
    null,
    null,
    onSuccess
  );
  return context;
};

export const useAllTimesheetMaster = (params, select) => {
  let context = useGet(apiConstant.allTimesheetMaster, params, select);
  return context;
};

export const useGetAllProject = () => {
  let context = useGet(apiConstant.getAllProject);
  return context;
};

export const useGetAllTask = () => {
  let context = useGet(apiConstant.getAllTask);
  return context;
};

export const useGetAllExpenditure = () => {
  let context = useGet(apiConstant.getAllExpenditure);
  return context;
};

export const useGetAllTimesheetMaster = () => {
  let context = useGet(apiConstant.allTimesheetMaster);
  return context;
};

export const useGetDashboardList = (params, select) => {
  let context = useGet2(apiConstant.dashboardList, params, select);
  return context;
};
