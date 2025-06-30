import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
  children: React.JSX.Element;
};

const  AuthGuard= ({ children }: Props) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

export default AuthGuard;
