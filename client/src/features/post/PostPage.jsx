import { Separator } from "@/components/ui/separator";
import { useLoaderData } from "react-router";

function PostPage() {
  const { post } = useLoaderData();
  const readableCreatedAt = new Date(post.createdAt).toDateString();
  return (
    <div className="flex justify-center p-8">
      <section>
        <article className="mx-auto max-w-2xl gap-4 flex flex-col">
          <header className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-primary-foreground">{post.title}</h2>
            <p className="text-sm text-muted-foreground">by {post.author.name} · {readableCreatedAt}</p>
          </header>
          <Separator />
          <div>
            <p>{post.content}</p>
          </div>

        </article>
      </section>
      <section>
        {/* comments */}
      </section>
    </div>
  )
}

export default PostPage
