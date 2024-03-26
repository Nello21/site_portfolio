import { patch, get } from 'services/transport';
import { addFavoriteMovieParams, deleteFavoriteMovieParams } from '../schemes/addFavoriteMovie';

export const addFavoriteMovieApi = {
  addFavoriteMovie: async (data: addFavoriteMovieParams) => {
    const response = await get(`/users/${data.user_id}`);
    const currentUser = response.data;

    const updatedFavoriteMovies = [...currentUser.favorite_movies, data.movieId];

    const patchResponse = await patch(`/users/${data.user_id}`, { favorite_movies: updatedFavoriteMovies });

    return patchResponse.data;
  },
};

export const deleteFavoriteMovieApi = {
  deleteFavoriteMovie: async (data: deleteFavoriteMovieParams) => {
    const response = await get(`/users/${data.user_id}`);
    const currentUser = response.data;

    const updatedFavoriteMovies = currentUser.favorite_movies.filter((movieId: number) => movieId !== data.movieId);

    const patchResponse = await patch(`/users/${data.user_id}`, { favorite_movies: updatedFavoriteMovies });

    return patchResponse.data;
  },
};
