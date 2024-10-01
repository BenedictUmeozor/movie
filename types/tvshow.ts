export namespace TVShowController {
  export interface Show {
    _id: string;
    air_date: string;
    episodes: Episode[];
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
    credits: {
      cast: Cast[];
    };
  }

  interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }

  export interface Episode {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    crew: CrewMember[];
    guest_stars: GuestStar[];
  }

  export interface CrewMember {
    job: string;
    department: string;
    credit_id: string;
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
  }

  export interface GuestStar {
    character: string;
    credit_id: string;
    order: number;
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
  }

  export interface SingleEpisode {
    air_date: string;
    crew: CrewMember[];
    episode_number: number;
    guest_stars: GuestStar[];
    id: number;
    name: string;
    production_code: string;
    runtime: number;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    overview: string;
    credits: {
      cast: Cast[];
    };
  }
}
