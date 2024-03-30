import React, { useEffect } from 'react';
import { CinemaCards } from 'shared/features/CinemaCards/ui';
import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { getHitOfTheWeek, getSerials, getMovies, getCinemaIsLoading, clearCinemaStore } from 'store/cinema/slice';
import { getCinema } from 'store/cinema/effects';
import styles from './mainPage.module.css';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { fetchUser } from 'features/auth/model/store/effects';
import { getAuthUserId } from 'features/auth/model/store/slice';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const movies = useSelector(getMovies);
  const serials = useSelector(getSerials);
  const hitOfTheWeek = useSelector(getHitOfTheWeek);
  const userId = useSelector(getAuthUserId);
  const isLoading = useSelector(getCinemaIsLoading);

  useEffect(() => {
    dispatch(getCinema());
    dispatch(fetchUser(String(userId)));
    return () => {
      dispatch(clearCinemaStore());
    };
  }, [dispatch, userId]);

  if (isLoading) return <div>Загрузка...</div>;
  if (!(movies && serials)) return <div>Нет данных</div>;

  return (
    <div className={styles.container}>
      {hitOfTheWeek && (
        <div className={styles.hitContainer}>
          <div className={styles.hitPoster}>
            <h2 style={{ fontSize: '32px' }}>Хит недели</h2>
            <Link to={`${ROUTES.root}${hitOfTheWeek.id}`}>
              <img src={hitOfTheWeek.image} className={styles.hitImage} />
            </Link>
            <div className={styles.rating}>{hitOfTheWeek.rating}</div>
          </div>
        </div>
      )}

      <div className={styles.moviesCards}>
        <h2>Фильмы</h2>
        <CinemaCards cards={movies} />
      </div>

      <div className={styles.moviesCards}>
        <h2>Сериалы</h2>
        <CinemaCards cards={serials} />
      </div>
    </div>
  );
};
