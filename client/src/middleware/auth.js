import { redirect, data } from "react-router";
import apiClient from "@/lib/api";

export const authMiddleware = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.log("you are not authenticated");
      throw redirect("/", {
        status: 401,
        statusText: "you are not authenticated",
      });
    }
    const { data } = await apiClient.get("/auth/me");

    const user = data;
    if (!user) {
      console.log("you are not authenticated");
      throw redirect("/");
    }
  } catch (error) {
    console.error(error);
    throw data(null, error);
  }
};
