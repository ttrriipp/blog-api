import App from "./App";
import HomePage from "./features/home/HomePage";
import PostPage from "./features/post/PostPage";
import { loader as HomeLoader } from "./features/home/homeLoader";
import { loader as PostLoader } from "./features/post/postLoader";
import { action as RegisterAction } from "./features/auth/registerAction";
import RegisterPage from "./features/auth/RegisterPage";
import RootErrorBoundary from "./RootErrorBoundary";

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
        path: "/posts/:postId",
        loader: PostLoader,
        Component: PostPage,
      },
    ],
  },
  {
    path: "/register",
    Component: RegisterPage,
    action: RegisterAction,
    ErrorBoundary: RootErrorBoundary,
  },
];
