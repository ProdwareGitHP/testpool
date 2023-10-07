import { apiConstant } from "./apiConstants";
import { useGet } from "./service";

export const useWorkDuration = (select) => {
  let context = useGet(apiConstant.getWorkDurationData, null, select);
  return context;
};
// export const useGetValueFromListData = () => {
//     let context = useGet(apiConstant );
//     return content;
// }

export const useGetTeamTableData = (params) => {
  let context = useGet(
    apiConstant.getManageTeamTableData + "/" + params.userId
  );
  return context;
};
export const useGetValueFromListData = () => {
  let context = useGet(apiConstant.getMangeTeamOpenFromValueList);
  return context;
};

export const useGetManageTeamDataById = (params) => {
  let context = useGet(
    apiConstant.getManageTeamTableDataById + "/" + params.teamId
  );
  return context;
};
