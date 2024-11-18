import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    if (!user) {
      navigator("/login", { replace: true, state: location });
    }
  }, []);
  return <Outlet />;
};

export default PrivateRoute;
