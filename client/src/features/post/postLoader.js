import apiClient from "@/api";

export async function loader({ params }) {
  try {
    const response = await apiClient.get(`/posts/${params.postId}`);
    console.log(response.data);
    return { post: response.data };
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Request completed");
  }
}
