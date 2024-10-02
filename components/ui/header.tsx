import Link from "next/link";
import Container from "./container";
import { Button } from "./button";
import { ChevronDown, Menu, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "./search-bar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-dark-gray">
      <Container className="flex items-center py-4">
        <Link
          href="/"
          className="flex flex-1 items-center gap-2 text-2xl font-bold leading-normal tracking-wide"
        >
          <Video size={28} fill="#1475E6" stroke="#1475E6" />
          <span className="max-lg:hidden">Movie Empire</span>
        </Link>
        <div className="flex-[2] max-md:flex-[3]">
          <SearchBar />
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button
            variant={"ghost"}
            className="flex items-center gap-2 max-md:hidden"
          >
            Genres <ChevronDown size={16} />
          </Button>
          <Avatar className="max-md:hidden">
            <AvatarImage src="" />
            <AvatarFallback className="text-black">BU</AvatarFallback>
          </Avatar>
          <Button variant={"ghost"} size={"icon"} className="md:hidden">
            <Menu size={24} />
          </Button>
        </div>
      </Container>
    </header>
  );
};
export default Header;
