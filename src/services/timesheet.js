import { useGet } from './service';
import { apiConstant } from './apiConstants';

export const useTimeSheetApprovalList = () => useGet(apiConstant.getTimeSheetApproval);

export const useTimeSheetWeekApproval = () => useGet(apiConstant.getTimeSheetWeekApproval);

export const useTimeSheetPayrollApproval = () => useGet(apiConstant.getTimeSheetPayrollApproval);

export const useTimeSheetBulkApprovalList = (props, disable) => {
  return useGet(`${apiConstant.getTimeSheetBulkApproval}?payCode=${props?.payCode}&startDate=${props?.startDate}&endDate=${props?.endDate}`, disable);
};