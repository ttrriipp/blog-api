import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
    </div>
  )
}
