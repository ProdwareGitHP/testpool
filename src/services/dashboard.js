import { apiConstant } from "./apiConstants";
import { useGet } from "./service";

export const useGetResionList = (params) =>{
    let context = useGet(apiConstant.getResionList + "/" + params.requestId );
    return context;
  }
  
export const useGetSourceRoaster = (params) =>{
  let context = useGet(apiConstant.getSourceRoaster + "/" + params.personId );
  return context;
}

export const useGetDestinationRoster = (params) => {
  let context = useGet(apiConstant.getDestinationRoster + "/" + params.personId);
  return context;
}

export const useTimeCardData = (params, disable) => useGet(apiConstant.getTimeCardData, params, disable);

export const useTimeCardSummary = (params, disable) => useGet(apiConstant.getTimeCardSummary, params, disable);

export const useTimeCardPunchDetail = (params) => useGet(apiConstant.getTimeCardPunchDetail, params);