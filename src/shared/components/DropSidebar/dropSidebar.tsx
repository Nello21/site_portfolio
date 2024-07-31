import { ROUTES } from 'router/routes';
import House from 'shared/assets/icons/house-solid.svg';
import Movie from 'shared/assets/icons/film-solid.svg';
import Play from 'shared/assets/icons/play-solid.svg';
import { NavButton } from 'shared/components/NavButton/navButton';
import styles from './dropSidebar.module.css';

type SidebarProps = {
  className?: string;
  onClick?: () => void;
};

export const DropSidebar = ({ className, onClick }: SidebarProps) => {
  return (
    <nav className={className}>
      <div className={styles.menuItem}>
        <NavButton url={`${ROUTES.root}?category=all`} className={styles.icon} icon={<House />} onClick={onClick}>
          <span>Главная</span>
        </NavButton>
      </div>
      <div className={styles.menuItem}>
        <NavButton url={ROUTES.navigator} className={styles.icon} icon={<Movie />} onClick={onClick}>
          <span>Навигатор</span>
        </NavButton>
      </div>
      <div className={styles.menuItem}>
        <NavButton url={ROUTES.cinema} className={styles.icon} icon={<Play />} onClick={onClick}>
          <span>Кинотеатр</span>
        </NavButton>
      </div>
      <div className={styles.tooltip}></div>
    </nav>
  );
};
