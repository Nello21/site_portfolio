import { ROUTES } from 'router/routes';
import House from 'shared/assets/icons/house-solid.svg';
import Movie from 'shared/assets/icons/film-solid.svg';
import { NavButton } from 'shared/components/NavButton/navButton';
import styles from './sideBar.module.css';

type SideBarProps = {
  isOpen?: boolean;
};

export const Sidebar = ({ isOpen }: SideBarProps) => {
  return (
    <nav className={styles.leftMenu}>
      <div className={styles.menuItem}>
        <NavButton url={`${ROUTES.root}?category=all`} className={styles.icon} icon={<House />}>
          <span>Главная</span>
        </NavButton>
      </div>
      <div className={styles.menuItem}>
        <NavButton url={ROUTES.navigator} className={styles.icon} icon={<Movie />}>
          <span>Навигатор</span>
        </NavButton>
      </div>
      <div className={styles.tooltip}></div>
    </nav>
  );
};
