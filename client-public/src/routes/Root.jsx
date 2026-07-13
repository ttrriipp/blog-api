import { Outlet, useLoaderData } from "react-router"
import Header from "../components/Header"
import { UserContext } from "@/context";
import apiClient from "@/lib/api";
import { data } from "react-router";
import { useState } from "react";

export async function loader() {
  const token = localStorage.getItem("access_token");

  if (!token) return null;

  try {
    const { data: user } = await apiClient.get("/auth/me");
    return user;
  } catch (error) {
    console.error("Fetch Error:", error);

    if (error.status === 401) {
      localStorage.removeItem("access_token")
      return null;
    }

    throw data(error.response.data, error.response);

  }
}

function Root() {
  const loadedUser = useLoaderData();
  const [user, setUser] = useState(loadedUser);

  return (
    <UserContext value={{ user, setUser }}>
      <div className="@container min-h-screen">
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </UserContext>
  )
}



export default Root 
