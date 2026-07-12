import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useLoaderData, Outlet, Link } from "react-router";
import Comment from "./components/Comment";

function Post() {
  const { post } = useLoaderData();
  const readableCreatedAt = new Date(post.createdAt).toDateString();
  return (
    <div className="flex justify-center p-8 flex-col gap-8">
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
        <Card className="flex flex-col gap-4 mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>
              Comments
            </CardTitle>
            <CardAction>
              <Link to="comments/create">
                <Button>Create Comment</Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {post.comments.map((comment) => (
              <Comment data={comment} key={comment.id} />
            ))}
          </CardContent>
        </Card>
      </section>
      <Outlet />
    </div>
  )
}

export default Post
