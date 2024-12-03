import UserModel from "../models/user_model";
import CookieService from "../services/cookies_service";

export default function useCookiesAuth() {
  const insertAccessToken = (accessToken: string): void => {
    const expiresInSeconds = 24 * 60 * 60;
    CookieService.setCookie("accessToken", accessToken, expiresInSeconds);
    CookieService.setCookie(
      "accessTokenExpiresAt",
      `${Date.now() + expiresInSeconds * 1000}`,
      expiresInSeconds
    );
  };

  const insertRefreshToken = (refreshToken: string): void => {
    const expiresInSeconds = 15 * 24 * 60 * 60;
    CookieService.setCookie("refreshToken", refreshToken, expiresInSeconds);
    CookieService.setCookie(
      "refreshTokenExpiresAt",
      `${Date.now() + expiresInSeconds * 1000}`,
      expiresInSeconds
    );
  };

  const getRefreshToken = (): { value: string; expiresAt: string } => {
    return {
      value: CookieService.getCookie("refreshToken")!,
      expiresAt: CookieService.getCookie("refreshTokenExpiresAt")!,
    };
  };
  const getAcessTokenToken = (): { value: string; expiresAt: string } => {
    return {
      value: CookieService.getCookie("accessToken")!,
      expiresAt: CookieService.getCookie("accessTokenExpiresAt")!,
    };
  };

  const removeTokens = () => {
    CookieService.deleteCookie("accessToken");
    CookieService.deleteCookie("accessTokenExpiresAt");
    CookieService.deleteCookie("refreshToken");
    CookieService.deleteCookie("refreshTokenExpiresAt");
    CookieService.deleteCookie("user");
  };

  const isAccessTokenExpired = (): boolean => {
    const expiresAt = CookieService.getCookie("accessTokenExpiresAt");
    return expiresAt ? Date.now() > Number(expiresAt) : true;
  };
  const isRefreshTokenExpired = (): boolean => {
    const expiresAt = CookieService.getCookie("refreshTokenExpiresAt");
    return expiresAt ? Date.now() > Number(expiresAt) : true;
  };

  const getUser = (): Pick<UserModel, "id" | "name" | "email"> | null => {
    const user = CookieService.getCookie("user");
    return user ? JSON.parse(user) : null;
  };
  const insertUser = (user: Pick<UserModel, "id" | "name" | "email">) => {
    CookieService.setCookie("user", JSON.stringify(user), 24 * 60 * 60);
  };

  return {
    insertUser,
    insertAccessToken,
    insertRefreshToken,
    getRefreshToken,
    getAcessTokenToken,
    removeTokens,
    isAccessTokenExpired,
    isRefreshTokenExpired,
    getUser,
  };
}
