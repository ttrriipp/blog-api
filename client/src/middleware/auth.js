import { UserContext } from "@/context";
import { redirect, data } from "react-router";
import apiClient from "@/lib/api";

export const authMiddleware = async ({ context }) => {
  try {
    const { data } = await apiClient.get("/auth/me");
    const user = data;
    if (!user) {
      console.log("you are not authenticated");
      throw redirect("/");
    }
    context.set(UserContext, user);
  } catch (error) {
    console.error(error);
    throw data(error.response.data, error.response);
  }
};
