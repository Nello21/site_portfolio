import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { fetchUser } from 'features/auth/model/store/effects';
import { getAllCinema } from 'store/cinema/slice';
import { userActions } from 'features/auth/model/store/slice';
import { getUserFavoriteMovies } from 'features/auth/model/store/userProfileSlice';
import { getCinema } from 'store/cinema/effects';
import styles from './favorites.module.css';
import { CinemaOneCard } from 'shared/features/CinemaCards/ui/CinemaCard';

export const FavoriteMovies = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const favoriteMovieId = useSelector(getUserFavoriteMovies);
  console.log(favoriteMovieId);
  const movies = useSelector(getAllCinema);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
      dispatch(getCinema());
    }
  }, [dispatch, id]);

  const favoriteMovies = movies.filter(movie => favoriteMovieId.includes(movie.id));

  console.log(favoriteMovies);

  return (
    <div className={styles.favoriteMoviesContainer}>
      <h2>Избранные фильмы пользователя</h2>
      <ul className={styles.favoriteMoviesList}>
        {favoriteMovies.map(movie => (
          <li key={movie.id} className={styles.favoriteMovieItem}>
            <CinemaOneCard post={movie} className={styles.movieImage} />
            <div className={styles.movieInfo}>
              <h3 className={styles.movieTitle}>{movie.name}</h3>
              <p className={styles.movieDescription}>{movie.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
