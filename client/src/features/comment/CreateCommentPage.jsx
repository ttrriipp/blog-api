import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Form, Link } from "react-router"
import { useState } from "react"

export function CreateCommentPage() {
  const [comment, setComment] = useState("");

  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <Form method="post">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Create Comment</FieldLegend>
              <FieldDescription>
                What do you say about the post?
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="comments">
                    Comments
                  </FieldLabel>
                  <Textarea
                    id="comments"
                    placeholder="Add any comments"
                    name="content"
                    value={comment}
                    required
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button type="submit">Submit</Button>
              <Link to={-1}>
                <Button variant="outline" type="button" >
                  Cancel
                </Button>
              </Link>
            </Field>
          </FieldGroup>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CreateCommentPage
