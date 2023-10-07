import { Post, useGet } from './service';
import { apiConstant } from './apiConstants';

export const useGetAllPunches = (params) => useGet(apiConstant.getAllPunches, params);

export const usePostAllPunches = (params) => Post(`${apiConstant.saveWebCheckIn}?personId=${params?.personId}`, params);