import apiClient from "~/lib/api";
import type { Route } from "./+types/create"
import { redirect } from "react-router";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const post = Object.fromEntries(formData)
  const { id, ...postData } = post
  console.log(postData)
  await apiClient.patch(`admin/posts/${id}`, postData)
  return redirect('/')
}

export default function UpdatePost() {
  return null
}
