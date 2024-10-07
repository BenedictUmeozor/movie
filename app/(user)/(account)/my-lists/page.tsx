import CreateList from "@/components/account/my-lists/create";
import Lists from "@/components/account/my-lists/lists";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <main>
      <Container className="space-y-8">
        <CreateList />
        <Separator />
        <Lists />
      </Container>
    </main>
  );
}
