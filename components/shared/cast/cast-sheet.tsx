import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Cast } from "@/types/globals";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const CastSheet = ({ cast, title }: { cast: Cast[]; title?: string }) => {
  const trimmed = cast.filter((person) => !!person.profile_path);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center gap-2 tracking-normal text-primary-blue hover:bg-transparent hover:text-primary-blue"
        >
          View all <ChevronRight size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className={cn("grid grid-rows-[auto_1fr] bg-black ring-offset-black")}
      >
        <SheetHeader>
          <SheetTitle className="text-white">Cast</SheetTitle>
          <SheetDescription>
            {title ? `Full cast for ${title}` : "Full cast"}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea>
          <div className="space-y-6 text-white">
            {trimmed.map((person) => (
              <div key={person.id} className="flex items-center gap-4">
                <div className="w-12 md:w-16 lg:w-20">
                  <Image
                    src={process.env.IMG_URL + person.profile_path}
                    alt={person.name}
                    height={112}
                    width={112}
                    className="aspect-[4/6] w-full rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1 text-left text-sm">
                  <p>{person.name}</p>
                  <p className="text-medium-white">{person.character}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
export default CastSheet;
