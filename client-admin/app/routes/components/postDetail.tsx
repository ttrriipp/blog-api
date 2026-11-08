import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import type { Post } from "~/types"
import { Form, Link } from "react-router";
import { useState } from "react"

export function PostDetail({ post }: { post: Post }) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Post Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form id="editPost" action={`/posts/${post.id}/edit`} method="post">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="content">Content</Label>
              </div>
              <Input
                id="content"
                name="content"
                value={content}
                onChange={(e) => { setContent(e.target.value) }}
              />
            </div>
            <Input
              id="id"
              name="id"
              value={post.id}
              hidden
            />

          </div>
        </Form>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button type="submit" form="editPost">
          Save Changes
        </Button>
        <Link to="/">
          <Button variant="outline" >
            Cancel
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

