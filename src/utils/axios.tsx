import axios from "axios";

export const apiCall = async ({
  endPoint,
  method,
  payload,
  headers,
  params,
}: {
  endPoint: string;
  method: string;
  payload?: Record<string, unknown> | string;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
}) => {
  try {
    const result = await axios({
      baseURL: "http://localhost:5000",
      method,
      url: endPoint,
      headers,
      data: payload,
      params,
    });
    return {
      response: result,
      error: null,
    };
  } catch (e) {
    const error = e instanceof axios.AxiosError ? e : null;
    return {
      response: null,
      error: error?.request,
    };
  }
};
