import apiClient from "@/lib/api";

export async function loader() {
  const response = await apiClient.get("/posts");
  console.log(response.data);
  return { posts: response.data };
}
