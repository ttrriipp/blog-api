import { redirect } from "react-router";

export const guestMiddleware = async () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    throw redirect("/");
  }
};
