import apiClient from "@/lib/api";
import { data, redirect } from "react-router";

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);
    const { data } = await apiClient.post("/auth/login", user);
    localStorage.setItem("access_token", data.token);
    console.log("you are now authenticated!");
    return redirect("/");
  } catch (error) {
    console.error("Fetch Error:", error);
    throw data(error.response.data, error.response);
  }
}
