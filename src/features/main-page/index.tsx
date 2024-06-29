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
import { Loader } from 'shared/components/Loader/loader';
import { Slider } from 'pages/Slider';
import { Carousel3d } from 'pages/Carousel3d';

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

  if (isLoading) return <Loader />;
  if (!(movies && serials)) return <div>Нет данных</div>;

  return (
    <div className={styles.container}>
      {/* {hitOfTheWeek && (
        <div className={styles.hitPoster}>
          <h2 style={{ fontSize: '32px' }}>Хит недели</h2>
          <Link to={`${ROUTES.root}${hitOfTheWeek.id}`}>
            <img src={hitOfTheWeek.image} className={styles.hitImage} />
          </Link>
          <div className={styles.rating}>{hitOfTheWeek.rating}</div>
        </div>
      )} */}
      <div className={styles.content}>
        <div>
          <Carousel3d cards={movies} />
        </div>

        <h2 className={styles.movieHeader}>Фильмы</h2>

        <Slider cards={movies} />

        <h2 className={styles.serialsHeader}>Сериалы</h2>

        <Slider cards={movies} />
        <h2 className={styles.serialsHeader}>Сериалы</h2>

        <Slider cards={movies} />
        <h2 className={styles.serialsHeader}>Сериалы</h2>

        <Slider cards={movies} />
      </div>
    </div>
  );
};
