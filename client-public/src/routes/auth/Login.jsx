import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { Link, useFetcher } from "react-router";

export async function loader() {
  return null
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let fetcher = useFetcher();
  let busy = fetcher.state !== "idle";
  let errors = fetcher.data?.errors;

  const handleSubmit = () => {
    setUsername("")
    setPassword("")
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Log in </CardTitle>
        <CardDescription>
          Log in your account!
        </CardDescription>
        <CardAction>
          <Link to="/register">
            <Button variant="link">Create Account</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <fetcher.Form id="loginForm" method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">

            {errors && (
              <div
                role="alert"
                className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
              >
                <ul>
                  {errors.map((error, i) => (
                    <li key={i}>{error.msg}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
          </div>
        </fetcher.Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="loginForm" className="w-full">
          {busy ? "Logging in..." : "Login"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Login
