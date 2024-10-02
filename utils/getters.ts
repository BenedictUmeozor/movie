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

export const getTvGenres = async (): Promise<{ genres: Genre[] }> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/genre/tv/list?api_key=${process.env.API_KEY}`,
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
    `${process.env.API_BASE_URL}/discover/tv?page=${page}&without_genres=10764,10763,99,10767&api_key=${process.env.API_KEY}`,
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

export const getTvArray = async (
  tvShowIds: number[],
): Promise<SingleTvShow[]> => {
  const promises = tvShowIds.map(async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tv/${id}?append_to_response=credits&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    );
    return response.json();
  });

  return Promise.all(promises);
};

export const getPopularTvs = async (
  page: number = 1,
): Promise<TvShowApiResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/tv/popular?page=${page}&without_genres=10764,10763,99,10767&api_key=${process.env.API_KEY}`,
  );

  return response.json();
};

export const getOnTheAirTvs = async (
  page: number = 1,
): Promise<TvShowApiResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/tv/on_the_air?page=${page}&without_genres=10764,10763,99,10767&api_key=${process.env.API_KEY}`,
  );

  return response.json();
};

export const getTopRatedTvs = async (
  page: number = 1,
): Promise<TvShowApiResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/tv/top_rated?page=${page}&without_genres=10764,10763,99,10767&api_key=${process.env.API_KEY}`,
  );

  return response.json();
};

export const getAiringTodayTvs = async (
  page: number = 1,
): Promise<TvShowApiResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/tv/airing_today?page=${page}&without_genres=10764,10763,99,10767&api_key=${process.env.API_KEY}`,
  );

  return response.json();
};

export const getSearchMovieResults = async ({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}): Promise<MovieResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/search/movie?query=${query}&page=${page}&api_key=${process.env.API_KEY}`,
  );

  return response.json();
};

export const getSearchTvResults = async ({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}): Promise<TvShowApiResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/search/tv?query=${query}&page=${page}&api_key=${process.env.API_KEY}`,
  );

  return response.json();
};
