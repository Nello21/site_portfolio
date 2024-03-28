import { DropSidebar } from 'shared/components/DropSidebar/dropSidebar';
import styles from './sideBar.module.css';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <DropSidebar />
    </div>
  );
};
