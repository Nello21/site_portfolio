import { useEffect } from 'react';
import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { getCinemaIsLoading, clearCinemaStore, getAllCinema } from 'store/cinema/slice';
import { getCinema } from 'store/cinema/effects';
import { fetchUser } from 'features/auth/model/store/effects';
import { getAuthUserId } from 'features/auth/model/store/slice';
import { Loader } from 'shared/components/Loader/loader';
import styles from './online-cinema.module.css';
import { Slider } from 'features/slider';
import { findHitOfTheWeek, findTopRatedLastMonth } from 'store/cinema/filters';

export const OnlineCinema = () => {
  const dispatch = useAppDispatch();
  const allCinema = useSelector(getAllCinema);
  const movies = findTopRatedLastMonth(allCinema.filter(item => item.type === 'Фильм'));
  const serials = findTopRatedLastMonth(allCinema.filter(item => item.type === 'Cериал'));
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
