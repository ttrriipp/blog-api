import { redirect, data } from "react-router";

export const guestMiddleware = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (token) {
      console.log("you are authenticated");
      throw redirect("/", {
        status: 403,
        statusText: "forbidden, you are authenticated",
      });
    }
  } catch (error) {
    console.error(error);
    if (error.response) {
      throw data(error.response.data, error.response);
    }
    throw data(null, error);
  }
};
