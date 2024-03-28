import { ROUTES } from 'router/routes';
import House from 'shared/assets/icons/house-solid.svg';
import Movie from 'shared/assets/icons/film-solid.svg';
import { NavButton } from 'shared/components/NavButton/navButton';
import styles from './dropSidebar.module.css';

type SidebarProps = {
  className?: string;
};

export const DropSidebar = ({ className }: SidebarProps) => {
  return (
    <nav className={className}>
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
