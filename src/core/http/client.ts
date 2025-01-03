import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import EnvConfig from "../enviroment";
import useCookiesAuth from "../hooks/jwt_hook";

const handleRequestError = (error: AxiosError) => {
  return Promise.reject(error);
};

const createUnAuthClient = (): AxiosInstance => {
  const unAuthClient = axios.create({
    baseURL: EnvConfig.getInstance().VITE_API_URL,
    timeout: 5000,
    timeoutErrorMessage: "Tempo de requisição excedido.",
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
    timeout: 5000,
    timeoutErrorMessage: "Tempo de requisição excedido.",
  });

  authClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const {
        getAcessTokenToken,
        isAccessTokenExpired,
        getRefreshToken,
        insertAccessToken,
        insertRefreshToken,
      } = useCookiesAuth();
      let { value: accessToken } = getAcessTokenToken();

      // Verificar se o accessToken expirou
      if (isAccessTokenExpired()) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;

        try {
          const { value: refreshToken } = getRefreshToken();

          if (!refreshToken) {
            throw new Error("Refresh token não encontrado.");
          }

          // Chamar a API para renovar o token
          const response = await axios.post(
            `${EnvConfig.getInstance().VITE_API_URL}/api/auth/refresh`,
            { refreshToken }
          );

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data;

          // Atualizar os cookies
          insertAccessToken(newAccessToken);
          insertRefreshToken(newRefreshToken);

          // Atualizar o token na requisição atual
          accessToken = newAccessToken;
        } catch (error) {
          console.error("Erro ao renovar o token:", error);
          throw error;
        }
      }

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
  get auth() {
    return createAuthClient();
  },
};
