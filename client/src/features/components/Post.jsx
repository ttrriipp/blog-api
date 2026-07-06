import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Post({ data }) {
  const readableDate = new Date(data.createdAt).toLocaleString();
  function handleClick() {

  }

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>by {data.author.name} - {readableDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="truncate">{data.content}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Read More</Button>
      </CardFooter>
    </Card>

  );
}

export default Post;
