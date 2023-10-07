import { Post, useGet } from './service';
import { apiConstant } from './apiConstants';

export const useGetAllNotification = (params) => useGet(apiConstant.getAllNotification, params);

export const useGetActionableNotification = (params) => useGet(apiConstant.getActionableNotification, params);

export const useGetInfoOnlyNotification = (params) => useGet(apiConstant.getInfoOnlyNotification, params);

export const useGetClosedNotification = (params) => useGet(apiConstant.getClosedNotification, params);

export const useGetNotificationPopup = (params) => useGet(apiConstant.getNotificationPopup, params);

export const useGetNotificationApproval= (params) => useGet(apiConstant.getNotificationApproval, params);

export const useGetNotificationSelfRosterApproval = (params) => useGet(apiConstant.getNotificationSelfRosterApproval, params);

export const usePostNotificationSelfRosterApproval = (params) => Post(apiConstant.postNotificationSelfRosterApproval, params);

export const usePostNotificationOk = (params) => Post(apiConstant.postNotificationActions, params);

export const usePostNotificationSubmit = (params) => Post(apiConstant.postNotificationActions, params);

export const usePostNotificationApprove = (params) => Post(apiConstant.postNotificationActions, params);

export const usePostNotificationRMI = (params) => Post(apiConstant.postNotificationActions, params);

export const usePostNotificationForward = (params) => Post(apiConstant.postNotificationActions, params);
