import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import EnvConfig from "../enviroment";

const handleRequestError = (error: AxiosError) => {
  console.error("Erro na requisição:", error);
  return Promise.reject(error);
};

const createUnAuthClient = (): AxiosInstance => {
  const unAuthClient = axios.create({
    baseURL: EnvConfig.getInstance().VITE_API_URL,
  });

  unAuthClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    handleRequestError
  );

  return unAuthClient;
};

const createAuthClient = (): AxiosInstance => {
  const authClient = axios.create({
    baseURL: EnvConfig.getInstance().VITE_API_URL,
  });
  const accessToken = localStorage.getItem("accessToken");

  authClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  authClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    handleRequestError
  );

  return authClient;
};

// Expor os clients para uso
export const httpClient = {
  unAuth: createUnAuthClient(),
  auth: createAuthClient(),
};
