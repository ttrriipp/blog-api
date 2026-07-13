import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { useState } from "react";
import { Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import apiClient from "~/lib/api";

export async function clientAction({
  request,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  const { data: login } = await apiClient.post("/auth/login", user);
  localStorage.setItem("access_token", login.token)
  return redirect("/");
}

export async function clientLoader() {
  const token = localStorage.getItem("access_token")
  if (token) {
    throw redirect("/")
  }
  return null
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          {/* <Link to="/auth/register"> */}
          {/*   <Button variant="link">Sign Up</Button> */}
          {/* </Link> */}
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form id="loginForm" method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
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
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="loginForm" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}
