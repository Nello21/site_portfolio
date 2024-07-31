import styles from './searchResult.module.css';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { cinemaData } from 'shared/types/cinemaData';

interface SearchResultInterface {
  result: cinemaData;
}

export const SearchResult = ({ result }: SearchResultInterface) => {
  return (
    <div className={styles.resultContainer}>
      <Link to={`${ROUTES.root}${result.id}`} className={styles.link}>
        <img src={result.image} className={styles.imageResult}></img>
      </Link>
      <Link to={`${ROUTES.root}${result.id}`} className={styles.link}>
        <div className={styles.searchResult}>{result.name}</div>
      </Link>
    </div>
  );
};
