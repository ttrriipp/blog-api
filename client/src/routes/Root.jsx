import { Outlet, useLoaderData } from "react-router"
import Header from "../components/Header"
import { UserContext } from "@/context";
import apiClient from "@/lib/api";
import { data } from "react-router";

export async function loader() {
  const token = localStorage.getItem("access_token");

  if (!token) return null;

  // there is token means that the user is supposed to be authenticated
  try {
    const { data: user } = await apiClient.get("/auth/me");
    return user;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw data(error.response.data, error.response);
  }
}

function Root() {
  const user = useLoaderData();

  return (
    <UserContext value={{ user }}>
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
