import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCookiesAuth from "../hooks/jwt_hook";
import { httpClient } from "../http/client";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const {
    insertAccessToken,
    insertRefreshToken,
    removeTokens,
    getAcessTokenToken,
    getUser,
    getRefreshToken,
    insertUser,
  } = useCookiesAuth();

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await httpClient.unAuth.post(
        "/api/auth/login",
        credentials
      );
      const { accessToken, refreshToken } = response.data;

      insertAccessToken(accessToken);
      insertRefreshToken(refreshToken);

      const userResponse = await httpClient.auth.get("/api/auth/me");
      setUser(userResponse.data);
      insertUser(userResponse.data);
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  const logout = () => {
    removeTokens();
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = getUser();
    const storedAccessToken = getAcessTokenToken();
    const storedRefreshToken = getRefreshToken();

    if (storedUser && storedAccessToken && storedRefreshToken) {
      if (location.pathname === "/login") {
        console.log("redirecting to dashboard");
        navigate("/dashboard", { replace: true });
      } else {
        console.log("redirecting to previous page");
        navigate(location.pathname, { replace: true });
      }
    } else {
      logout();
    }
  }, [location.pathname, navigate]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
