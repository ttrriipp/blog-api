import { redirect, data } from "react-router";

export const guestMiddleware = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (token) {
      console.log("you are authenticated");
      return redirect("/");
    }
  } catch (error) {
    console.error(error);
    throw data(null, error);
  }
};
