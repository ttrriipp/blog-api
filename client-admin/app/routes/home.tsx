import { redirect, useOutletContext, useRouteLoaderData } from "react-router";
import type { User } from "~/types";

export async function clientLoader() {
  const token = localStorage.getItem("access_token")
  if (!token) {
    throw redirect("/login")
  }
  return null
}

export default function Home() {
  const { user } = useOutletContext<{ user: User | null }>()
  return (
    <>
      <p>home</p>
    </>
  );
}
