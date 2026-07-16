import apiClient from "~/lib/api";
import type { Route } from "./+types/delete"
import { redirect } from "react-router";

export async function clientAction({ params }: Route.ClientActionArgs) {
  const { postId } = params
  await apiClient.delete(`admin/posts/${postId}`)
  return redirect('/')
}

export default function DeletePost() {
  return null
}
