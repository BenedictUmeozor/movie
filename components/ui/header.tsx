import Link from "next/link";
import Container from "./container";
import { Button } from "./button";
import { Video } from "lucide-react";
import SearchBar from "./search-bar";
import AccountDropdown from "./account-dropdown";
import { validateRequest } from "@/lib/auth";
import GenreSheet from "./genre-sheet";
import { Suspense } from "react";
import { getGenres, getTvGenres } from "@/utils/getters";
import { TailwindSpinner } from "./spinner";
import MobileMenu from "./mobile-menu";

const Header = async () => {
  const { session } = await validateRequest();

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
        <div className="flex-[2] max-lg:flex-[3]">
          <SearchBar />
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="flex items-center max-lg:hidden">
            <Suspense fallback={<TailwindSpinner />}>
              <GenreProvider />
            </Suspense>
            <Button variant={"ghost"} className="max-lg:hidden" asChild>
              <Link href="/lists" className="max-lg:hidden">
                Lists
              </Link>
            </Button>
          </div>
          {!!session ? (
            <AccountDropdown />
          ) : (
            <Link
              href="/sign-in"
              className="hidden h-9 items-center justify-center rounded bg-primary-blue px-4 text-white hover:bg-blue-900 lg:inline-flex"
            >
              Sign in
            </Link>
          )}

          <div className="flex lg:hidden">
            <GenreProvider />
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
};

const GenreProvider = async () => {
  const movieGenres = await getGenres();
  const tvShowGenres = await getTvGenres();

  return (
    <GenreSheet
      movieGenres={movieGenres.genres}
      tvShowGenres={tvShowGenres.genres}
    />
  );
};

export default Header;
