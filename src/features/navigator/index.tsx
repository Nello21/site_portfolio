import React, { useEffect, useState } from 'react';
import { RangeSlider } from 'shared/components/RangeSlider/rangeSlider';
import { CinemaOneCard } from 'shared/features/CinemaCards/ui/CinemaCard';
import { Option } from 'shared/types/option';
import { useSelector } from 'react-redux';
import { clearCinemaStore, getAllCinema, getCinemaIsLoading } from 'store/cinema/slice';
import { useAppDispatch } from 'store';
import { getCinema } from 'store/cinema/effects';
import { cinemaData } from 'shared/types/cinemaData';
import { ButtonToTop } from 'shared/components/TopButton/topButton';
import { useSearchParams } from 'react-router-dom';
import { Loader } from 'shared/components/Loader/loader';
import { motion } from 'framer-motion';
import Tick from '../../shared/assets/icons/tick.svg';
import styles from './navigator.module.css';
import Select from 'react-select';
import clsx from 'clsx';

export const NavigatorPage = () => {
  const dispatch = useAppDispatch();
  const allCinema = useSelector(getAllCinema);
  const isLoading = useSelector(getCinemaIsLoading);

  const [isMoviesChecked, setIsMoviesChecked] = useState(true);
  const [isSerialsChecked, setIsSerialsChecked] = useState(true);
  const [isGenresChecked, setIsGenresChecked] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams({
    q: '',
    onlySelectedGenres: 'false',
    showMovies: 'true',
    showSerials: 'true',
    sortByRating: '-rating',
    yearRange: '1970, 2024',
    selectedGenres: '',
  });
  const q = searchParams.get('q');
  const onlySelectedGenres = searchParams.get('onlySelectedGenres') === 'true';
  const showMovies = searchParams.get('showMovies') === 'true';
  const showSerials = searchParams.get('showSerials') === 'true';
  const sortByRating = searchParams.get('sortByRating') === '-rating';
  const [yearRangeStart, yearRangeEnd] = searchParams.get('yearRange')?.split(',').map(Number) || [1970, 2024];
  const selectedGenresString = searchParams.get('selectedGenres');
  const selectedGenres = selectedGenresString ? selectedGenresString.split(',') : [];
  const selectedGenresOptions: Option[] = selectedGenres.map(genre => ({
    value: genre,
    label: genre,
  }));

  useEffect(() => {
    dispatch(getCinema());
    return () => {
      dispatch(clearCinemaStore());
    };
  }, [dispatch]);

  const contentFiltration = (content: cinemaData[]) => {
    //Фильтрация по поиску
    const searchableMovies = content.filter(movie => movie.name.toLowerCase().includes(q!.toLowerCase()));

    // Фильтрация по жанрам
    const genreFilter = (content: cinemaData[]) => {
      if (selectedGenres.length > 0) {
        if (onlySelectedGenres) {
          return content.filter(movie =>
            selectedGenres.every((selectedGenre: string) => movie.genre.includes(selectedGenre)),
          );
        } else if (!onlySelectedGenres) {
          return content.filter(movie =>
            selectedGenres.some((selectedGenre: string) => movie.genre.includes(selectedGenre)),
          );
        }
      }
      return content;
    };

    const filteredByGenres = genreFilter(searchableMovies);

    // Фильтрация по типу (фильм/сериал)
    const filteredByType = filteredByGenres.filter(movie => {
      if (showMovies && showSerials) {
        return true;
      } else if (showMovies) {
        return movie.type === 'Фильм';
      } else if (showSerials) {
        return movie.type === 'Сериал';
      } else {
        return false;
      }
    });

    // Фильтрация по годам выхода
    const filterByYears = filteredByType.filter(movie => {
      const releaseYear = parseInt(movie.releaseYear.toString());
      return releaseYear >= yearRangeStart && releaseYear <= yearRangeEnd;
    });

    // Сортировка по рейтингу
    const sortMovies = () => {
      const sortedMovies = [...filterByYears];
      if (sortByRating) {
        sortedMovies.sort((a, b) => b.rating - a.rating);
      } else {
        sortedMovies.sort((a, b) => a.rating - b.rating);
      }
      return sortedMovies;
    };

    const sortedMovies = sortMovies();

    console.log(selectedGenres);
    console.log(selectedGenresOptions);
    return sortedMovies;
  };

  const content = contentFiltration(allCinema);

  if (isLoading) return <Loader />;
  if (!allCinema) return <div>нет данных</div>;

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => {
      prev.set('q', e.target.value || '');
      return prev;
    });
  };

  const handleShowMoviesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => {
      prev.set('showMovies', e.target.checked.toString());
      return prev;
    });
    setIsMoviesChecked(prev => !prev);
  };

  const handleShowSeriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => {
      prev.set('showSerials', e.target.checked.toString());
      return prev;
    });
    setIsSerialsChecked(prev => !prev);
  };

  const handleGenreChange = (option: readonly Option[]) => {
    if (option) {
      const selectedGenresString = option.map(option => option.value).join(',');
      setSearchParams(prev => {
        prev.set('selectedGenres', selectedGenresString);
        return prev;
      });
    }
  };

  const handleOnlySelectedGenres = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => {
      prev.set('onlySelectedGenres', e.target.checked.toString());
      return prev;
    });
    setIsGenresChecked(prev => !prev);
  };

  const handleSortRatingChange = (option: Option | null) => {
    if (option) {
      setSearchParams(prev => {
        prev.set('sortByRating', option.value.toString());
        return prev;
      });
    }
  };

  const handleYearRangeChange = (newRange: number[]) => {
    setSearchParams(prev => {
      prev.set('yearRange', newRange.join(','));
      return prev;
    });
  };

  const options: Option[] = [
    { value: '-rating', label: 'По рейтингу (убывание)' },
    { value: 'rating', label: 'По рейтингу (возрастание)' },
  ];

  const genreOptions: Option[] = [
    { value: 'Фантастика', label: 'Фантастика' },
    { value: 'Боевик', label: 'Боевик' },
    { value: 'Ужасы', label: 'Ужасы' },
    { value: 'Триллер', label: 'Триллер' },
    { value: 'Комедия', label: 'Комедия' },
    { value: 'Драма', label: 'Драма' },
    { value: 'Детектив', label: 'Детектив' },
  ];

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      boxShadow: 0,
      border: '3px solid',
      borderColor: state.isFocused ? 'darkmagenta' : 'black',
      '&:hover': {
        borderColor: state.isFocused ? 'darkmagenta' : 'black',
      },
    }),
    option: ({ isDisabled, isSelected }: any) => {
      return {
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          backgroundColor: !isDisabled ? (isSelected ? 'darkmagenta' : 'darkmagenta') : undefined,
        },
        ':hover': {
          backgroundColor: !isDisabled ? 'darkmagenta' : undefined,
        },
      };
    },
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <div className={styles.filterHeader}>
            <div className={styles.filterNumber}>1</div>
            <div className={styles.text}>Навигатор по названию</div>
          </div>
          <div className={styles.selectSection}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Найти фильм"
              value={q || ''}
              onChange={handleSearchInputChange}
            />

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="show-movies"
                className={styles.checkboxInput}
                checked={showMovies}
                onChange={handleShowMoviesChange}
              />
              <label htmlFor="show-movies" className={styles.checkboxText}>
                Показать фильмы
              </label>
              <Tick className={clsx(styles.tick, { [styles.checkedTick]: isMoviesChecked })} />
            </div>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="show-series"
                className={styles.checkboxInput}
                checked={showSerials}
                onChange={handleShowSeriesChange}
              />
              <label htmlFor="show-series" className={styles.checkboxText}>
                Показать сериалы
              </label>
              <Tick className={clsx(styles.tick, { [styles.checkedTick]: isSerialsChecked })} />
            </div>
          </div>
        </div>

        <div className={styles.filterContainer}>
          <div className={styles.filterHeader}>
            <div className={styles.filterNumber}>2</div>
            <div className={styles.text}>Жанры и рейтинг</div>
          </div>
          <div className={styles.selectSection}>
            <Select
              closeMenuOnSelect={false}
              styles={customStyles}
              placeholder="Выберите жанр"
              isMulti
              options={genreOptions}
              value={selectedGenresOptions}
              onChange={handleGenreChange}
            />
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="only-selected-genres"
                className={styles.checkboxInput}
                checked={onlySelectedGenres}
                onChange={handleOnlySelectedGenres}
              />
              <label htmlFor="only-selected-genres" className={styles.checkboxText}>
                Только выбранные жанры
              </label>
              <Tick className={clsx(styles.tick, { [styles.checkedTick]: isGenresChecked })} />
            </div>
            <Select
              styles={customStyles}
              placeholder="По рейтингу"
              onChange={handleSortRatingChange}
              options={options}
            />
          </div>
        </div>

        <div className={styles.filterContainer}>
          <div className={styles.filterHeader}>
            <div className={styles.filterNumber}>3</div>
            <div className={styles.text}>Годы выхода</div>
          </div>
          <div className={styles.selectSection}>
            <RangeSlider onChange={handleYearRangeChange} />
          </div>
        </div>
      </div>

      <motion.div layout>
        <div className={styles.moviesContainer}>
          {content.map(movie => (
            <CinemaOneCard
              card={movie}
              key={movie.id}
              style={
                window.innerWidth > 768 ? { height: '38vmin', width: '47vmin' } : { height: '34vmin', width: '44vmin' }
              }
            />
          ))}
        </div>
      </motion.div>
      <div className={styles.buttonToTop}>
        <ButtonToTop />
      </div>
    </div>
  );
};
