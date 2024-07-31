import styles from './searchResultsList.module.css';
import { SearchResult } from './SearchResult';
import { cinemaData } from 'shared/types/cinemaData';

interface SearchBarInterface {
  results: cinemaData[];
  isLoading: boolean;
}

export const SearchResultsList = ({ results, isLoading }: SearchBarInterface) => {
  return isLoading ? (
    <div>Загрузка</div>
  ) : (
    <div className={styles.resultLists}>
      {results.map((result: cinemaData) => {
        return <SearchResult result={result} key={result.id} />;
      })}
    </div>
  );
};
