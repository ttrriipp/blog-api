import apiClient from "@/api";

export async function loader() {
  try {
    const response = await apiClient.get("/posts");
    console.log(response.data);
    return { posts: response.data };
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Request completed");
  }
}
