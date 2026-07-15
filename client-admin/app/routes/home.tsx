import { redirect, useLoaderData, useOutletContext } from "react-router";
import apiClient from "~/lib/api";
import { type User } from "~/types";
import PostTable from "./components/postTable";
import NavBar from "./components/navBar";

export async function clientLoader() {
  const token = localStorage.getItem("access_token")
  if (!token) {
    throw redirect("/login")
  }

  const { data: posts } = await apiClient.get("/admin/posts")
  return posts
}

export default function Home() {
  const { user } = useOutletContext<{ user: User | null }>()
  const posts = useLoaderData();

  console.log(posts)

  return (
    <div className="@container min-h-screen">
      <NavBar user={user} />
      <main className="flex min-h-[90cqh] bg-background justify-center items-center">
        <PostTable posts={posts} />
      </main>
    </div>
  )
}
