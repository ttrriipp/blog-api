import { redirect, useLoaderData, useOutletContext } from "react-router";
import apiClient from "~/lib/api";
import PostTable from "./components/postTable";
import CreatePost from "./components/createPost";

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
  return (
    <main className="flex min-h-[90cqh] bg-background justify-center items-center">
      <div className="flex flex-col gap-2">
        <div className="self-end">
          <CreatePost />
        </div>
        <PostTable posts={posts} />
      </div>
    </main>
  )
}
