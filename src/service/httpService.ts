import axios from "axios";
import apiClient from "../axiosConfig/apiConfig";
import { redirect } from "react-router-dom";

class CustomError extends Error {
  code: number | undefined;
  info: any;
}
export const authUser = async (
  userData: { email: string; password: string; name?: string },
  mode: string
) => {
  const response = await axios.post(
    `https://localhost:3000/v1/api/auth/${mode}`,
    userData
  );
  if (
    response.status === 404 ||
    response.status === 401 ||
    response.status === 400
  ) {
    const error = new CustomError("An error occurred while fetching campaings");
    error.info = response.data.message;
    throw error;
  }

  if (response.status === 200) {
    const token = response.data.token;
    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());
  }
  return redirect("/");
};

export const fetchCampaigns = async () => {
  const response = await apiClient.get("/v1/api/campaign");
  if (
    response.status === 404 ||
    response.status === 401 ||
    response.status === 400
  ) {
    const error = new CustomError("An error occurred while fetching campaings");
    error.info = response.data.message;
    throw error;
  }
  const data = response.data;
  return data;
};
