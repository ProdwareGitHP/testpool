import { apiConstant } from "./apiConstants";
import { useGet, useGet2 } from "./service";

export const useGetTeamList = (params) => {
  let context = useGet2(apiConstant.getTeamList, params);
  return context;
};

export const useGetRequestList = (params) => {
  let context = useGet(apiConstant.getRequestList, params);
  return context;
};

export const useGetReasonList = (params) => {
  let context = useGet(`${apiConstant.getResionList}`, params);
  return context;
};

export const useGetRequestTypeList = (params) => {
  let context = useGet(`${apiConstant.getRequestTypeList}`, params);
  return context;
};

export const useGetSourceRoaster = (params) => {
  let context = useGet(apiConstant.getSourceRoaster, params);
  return context;
};

export const useGetDestinationRoster = (params, disable) => {
  let context = useGet(apiConstant.getDestinationRoster, params, null, disable);
  return context;
};

export const useGetRequestDetails = () => {
  let context = useGet(apiConstant.getRequestDetails);
  return context;
};

export const useApproveHistoryDetails = (params) => {
  let context = useGet(apiConstant.approveHistoryDetails, params);
  return context;
};

export const useGetDepartments = () => {
  let context = useGet(apiConstant.getDepartments);
  return context;
};

// export const useGetPayCodes = () => {
//   let context = useGet(apiConstant.getPayCodes);
//   return context;
// };

// export const useGetJobs = () => {
//   let context = useGet(apiConstant.getJobs);
//   return context;
// };

export const useMyTeamList = (params) => useGet(apiConstant.getMyTeams, params);
