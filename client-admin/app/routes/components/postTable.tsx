import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import type { PostTableProps, Post } from "~/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { MoreHorizontalIcon } from "lucide-react"
import EditPost from "./editPost"
import { useState } from "react"
import { useFetcher } from "react-router";

export default function PostTable({ posts }: PostTableProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post>(posts[0])
  let fetcher = useFetcher();
  return (
    <div className="rounded-md border">
      <EditPost post={selectedPost} open={openEdit} setOpen={setOpenEdit} />
      <Table className="mx-auto w-50 h-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Post ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="">Content</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post: Post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell className="max-w-50 truncate">{post.content === "" ? "-" : post.content}</TableCell>
              <TableCell>{post.author.name}</TableCell>
              <TableCell>{post.published ? "Published" : "Draft"}</TableCell>
              <TableCell>{new Date(post.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(post.updatedAt).toLocaleString()}</TableCell>
              <TableCell>
                <EditPost post={selectedPost} open={openEdit} setOpen={setOpenEdit} />
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8"><MoreHorizontalIcon /><span className="sr-only">Open menu</span></Button>} />
                  <DropdownMenuContent align="end" className="p-2">
                    <DropdownMenuItem onClick={() => { setOpenEdit(true); setSelectedPost(post) }}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      fetcher.submit(
                        {
                          id: post.id,
                          title: post.title,
                          content: post.content,
                          published: !post.published
                        },
                        { action: `/posts/${post.id}/update`, method: "post" })
                    }}>
                      {post.published ? "Unpublish" : "Publish"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => {
                      fetcher.submit(
                        {},
                        { action: `/posts/${post.id}/delete`, method: "post" })
                    }}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  )
}
