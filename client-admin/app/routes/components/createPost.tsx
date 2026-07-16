import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Field, FieldGroup } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Plus } from "lucide-react"
import { useFetcher } from "react-router"
import { useState } from "react"

export default function CreatePost() {
  let fetcher = useFetcher();
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <fetcher.Form id="createPost" method="post" action="/posts/create" onSubmit={() => setOpen(!open)}>
        <DialogTrigger render={
          <Button variant="outline">
            <Plus /> Create Post
          </Button>
        } />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field >
              <Label htmlFor="title-1">Title<span className="text-red-600">*</span></Label>
              <Input id="title-1" name="title" form="createPost" required />
            </Field>
            <Field>
              <Label htmlFor="content-1">Content</Label>
              <Textarea id="content-1" name="content" form="createPost" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" form="createPost">Create</Button>
          </DialogFooter>
        </DialogContent>
      </fetcher.Form>
    </Dialog>
  )
}
