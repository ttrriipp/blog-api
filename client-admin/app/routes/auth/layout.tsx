import { Outlet } from "react-router"

export default function Layout() {
  return <div className="flex justify-center items-center max-h-screen min-h-screen">
    <Outlet />
  </div>
}
