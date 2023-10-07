import { apiConstant } from "./apiConstants";
import { useGet,Get,useGet2, Post } from "./service";

export const useDepartment = () =>{
    let context = useGet(apiConstant.getDepartMentList);
    return context;
}
export const useTimeSheetReport = (params) =>{
    return Post(apiConstant.getTimeSheetReport,params,false);
}
export const useEmployeeTimeSheetReport = (params) =>{
    return Post(apiConstant.employeeTimeSheetReport,params);
}

export const useRequestStatus = (params) =>{
    return Post(apiConstant.requestStatus,params,false);
}