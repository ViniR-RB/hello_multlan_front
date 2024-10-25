import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { httpClient } from "../http/client";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await httpClient.unAuth.post(
        "/api/auth/login",
        credentials
      );
      const { accessToken, refreshToken } = response.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const userResponse = await httpClient.unAuth.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(userResponse.data);
      localStorage.setItem("user", JSON.stringify(userResponse.data));
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    

    if (storedUser && storedAccessToken && storedRefreshToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      navigate('/dashboard')
    }
  }, []);

  useEffect(() => {
    const refreshAccessToken = async () => {
      if (refreshToken) {
        try {
          const response = await httpClient.auth.post("/api/auth/refresh", {
            refreshToken: refreshToken,
          });
          setAccessToken(response.data.accessToken);
        } catch (error) {
          console.error("Erro ao renovar o token", error);
          logout();
        }
      }
    };

    const intervalId = setInterval(refreshAccessToken, 24 * 60 * 60 * 1000); // 24 horas
    return () => clearInterval(intervalId);
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
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
