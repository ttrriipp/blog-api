import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog"
import { Form } from "react-router"
import type { Post } from "~/types"

export default function DeletePostConfirmation({ post, open, setOpen }: { post: Post, open: boolean, setOpen: any }) {
  return (
    <AlertDialog key={post.id} open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {post.title}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you would like to do this?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Form action={`/posts/${post.id}/delete`} method="post">
            <AlertDialogAction type="submit">Delete</AlertDialogAction>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
