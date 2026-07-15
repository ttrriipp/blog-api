import { redirect, useLoaderData, useOutletContext } from "react-router";
import apiClient from "~/lib/api";
import { type User } from "~/types";
import PostTable from "./components/postTable";

export async function clientLoader() {
  const token = localStorage.getItem("access_token")
  if (!token) {
    throw redirect("/login")
  }

  const { data: posts } = await apiClient.get("/admin/posts")
  return posts
}

export default function Home() {
  const posts = useLoaderData();
  console.log(posts)
  return (
    <main className="flex min-h-[90cqh] bg-background justify-center items-center">
      <PostTable posts={posts} />
    </main>
  )
}
