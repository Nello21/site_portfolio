import { useEffect } from 'react';
import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { getCinemaIsLoading, clearCinemaStore, getAllCinema } from 'store/cinema/slice';
import { getCinema } from 'store/cinema/effects';
import { fetchUser } from 'features/auth/model/store/effects';
import { getAuthUserId } from 'features/auth/model/store/slice';
import { Loader } from 'shared/components/Loader/loader';
import { findHitOfTheWeek, findTopRatedLastMonth } from 'store/cinema/filters';
import styles from './online-cinema.module.css';
import { Slider } from 'features/slider';

export const OnlineCinema = () => {
  const dispatch = useAppDispatch();
  const allCinema = useSelector(getAllCinema);
  const serials = allCinema.filter(item => item.type === 'Сериал');
  const movies = findTopRatedLastMonth(allCinema.filter(item => item.type === 'Фильм'));
  console.log('Movies:', movies);
  console.log('Serials:', serials);
  const userId = useSelector(getAuthUserId);
  const hitOfTheWeek = findHitOfTheWeek(allCinema);
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
      <div className={styles.content}>
        <h2 className={styles.movieHeader}>Топ фильмов</h2>

        <Slider cards={movies} />

        <h2 className={styles.serialsHeader}>Топ фильмов 2</h2>

        <Slider cards={movies} />
        <h2 className={styles.serialsHeader}>Топ сериалов</h2>

        <Slider cards={serials} />

        <h2 className={styles.serialsHeader}>топ Сериалов 2</h2>

        <Slider cards={serials} />
      </div>
    </div>
  );
};
