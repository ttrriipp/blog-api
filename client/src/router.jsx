import Root from "./routes/Root";
import Home from "./routes/home/Home";
import Post from "./routes/post/Post";
import { loader as homeLoader } from "./routes/home/homeLoader";
import { loader as postLoader } from "./routes/post/postLoader";
import { loader as rootLoader } from "./routes/Root";
import { action as registerAction } from "./routes/auth/registerAction";
import { action as loginAction } from "./routes/auth/loginAction";
import { action as createCommentAction } from "./routes/comment/createCommentAction";
import Register from "./routes/auth/Register";
import RootErrorBoundary from "./RootErrorBoundary";
import CreateComment from "./routes/comment/CreateComment";
import { authMiddleware } from "./middleware/auth";
import { UserContext } from "./context";
import Login from "./routes/auth/Login";
import { guestMiddleware } from "./middleware/guest";
import { createBrowserRouter } from "react-router"
import AuthLayout from "./routes/Auth";

const routes = [
  {
    path: "/",
    Component: Root,
    loader: rootLoader,
    children: [
      {
        index: true,
        Component: Home,
        loader: homeLoader,
      },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          {
            path: "register",
            Component: Register,
            action: registerAction,
            middleware: [guestMiddleware],
            ErrorBoundary: RootErrorBoundary,
          },
          {
            path: "login",
            Component: Login,
            action: loginAction,
            middleware: [guestMiddleware],
            ErrorBoundary: RootErrorBoundary,
          },
        ]

      },
      {
        path: "posts/:postId",
        Component: Post,
        loader: postLoader,
      },
      {
        path: "posts/:postId/comments/create",
        loader: async ({ context }) => {
          const user = context.get(UserContext);
          return { user };
        },
        Component: CreateComment,
        middleware: [authMiddleware],
        action: createCommentAction,
        ErrorBoundary: RootErrorBoundary,
      },
    ],
  },
];

const router = createBrowserRouter(routes)

export default router;
