import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("logout", "routes/auth/logout.tsx")
  ]),
  ...prefix("posts", [
    route("create", "routes/posts/create.tsx")
  ])
] satisfies RouteConfig;
