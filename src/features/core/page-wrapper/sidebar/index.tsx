import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import styles from './sideBar.module.css';
import House from 'shared/assets/icons/house-solid.svg';
import Play from 'shared/assets/icons/play-solid.svg';
import Movie from 'shared/assets/icons/film-solid.svg';
import Serial from 'shared/assets/icons/desktop-solid.svg';
import Ticket from 'shared/assets/icons/ticket-solid.svg';
import { NavButton } from 'shared/components/NavButton/navButton';

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
