import { cinemaData } from 'shared/types/cinemaData';

export type addFavoriteMoviePayload = {
  movieId: number;
};

export type addFavoriteMovieParams = addFavoriteMoviePayload & {
  user_id: number;
};

export type deleteFavoriteMoviePayload = {
  movieId: number;
};

export type deleteFavoriteMovieParams = deleteFavoriteMoviePayload & {
  user_id: number;
};
