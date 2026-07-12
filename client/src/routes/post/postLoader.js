import apiClient from "@/lib/api";

export async function loader({ params }) {
  const response = await apiClient.get(`/posts/${params.postId}`);
  return { post: response.data };
}
