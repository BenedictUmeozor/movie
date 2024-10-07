"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import EditList from "./edit";
// import { Separator } from "@/components/ui/separator";

const ListPage = () => {
  return (
    <div className="mt-12 space-y-8">
      <Link
        href="/my-lists"
        className="inline-flex items-center gap-1 text-primary-blue"
      >
        <ChevronLeft size={20} /> My Lists
      </Link>
      <header className="flex items-center justify-between">
        <h2 className="text-4xl font-bold max-lg:text-3xl max-md:text-2xl">
          List &quot;Creepy films&quot;
        </h2>
        <EditList />
      </header>
      <p className="text-medium-white">
        Movies you shouldn&apos;t watch at night...
      </p>
      {/* <Separator /> */}
    </div>
  );
};
export default ListPage;
