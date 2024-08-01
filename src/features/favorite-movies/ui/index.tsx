import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { fetchUser } from 'features/auth/model/store/effects';
import { getAllCinema } from 'store/cinema/slice';
import { getUserFavoriteMovies } from 'features/auth/model/store/userProfileSlice';
import { getCinema } from 'store/cinema/effects';
import styles from './favorites.module.css';
import { CinemaOneCard } from 'shared/features/CinemaCards/ui/CinemaCard';

export const FavoriteMovies = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const favoriteMovieId = useSelector(getUserFavoriteMovies);
  const movies = useSelector(getAllCinema);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
      dispatch(getCinema());
    }
  }, [dispatch, id]);

  if (!favoriteMovieId)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', fontSize: '25px', padding: '20px 0' }}>
        Вы еще не добавляли в избранное
      </div>
    );
  const favoriteMovies = movies.filter(movie => favoriteMovieId.includes(movie.id));

  return (
    <div className={styles.favoriteMoviesContainer}>
      <h2>Избранные фильмы</h2>
      <ul
        className={styles.favoriteMoviesList}
        style={favoriteMovieId.length === 1 ? { display: 'flex', width: 'min(100%,1000px)' } : {}}
      >
        {favoriteMovies.map(movie => (
          <li key={movie.id} className={styles.favoriteMovieItem}>
            <CinemaOneCard card={movie} className={styles.movieImage} />
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
