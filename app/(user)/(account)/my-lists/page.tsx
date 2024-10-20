import CreateList from "@/components/account/my-lists/create";
import Lists from "@/components/account/my-lists/lists";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Lists - Movie Empire",
};

export default function Page() {
  return (
    <main>
      <Container className="space-y-8">
        <CreateList />
        <Separator />
        <Suspense fallback={<ListSkeleton />}>
          <Lists />
        </Suspense>
      </Container>
    </main>
  );
}

const ListSkeleton = () => {
  return (
    <div className="space-y-8">
      <Skeleton className="h-8 w-44" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-52 w-full" />
        ))}
      </div>
    </div>
  );
};
