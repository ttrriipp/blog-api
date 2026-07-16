import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Field, FieldGroup } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { useFetcher } from "react-router"
import type { Post } from "~/types"

export default function EditPost({ post, open, setOpen }: { post: Post | null, open: boolean, setOpen: any }) {
  let fetcher = useFetcher();
  return (
    <Dialog key={post.id} open={open} onOpenChange={setOpen}>
      <fetcher.Form id="editPost" method="post" action={`/posts/${post.id}/update`} onSubmit={() => setOpen(!open)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field >
              <Label htmlFor="title-1">Title<span className="text-red-600">*</span></Label>
              <Input id="title-1" name="title" form="editPost" defaultValue={post.title} required />
            </Field>
            <Field>
              <Label htmlFor="content-1">Content</Label>
              <Textarea id="content-1" name="content" form="editPost" defaultValue={post.content} />
            </Field>
          </FieldGroup>
          <input type="hidden" name="id" value={post.id} form="editPost" />
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" form="editPost">Update</Button>
          </DialogFooter>
        </DialogContent>
      </fetcher.Form>
    </Dialog>
  )
}
