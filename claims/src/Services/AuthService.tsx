import axios from 'axios';

const api = "https://api.example.com/auth";

export const LoginApi = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${api}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Login failed:", error);
    throw error;
  }
}

