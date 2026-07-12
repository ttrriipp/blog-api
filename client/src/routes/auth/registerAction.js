import { UserContext } from "@/context";
import apiClient from "@/lib/api";
import { data, redirect } from "react-router";

export async function action({ context, request }) {
  try {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);
    const { data } = await apiClient.post("/auth/register", user);
    localStorage.setItem("access_token", data.token);
    context.set(UserContext, user);
    console.log("you are now authenticated!");
    return redirect("/");
  } catch (error) {
    console.error("Fetch Error:", error);
    throw data(error.response.data, error.response);
  }
}
