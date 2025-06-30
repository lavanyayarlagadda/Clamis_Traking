import axios from "axios";
import { LoginRequest, LoginResponse } from "../types/authTypes";

export const login = (credentials: LoginRequest): Promise<LoginResponse> =>
  axios.post("/api/auth/login", credentials);

export const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
