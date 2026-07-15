import { NavLink } from "react-router"
import type { NavBarProps } from "~/types"
import { Button } from "~/components/ui/button"

export default function NavBar({ user }: NavBarProps) {
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
          <Button>Logout</Button>
        </div>
      )}

    </div >
  )

}
