import styles from './fire-ring.module.css';
import FireRingSvg from 'shared/assets/icons/fire-ring.svg';

export const FireRing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.circle}></div>
      <span>ЗАГРУЗКА</span>
      <FireRingSvg className={styles.svgCircle} />
    </div>
  );
};
