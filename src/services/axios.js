import axios from "axios";
import { store } from "../redux/store";
import { updateState, resetState } from "../redux/commonSlice";
import { apiConstant } from "./apiConstants";
import { IP, TIMEOUT } from "./env";

let axiosClient = axios.create({
  baseURL: `http://${IP}:9018/ews`,
  headers: {
    "Content-type": "application/json",
  },
  // timeout: TIMEOUT,
});

const refreshToken = async () => {
  const { xtenantId, refresh_token } = store.getState().commonReducer;

  const rs = await axios.post(
    `http://${IP}:9018/ews${apiConstant.refreshToken}`,
    {
      refreshToken: refresh_token,
    },
    {
      headers: { "X-TenantID": xtenantId || "1001" },
    }
  );

  store.dispatch(updateState({ ...rs.data.data }));
};

axiosClient.interceptors.request.use(function (config) {
  const { xtenantId, access_token, userId } = store.getState().commonReducer;
  // if (xtenantId) {
  config.headers["X-TenantID"] = xtenantId || "1001";
  config.headers["userId"] = userId;

  // }
  if (access_token) {
    config.headers["Authorization"] = "Bearer " + access_token;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          await refreshToken();
          return axiosClient(originalConfig);
        } catch (_error) {
          store.dispatch(resetState({ session_expired: true }));
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export { axiosClient };
