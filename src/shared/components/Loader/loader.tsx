import { FireRing } from 'shared/animations/fire-ring/fire-ring';
import styles from './loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <FireRing />
      </div>
    </div>
  );
};
