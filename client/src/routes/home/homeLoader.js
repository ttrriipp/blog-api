import apiClient from "@/lib/api";

export async function loader() {
  const response = await apiClient.get(`/posts`);
  return { posts: response.data };
}
