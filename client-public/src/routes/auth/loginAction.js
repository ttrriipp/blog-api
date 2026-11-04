import apiClient from "@/lib/api";
import { data, redirect } from "react-router";

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);

    const { data: login } = await apiClient.post("/auth/login", user);

    localStorage.setItem("access_token", login.token);

    return redirect("/");
  } catch (error) {
    console.error("Login Error:", error);

    if (error.response) {
      return data(
        {
          errors: error.response.data,
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
