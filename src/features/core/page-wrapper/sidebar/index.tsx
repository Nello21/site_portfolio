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

export const Sidebar = () => {
  return (
    <nav className={styles.leftMenu}>
      <NavButton url={`${ROUTES.root}?category=all`} className={styles.icon} icon={<House />}>
        <span>Главная</span>
      </NavButton>
      <NavButton url={ROUTES.cinema} className={styles.icon} icon={<Play />}>
        <span>Онлайн-кинотеатр</span>
      </NavButton>
      <NavButton url={ROUTES.movies} className={styles.icon} icon={<Movie />}>
        <span>Фильмы</span>
      </NavButton>
      <NavButton url={ROUTES.serials} className={styles.icon} icon={<Serial />}>
        <span>Сериалы</span>
      </NavButton>
      <NavButton url={ROUTES.tickets} className={styles.icon} icon={<Ticket />}>
        <span>Билеты в кино</span>
      </NavButton>
    </nav>
  );
};
