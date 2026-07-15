import { NavLink } from "react-router"
import type { NavBarProps } from "~/types"
import { Button } from "~/components/ui/button"
import LogoutAlert from "./logoutAlert"

export default function NavBar({ user }: NavBarProps) {
  return (
    <div className="flex justify-between p-4 bg-sidebar min-h-[5cqh]">
      <div>
        <a href="/" className="text-4xl font-extrabold text-sidebar-foreground">BS Blog</a>
      </div>

      <div className="flex gap-2">
        <LogoutAlert />
      </div>

    </div >
  )

}
