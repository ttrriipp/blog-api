import { Outlet } from "react-router"

function AuthLayout() {
  return (
    <div className="flex justify-center items-center max-h-screen min-h-[90cqh]">
      <Outlet />
    </div>
  )
}

export default AuthLayout 
