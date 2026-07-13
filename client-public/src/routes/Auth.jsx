import { Outlet } from "react-router"

function AuthLayout() {
  return (
    <div className="flex justify-center items-center max-h-screen min-h-[95cqh]">
      <Outlet />
    </div>
  )
}

export default AuthLayout 
