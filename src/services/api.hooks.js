import { apiConstant } from "./apiConstants";
import { useGet } from "./service";

export const useDynamicUserMenu = (params, select, disable) => {
  let context = useGet(apiConstant.dynamicMenu, null, select, disable);
  return context;
};

export const useProfileList = (params, select, disable) => {
  let context = useGet(apiConstant.getprofileist, params, select, disable);
  return context;
};

export const useGetWorkRotation = (params) => {
  return useGet(
    apiConstant.getworkRotation // params.userId
  );
};

export const useWorkDuration = (params, select, disable) => {
  let context = useGet(apiConstant.getWorkDurationData, params, disable);
  return context;
};

export const useGetDemandTemp = (params) => {
  return useGet(
    apiConstant.getDemandTempData + "/" + "300000006565312",
    params,
    false
  );
};
