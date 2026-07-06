import App from "./App";
import Home from "./features/HomePage";
import { loader as HomeLoader } from "./features/homeLoader";

export default [
  {
    path: "/",
    loader: HomeLoader,
    Component: App,
    children: [{ index: true, Component: Home }],
  },
];
