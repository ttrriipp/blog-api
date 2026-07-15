import { redirect } from "react-router"
import type { Route } from "./+types/logout"
import { userContext } from "~/context"

export async function clientAction({ context }: Route.ClientActionArgs) {
  const token = localStorage.getItem("access_token")

  if (!token) {
    throw redirect("/login")
  }

  localStorage.removeItem("access_token")
  context.set(userContext, null);

  return redirect("/login")
}

export default function Logout() {
  return null
}
