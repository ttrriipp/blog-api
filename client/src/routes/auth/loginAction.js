import apiClient from "@/lib/api";
import { data, redirect } from "react-router";

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData);

    const { data: login } = await apiClient.post("/auth/login", userData);

    localStorage.setItem("access_token", login.token);

    console.log("you are now authenticated!");
    return redirect("/");
  } catch (error) {
    console.error("Fetch Error:", error);
    throw data(error.response.data, error.response);
  }
}
