import axios from "axios";
export const apiUrl = import.meta.env.VITE_API_URL;

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
  params?: Record<string, any>;
}) => {
  try {
    const result = await axios({
      baseURL: apiUrl,
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
