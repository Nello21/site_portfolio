import { useAppDispatch } from 'store';
import { Carousel3d } from './Carousel3d';
import { Slider } from './Slider';
import styles from './onlineCinema.module.css';
import { useSelector } from 'react-redux';
import { clearCinemaStore, getCinemaIsLoading, getMovies, getSerials } from 'store/cinema/slice';
import { useCallback, useEffect, useRef } from 'react';
import { getCinema } from 'store/cinema/effects';
import { Loader } from 'shared/components/Loader/loader';

export const OnlineCinema = () => {
  const dispatch = useAppDispatch();
  const movies = useSelector(getMovies);
  const serials = useSelector(getSerials);
  const isLoading = useSelector(getCinemaIsLoading);

  const backgroundRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (backgroundRef.current) {
      const scrollPosition = window.scrollY;
      backgroundRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
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

        <h2 className={styles.serialsHeader}>Сериалы</h2>

        <Slider cards={movies} />
        <h2 className={styles.serialsHeader}>Сериалы</h2>

        <Slider cards={movies} />
        <h2 className={styles.serialsHeader}>Сериалы</h2>

        <Slider cards={movies} />
      </section>
    </div>
  );
};
