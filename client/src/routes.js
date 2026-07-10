import App from "./App";
import HomePage from "./features/home/HomePage";
import PostPage from "./features/post/PostPage";
import { loader as HomeLoader } from "./features/home/homeLoader";
import { loader as PostLoader } from "./features/post/postLoader";
import { action as RegisterAction } from "./features/auth/registerAction";
import { action as LoginAction } from "./features/auth/loginAction";
import { action as CreateCommentAction } from "./features/comment/createCommentAction";
import RegisterPage from "./features/auth/RegisterPage";
import RootErrorBoundary from "./RootErrorBoundary";
import CreateCommentPage from "./features/comment/CreateCommentPage";
import { authMiddleware } from "./middleware/auth";
import { UserContext } from "./context";
import LoginPage from "./features/auth/LoginPage";

export default [
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        loader: HomeLoader,
        Component: HomePage,
      },
      {
        path: "posts/:postId",
        loader: PostLoader,
        Component: PostPage,
      },
      {
        path: "posts/:postId/comments/create",
        loader: async ({ context }) => {
          const user = context.get(UserContext);
          return { user };
        },
        middleware: [authMiddleware],
        action: CreateCommentAction,
        Component: CreateCommentPage,
        ErrorBoundary: RootErrorBoundary,
      },
    ],
  },
  {
    path: "/register",
    Component: RegisterPage,
    action: RegisterAction,
    ErrorBoundary: RootErrorBoundary,
  },
  {
    path: "/login",
    Component: LoginPage,
    action: LoginAction,
    ErrorBoundary: RootErrorBoundary,
  },
];
