import Post from "../components/Post";
import { useLoaderData } from "react-router";

function Home() {
  const { posts } = useLoaderData();
  return (
    <div className="max-h-screen min-h-[90cqh]">
      {(Array.isArray(posts) && posts.length === 0) && (
        <section className="h-[90cqh] w-full flex justify-center items-center">
          <p>It seems that Trip has not yet published any blogs. Come back later. Thanks!</p>
        </section>
      )}
      {posts.length > 0 && (
        <section className="grid grid-cols-4 p-4">
          {posts.map((post) => (
            <Post
              key={post.id}
              data={post}
            />
          ))}
        </section>
      )}
    </div>
  )
}

export default Home;
