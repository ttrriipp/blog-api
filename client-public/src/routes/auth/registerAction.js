import { UserContext } from "@/context";
import apiClient from "@/lib/api";
import { data, redirect } from "react-router";

export async function action({ context, request }) {
  try {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);

    const { data } = await apiClient.post("/auth/register", user);
    console.log(data);

    localStorage.setItem("access_token", data.token);

    context.set(UserContext, user);

    console.log("you are now authenticated!");

    return redirect("/");
  } catch (error) {
    console.error("Register Error:", error);

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
