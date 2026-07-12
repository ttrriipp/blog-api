import apiClient from "@/lib/api";
import { data } from "react-router";

export async function action({ request }) {
  try {
    const formData = await request.formData();

    const userData = Object.fromEntries(formData);

    const { data: login } = await apiClient.post("/auth/login", userData);

    localStorage.setItem("access_token", login.token);

    console.log("you are now authenticated!");

    return;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw data(error.response.data, error.response);
  }
}
