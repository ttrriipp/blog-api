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
import { NavLink, Form } from "react-router";

function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    setName("")
    setUsername("")
    setPassword("")
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register account</CardTitle>
        <CardDescription>
          Let's set your account up!
        </CardDescription>
        <CardAction>
          <NavLink to="/login">
            <Button variant="link">Log in</Button>
          </NavLink>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form id="registerForm" method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
        <Button type="submit" form="registerForm" className="w-full">
          Register
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RegisterPage
