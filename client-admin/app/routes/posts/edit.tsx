import apiClient from "~/lib/api";
import type { Route } from "./+types/edit"
import { redirect } from "react-router";
import { PostDetail } from "../components/postDetail";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const post = Object.fromEntries(formData)
  const { id, ...postData } = post
  await apiClient.patch(`admin/posts/${id}`, postData)
  return redirect('/')
}

export async function clientLoader({
  params
}: Route.ClientLoaderArgs) {
  const { data: post } = await apiClient.get(`admin/posts/${params.postId}`);
  return post;
}

export default function EditPost({
  loaderData
}: Route.ComponentProps) {
  const post = loaderData;
  return (
    <main className="flex min-h-[90cqh] bg-background justify-center items-center">
      <PostDetail post={post} />
    </main>
  )

}
