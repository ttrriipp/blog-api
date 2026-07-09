import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <div className="flex justify-between p-4 bg-sidebar">
      <div>
        <a href="/" className="text-4xl font-extrabold text-sidebar-foreground">BS Blog</a>
      </div>
      <div className="flex gap-2">
        <NavLink to={'/register'}>
          <Button>Register</Button>
        </NavLink>
        <NavLink to={'/login'}>
          <Button>Log in</Button>
        </NavLink>
      </div>
    </div >
  )
}

export default Header
