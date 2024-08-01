import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { clearCinemaStore, getAllCinema, getCinemaIsLoading } from 'store/cinema/slice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getCinema } from 'store/cinema/effects';
import { Slider } from 'features/slider';
import { Carousel3d } from 'features/carousel3d';
import { findTopRatedLastMonth, findHitOfTheWeek } from 'store/cinema/filters';
import { Loader } from 'shared/components/Loader/loader';
import styles from './main-page.module.css';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const allCinema = useSelector(getAllCinema);
  const serials = allCinema.filter(item => item.type === 'Сериал');
  const movies = findTopRatedLastMonth(allCinema.filter(item => item.type === 'Фильм'));

  console.log('Movies:', movies);
  console.log('Serials:', serials);

  const isLoading = useSelector(getCinemaIsLoading);

  const backgroundRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (backgroundRef.current) {
      const scrollPosition = window.scrollY;
      backgroundRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    }
  }, []);

  useEffect(() => {
    dispatch(getCinema());
    window.addEventListener('scroll', handleScroll);
    return () => {
      dispatch(clearCinemaStore());
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, handleScroll]);

  if (isLoading) return <Loader />;
  if (!(movies && serials)) return <div>Нет данных</div>;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.hitHeader}>
        <div className={styles.carousel}>
          <Carousel3d cards={movies} />
        </div>
        <h1 className={styles.title} data-content="Хиты Недели">
          Хиты Недели
        </h1>
        <div className={styles.background} ref={backgroundRef} />
      </div>

      <section className={styles.content}>
        <h2 className={styles.movieHeader}>Фильмы</h2>
        <Slider cards={movies} />

        <h2 className={styles.serialsHeader}>Фильмы</h2>
        <Slider cards={movies} />

        <h2 className={styles.serialsHeader}>Сериалы</h2>
        <Slider cards={serials} />

        <h2 className={styles.serialsHeader}>Сериалы</h2>
        <Slider cards={serials} />
      </section>
    </div>
  );
};
