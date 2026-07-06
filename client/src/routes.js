import App from "./App";
import Home from "./features/home/HomePage";
import PostPage from "./features/post/PostPage";
import { loader as HomeLoader } from "./features/home/homeLoader";
import { loader as PostLoader } from "./features/post/postLoader";

export default [
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        loader: HomeLoader,
        Component: Home,
      },
      {
        loader: PostLoader,
        path: "/posts/:postId",
        Component: PostPage,
      },
    ],
  },
];
