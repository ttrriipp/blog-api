import Post from "../components/Post";
import { useLoaderData } from "react-router";

function Home() {
  const { posts } = useLoaderData();
  return (
    <div>
      <section className="grid grid-cols-4 p-4">
        {posts.map((post) => (
          <Post
            key={post.id}
            data={post}
          />
        ))}
      </section>
    </div>
  )
}

export default Home;
