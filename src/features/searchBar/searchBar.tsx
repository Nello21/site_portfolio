import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { getAllCinema, getCinemaIsLoading, clearCinemaStore } from 'store/cinema/slice';
import { getCinema } from 'store/cinema/effects';
import styles from './searchBar.module.css';
import { SearchResultsList } from './SearchResultsList';
import { cinemaData } from 'shared/types/cinemaData';
import SearchIcon from 'shared/assets/icons/search-icon.svg';
import clsx from 'clsx';

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const allCinema = useSelector(getAllCinema);
  const isLoading = useSelector(getCinemaIsLoading);

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<cinemaData[]>([]);
  const [isResultVisible, setIsResultVisible] = useState(false);

  useEffect(() => {
    dispatch(getCinema());
    return () => {
      dispatch(clearCinemaStore());
    };
  }, [dispatch]);

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleBlur = useCallback((e: any) => {
    if (e && !e.relatedTarget) {
      setIsResultVisible(false);
    }
  }, []);

  const handleFocus = useCallback(() => {
    setIsResultVisible(true);
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setResults([]);
    } else {
      setResults(allCinema.filter(movie => movie.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }
  }, [searchQuery, allCinema]);

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.inputWrapper}>
        <SearchIcon className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Найти фильм"
          value={searchQuery}
          onChange={handleSearchInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>
      {isResultVisible && results.length > 0 && (
        <div className={clsx(styles.resultList, { [styles.resultListVisible]: isResultVisible })}>
          <SearchResultsList results={results} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};
