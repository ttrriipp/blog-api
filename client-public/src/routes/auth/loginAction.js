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
    console.error("Login Error:", error);

    if (error.response) {
      return data(
        {
          error: error.response.data.message,
        },
        { status: error.response.status },
      );
    }

    return data(
      { error: "Unable to connect to the server. Please try again." },
      { status: 500 },
    );
  }
}
