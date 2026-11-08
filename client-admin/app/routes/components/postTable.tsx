import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import type { PostTableProps, Post } from "~/types"
import PostTableRow from "./postTableRow"

export default function PostTable({ posts }: PostTableProps) {
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

          {(Array.isArray(posts) && posts.length !== 0) && posts.map((post: Post, i: number) => (
            <PostTableRow post={post} key={i} />
          ))}
        </TableBody>
      </Table>
    </div >

  )
}
