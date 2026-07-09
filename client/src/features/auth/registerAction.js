import apiClient from "@/lib/api";
import { data } from "react-router";

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);
    const response = await apiClient.post("/register", user);
    console.log(response.data);
    return;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw data(error.response.data, error.response);
  }
}
