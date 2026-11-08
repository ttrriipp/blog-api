import {
  TableCell,
  TableRow,
} from "~/components/ui/table"
import type { Post } from "~/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { MoreHorizontalIcon } from "lucide-react"
import { useState } from "react"
import { useFetcher, useHref, useLinkClickHandler } from "react-router";
import DeletePostConfirmation from "./deletePostConfirmation"

export default function PostTableRow({ post }: { post: Post }) {
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  let fetcher = useFetcher();

  const href = useHref(`/posts/${post.id}/edit`);

  const handleRowClick = useLinkClickHandler(href);

  return (
    <>
      <DeletePostConfirmation post={post} open={openDeleteConfirmation} setOpen={setOpenDeleteConfirmation} />
      <TableRow key={post.id} className="hover:cursor-pointer" onClick={(e: any) => {
        handleRowClick(e)
      }}>
        <TableCell className="font-medium">{post.id}</TableCell>
        <TableCell>{post.title}</TableCell>
        <TableCell className="max-w-50 truncate">{post.content === "" ? "-" : post.content}</TableCell>
        <TableCell>{post.author.name}</TableCell>
        <TableCell>
          {post.published ?
            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
              Published
            </Badge>
            :
            <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Draft
            </Badge>
          }
        </TableCell>
        <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
        <TableCell>
          <DropdownMenu >
            <DropdownMenuTrigger render={
              <Button variant="ghost" size="icon" className="size-8" onClick={(e) => {
                e.stopPropagation();
              }}><MoreHorizontalIcon /><span className="sr-only">Open menu</span></Button>
            } />
            <DropdownMenuContent align="end" className="p-2" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem onClick={(e: any) => {
                handleRowClick(e)
              }}>
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
                  { action: `/posts/${post.id}/edit`, method: "post" })
              }}>
                {post.published ? "Unpublish" : "Publish"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => { setOpenDeleteConfirmation(true); }}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow >
    </>
  )
}
