import apiClient from "@/lib/api";
import { data, redirect } from "react-router";

export async function action({ params, request }) {
  try {
    const formData = await request.formData();
    const comment = Object.fromEntries(formData);
    console.log(comment);
    const { data } = await apiClient.post(
      `posts/${params.postId}/comments/create`,
      comment,
    );
    console.log(data);
    return redirect(`/posts/${params.postId}`);
  } catch (error) {
    console.error("Fetch Error:", error);
    throw data(error.response.data, error.response);
  }
}
