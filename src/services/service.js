import axios from "axios";
import { useQuery, useMutation, useQueryClient, useQueries } from "react-query";
import { store } from "../redux/store";
import { axiosClient } from "./axios";
import { IP } from "./env";

const TenantId = () => {
  const { xtenantId } = store.getState().commonReducer;
  return {
    "X-TenantID": xtenantId || "1001",
  };
};

const UserId = () => {
  const { userId } = store.getState().commonReducer;
  return {
    userId: userId,
  };
};

const Token = () => {
  const { access_token } = store.getState().commonReducer;
  return access_token
    ? {
        Authorization: "Bearer " + access_token,
      }
    : null;
};

export const Get = (url, params) => {
  // return Request(url, "Get", params);
  return axiosClient.get(url, { params });
};
export const useGet = (endpoint, params, select, disable, onSuccess) => {
  const key = [endpoint, params];
  let query = useQuery(
    key,
    () => axiosClient.get(endpoint, { params }).then((res) => res.data?.data),
    {
      enabled: !disable,
      retry: false,
      select: select,
      onSuccess: onSuccess,
    }
  );
  const client = useQueryClient();
  const invalidate = () => client.invalidateQueries(key);
  return { ...query, invalidate };
};

export const useGet2 = (endpoint, params, select, disable) => {
  return useQuery(
    [endpoint, params],
    () => axiosClient.post(endpoint, params).then((res) => res.data?.data),
    {
      enabled: !disable,
      retry: false,
      select: select,
    }
  );
};

export const usePost = (endpoint) => {
  return useMutation((params) => {
    axiosClient.post(endpoint, params);
  });
};

export const Post = (url, params) => {
  return Request(url, "Post", params);
};

export const Put = (url, params) => {
  return Request(url, "Put", params);
};

export const Delete = (url, params) => {
  return Request(url, "Delete", params);
};

export const Request = (url, method, params, formDataFlag = false) => {
  let formData = new FormData();
  for (const key in params) {
    formData.append(key, params[key]);
  }
  return axios({
    url: `http://${IP}:9018/ews/${url}`,
    method: method,
    headers: buildHeaders(),
    params: !formDataFlag ? (method == "get" ? params : null) : params,
    data: formDataFlag ? formData : params,
    // timeout: TIMEOUT,
  });
};

function buildHeaders() {
  let headers = {
    // "Content-Type": "application/json",
    ...Token(),
    ...TenantId(),
    ...UserId(),
  };

  return { ...headers };
}

export const useGetCombined = (apis) => {
  // required parameters
  // . url
  // . key
  // . params (optional)
  // provide a key for every api which will be used as an objectkey to the response object

  const queries = apis.map((api, i) => {
    return {
      queryKey: [api.key + ":" + i, api.params],
      queryFn: () =>
        axiosClient
          .get(api.url, { params: api.params || {} })
          .then((res) => res.data?.data),
      staleTime: Infinity,
    };
  });

  const queryResults = useQueries(queries);

  const modifiedResponses = queryResults.reduce(
    (acu, response, index) => {
      const detailedResponses = acu.detailedResponses;
      const responses = acu.responses;
      const objKey = apis[index].key;

      detailedResponses[objKey] = {
        data: response.data,
        isLoading: response.isLoading,
        isSuccess: response.isSuccess,
        isError: response.isError,
        // Include any other properties you need
      };
      responses[objKey] = response.data;

      return { responses, detailedResponses };
    },
    { responses: {}, detailedResponses: {} }
  );

  const isLoadingCombined = useQueries(queries).some((el) => el.isLoading);

  return { isLoadingCombined, ...modifiedResponses };
};
