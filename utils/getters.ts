import {
  Genre,
  MovieResponse,
  SingleMovie,
  SingleTvShow,
  TvShowApiResponse,
} from "@/types/globals";

export const getGenres = async (): Promise<{ genres: Genre[] }> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/genre/movie/list?api_key=${process.env.API_KEY}`,
  );
  return response.json();
};

export const getMovies = async (page: number = 1): Promise<MovieResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/discover/movie?page=${page}&api_key=${process.env.API_KEY}`,
  );
  return response.json();
};

export const getPopularMovies = async (
  page: number = 1,
): Promise<MovieResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/movie/popular?page=${page}&api_key=${process.env.API_KEY}`,
  );
  return response.json();
};

export const getNowPlayingMovies = async (
  page: number = 1,
): Promise<MovieResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/movie/now_playing?page=${page}&api_key=${process.env.API_KEY}`,
  );
  return response.json();
};

export const getTopRatedMovies = async (
  page: number = 1,
): Promise<MovieResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/movie/top_rated?page=${page}&api_key=${process.env.API_KEY}`,
  );
  return response.json();
};

export const getUpcomingMovies = async (
  page: number = 1,
): Promise<MovieResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/movie/upcoming?page=${page}&api_key=${process.env.API_KEY}`,
  );
  return response.json();
};

export const getTvShows = async (
  page: number = 1,
): Promise<TvShowApiResponse> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?page=${page}&api_key=${process.env.API_KEY}`,
  );

  return response.json();
};

export const getSingleMovie = async (id: number): Promise<SingleMovie> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/movie/${id}?append_to_response=credits&api_key=${process.env.API_KEY}`,
  );

  return response.json();
};

export const getSingleTvShow = async (id: number): Promise<SingleTvShow> => {
  const response = await fetch(`
${process.env.API_BASE_URL}/tv/${id}?append_to_response=credits&api_key=${process.env.API_KEY}
`);

  return response.json();
};

export const getMovieArray = async (
  movieIds: number[],
): Promise<SingleMovie[]> => {
  const promises = movieIds.map(async (id) => {
    const response = await fetch(
      `${process.env.API_BASE_URL}/movie/${id}?append_to_response=credits&api_key=${process.env.API_KEY}`,
    );
    return response.json();
  });

  return Promise.all(promises);
};
