import { DropSidebar } from 'shared/components/DropSidebar/dropSidebar';
import styles from './sideBar.module.css';

export const Sidebar = () => {
  return (
    <div className={styles.container}>
      <DropSidebar className={styles.sidebar} />
    </div>
  );
};
