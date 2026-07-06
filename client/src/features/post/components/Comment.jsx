import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"

function Comment({ data }) {
  const readableCreatedAt = new Date(data.createdAt).toLocaleDateString();

  return (
    <Item variant="outline">
      <ItemContent>
        <div className="flex gap-2">
          <ItemTitle>{data.commenter.name}</ItemTitle>
          <p>·</p>
          <p className="text-muted-foreground">{readableCreatedAt}</p>
        </div>
        <ItemDescription>{data.content}</ItemDescription>
      </ItemContent>
    </Item>
  )
}

export default Comment;
