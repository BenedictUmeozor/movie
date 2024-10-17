import { Movie as MovieInterface, TvShow } from "@/types/globals";
import Movie from "../ui/movie";
import TVShow from "../ui/tvshow";

export const RenderMovies = ({ movies }: { movies: MovieInterface[] }) => {
  return (
    <div className="grid grid-cols-2 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export const RenderTvShows = ({ tvShows }: { tvShows: TvShow[] }) => {
  return (
    <div className="grid grid-cols-2 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
      {tvShows.map((tvShow) => (
        <TVShow key={tvShow.id} tvShow={tvShow} />
      ))}
    </div>
  );
};
