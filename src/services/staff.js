import { apiConstant } from "./apiConstants";
import { useGet } from "./service";
//  export const useGetDetailById = (params ) => {
//     let context = useGet(apiConstant.);
//   return context;
//  }

export const useGetEmployeeDetail = (params) => {
  let context = useGet(apiConstant.getEmployeeDetail + "/" + params.personId);
  return context;
};
export const useGetLineData = (params) => {
  let context = useGet(apiConstant.lineData, params);
  return context;
};
