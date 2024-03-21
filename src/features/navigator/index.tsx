import React, { useEffect, useState } from 'react';
import { RangeSlider } from 'shared/components/RangeSlider/rangeSlider';
import { CinemaOneCard } from 'shared/features/CinemaCards/ui/CinemaCard';
import { Option } from 'shared/types/option';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { clearCinemaStore, getAllCinema, getCinemaIsLoading } from 'store/cinema/slice';
import { useAppDispatch } from 'store';
import Select from 'react-select';
import styles from './navigator.module.css';
import { getCinema } from 'store/cinema/effects';
import { cinemaData } from 'shared/types/cinemaData';

export const NavigatorPage = () => {
  const dispatch = useAppDispatch();
  const allCinema = useSelector(getAllCinema);
  const isLoading = useSelector(getCinemaIsLoading);

  const [data, setData] = useState<cinemaData[]>([]);

  const [showMovies, setShowMovies] = useState(true);
  const [showSerials, setShowSerials] = useState(true);

  const [searchValue, setSearchValue] = useState('');

  const [sortByRating, setSortByRating] = useState<string | number>('-rating');

  const [yearRange, setYearRange] = useState<number[]>([1970, 2024]);

  const [selectedGenres, setSelectedGenres] = useState<Option[]>([]);

  // const [genreOptions, setGenreOptions] = useState<Option[]>([]);

  // Номер конкретной страницы в пагинации
  // const [currentPage, setCurrentPage] = useState(1);

  // Количество элементов на странице
  // const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    dispatch(getCinema());
    return () => {
      dispatch(clearCinemaStore());
    };
  }, [dispatch]);

  useEffect(() => {
    //Фильтрация по поиску
    const searchableMovies = allCinema.filter(movie => movie.name.toLowerCase().includes(searchValue.toLowerCase()));

    // Фильтрация по жанрам
    const filterByGenres = searchableMovies.filter(movie => {
      if (selectedGenres.length > 0) {
        return selectedGenres.some((selectedGenre: any) => movie.genre.includes(selectedGenre.value));
      } else {
        return true;
      }
    });

    // Фильтрация по типу (фильм/сериал)
    const filteredByType = filterByGenres.filter(movie => {
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
      return releaseYear >= yearRange[0] && releaseYear <= yearRange[1];
    });

    // Сортировка
    const sortMovies = () => {
      const sortedMovies = [...filterByYears];
      if (sortByRating === '-rating') {
        sortedMovies.sort((a, b) => b.rating - a.rating);
      } else {
        sortedMovies.sort((a, b) => a.rating - b.rating);
      }
      return sortedMovies;
    };

    const sortedMovies = sortMovies();
    setData(sortedMovies);
  }, [allCinema, searchValue, selectedGenres, showMovies, showSerials, yearRange, sortByRating]);

  if (isLoading) return <div>Loading....</div>;
  if (!allCinema) return <div>no data</div>;

  const handleShowMoviesChange = () => {
    setShowMovies(!showMovies);
  };

  const handleShowSeriesChange = () => {
    setShowSerials(!showSerials);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleYearRangeChange = (newRange: number[]) => {
    setYearRange(newRange);
  };

  const handleGenreChange = (newValue: any) => {
    setSelectedGenres(newValue);
  };

  const handleSortRatingChange = (option: Option | null) => {
    if (option) {
      setSortByRating(option.value);
    }
  };

  const handleOnlySelectedGenres = () => {
    if (selectedGenres.length > 0) {
      const filteredMovies = allCinema.filter(movie =>
        selectedGenres.every((selectedGenre: any) => movie.genre.includes(selectedGenre.value)),
      );
      setData(filteredMovies);
    }
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.NameFilter}>
          <div className={styles.sectionNumber}>1</div>
          <div className={styles.section}>
            <div className={styles.text}>Навигатор по фильмам</div>
            <input
              style={{
                marginTop: '10px',
                height: '35px',
                border: '1px solid lightgray',
                borderRadius: '5px',
              }}
              type="text"
              placeholder="Найти фильм"
              onChange={handleSearchInputChange}
            />

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="show-movies"
                className={styles.checkboxInput}
                checked={showMovies}
                onChange={handleShowMoviesChange}
              />
              <label htmlFor="show-movies" className={styles.checkboxText}>
                Показать фильмы
              </label>
            </div>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="show-series"
                className={styles.checkboxInput}
                checked={showSerials}
                onChange={handleShowSeriesChange}
              />
              <label htmlFor="show-series" className={styles.checkboxText}>
                Показать сериалы
              </label>
            </div>
          </div>
        </div>

        <div className={styles.NameFilter}>
          <div className={styles.sectionNumber}>2</div>
          <div className={styles.section}>
            <div className={styles.text}>Жанры и рейтинг</div>
            <Select
              closeMenuOnSelect={false}
              className={styles.select}
              placeholder="Выберите жанр"
              isMulti
              options={genreOptions}
              value={selectedGenres}
              onChange={handleGenreChange}
            />
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="only-selected-genres"
                className={styles.checkboxInput}
                onClick={handleOnlySelectedGenres}
              />
              <label htmlFor="only-selected-genres" className={styles.checkboxText}>
                Только выбранные жанры
              </label>
            </div>
            <Select
              className={styles.select}
              placeholder="Выберите..."
              value={options.find(option => option.value === sortByRating)}
              onChange={handleSortRatingChange}
              options={options}
            />
          </div>
        </div>

        <div className={styles.NameFilter}>
          <div className={styles.sectionNumber}>3</div>
          <div className={styles.section}>
            <div className={styles.text}>Годы выхода</div>
            <div style={{ marginTop: '15px' }}>
              <RangeSlider onChange={handleYearRangeChange} />
            </div>
          </div>
        </div>
      </div>

      <motion.div layout>
        <div className={styles.moviesContainer}>
          {data.map(movie => (
            <CinemaOneCard post={movie} key={movie.id} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
