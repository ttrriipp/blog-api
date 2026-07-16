import apiClient from "~/lib/api";
import type { Route } from "./+types/create"
import { redirect } from "react-router";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  console.log(formData)
  const post = Object.fromEntries(formData)
  console.log(post)
  await apiClient.post('admin/posts/create', post)
  return redirect('/')
}

export default function CreatePost() {
  return null
}
