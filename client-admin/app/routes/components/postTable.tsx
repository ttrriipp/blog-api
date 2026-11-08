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
import EditPostForm from "./editPostForm"
import { useState } from "react"
import { useFetcher } from "react-router";
import DeletePostConfirmation from "./deletePostConfirmation"
import PostTableRow from "./postTableRow"

export default function PostTable({ posts }: PostTableProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post>(posts[0])
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  let fetcher = useFetcher();
  return (
    <div className="rounded-md border">

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

          {(Array.isArray(posts) && posts.length !== 0) && posts.map((post: Post) => (
            <PostTableRow post={post} />
          ))}
        </TableBody>
      </Table>
    </div >

  )
}
