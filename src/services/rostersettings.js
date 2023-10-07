import { apiConstant } from "./apiConstants";
import { useGet } from "./service";

//WorkDuration
export const useWorkDurationSummaryData = (params, select, disable) => {
  return useGet(apiConstant.getSummaryData, params, select, disable);
};

export const useAllCategoryData = () => {
  return useGet(apiConstant.getWorkDurationCategory);
};

export const useBussinessUnitData = () => {
  return useGet(apiConstant.getBussinessUnitData);
};

export const useLegalEntityData = () => {
  return useGet(apiConstant.getLegalEntityData);
};

export const useWorkDurationDetails = () => {
  return useGet(apiConstant.getWorkDurationData);
};

export const useAllDepartmentData = () => {
  return useGet(apiConstant.getDepartmentLov);
};

export const useAllworkDuration = (params, select, disable) => {
  let context = useGet(
    apiConstant.getWorkDurationData,
    params,
    select,
    disable
  );
  return context;
};

export const useGetAllWorkPlan = (params, select, disable) => {
  let context = useGet(apiConstant.getWorkPlanDetail, params, select, disable);
  return context;
};

//split shift
export const useSplitShiftData = (params, select, disable) => {
  let context = useGet(
    apiConstant.getSplitShiftTableData,
    params,
    select,
    disable
  );
  return context;
};

export const useSplitShiftDataById = ({ spliShiftId }) => {
  let context = useGet(
    apiConstant.getSplitShiftTableDatabyId + "/" + spliShiftId
  );
  return context;
};

export const useSplitShiftSelectData = () => {
  let context = useGet(apiConstant.getSplitShiftSelectData);

  return context;
};

export const useDeleteSplitShiftData = (spliShiftId) => {
  let context = useGet(apiConstant.deleteSplitShiftData + "/" + spliShiftId);

  return context;
};

//demand template
export const useDemanadTemplateData = (profileId) => {
  let context = useGet(apiConstant.deleteSplitShiftData + "/" + profileId);

  return context;
};

//Manage Work rotation

export const useGetWorkRotataion = (params, select, disable) => {
  return useGet(apiConstant.getWorkRotationData, params, select, disable);
};
