import App from "./App";
import Home from "./features/HomePage";
import { loader as HomeLoader } from "./features/homeLoader";

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
    ],
  },
];
