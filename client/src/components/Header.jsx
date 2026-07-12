import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context";
import { useContext } from "react";

function Header() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    setUser(null)
  }

  return (
    <div className="flex justify-between p-4 bg-sidebar min-h-[5cqh]">
      <div>
        <a href="/" className="text-4xl font-extrabold text-sidebar-foreground">BS Blog</a>
      </div>

      {!user && (
        <div className="flex gap-2">
          <NavLink to={'/auth/register'}>
            <Button>Register</Button>
          </NavLink>
          <NavLink to={'/auth/login'}>
            <Button>Log in</Button>
          </NavLink>
        </div>
      )
      }
      {user && (
        <div className="flex gap-2">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )
      }

    </div >
  )
}

export default Header
