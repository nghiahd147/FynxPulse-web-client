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
  payload?: Record<string, any>;
  headers?: Record<string, any>;
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

    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error;
    }
    throw error;
  }
};
