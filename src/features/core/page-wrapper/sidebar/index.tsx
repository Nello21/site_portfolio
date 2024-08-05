import { DropSidebar } from 'shared/components/DropSidebar/dropSidebar';
import styles from './sideBar.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (sidebar && window.scrollY >= 350 && window.innerWidth <= 1280) {
      sidebar.style.width = '0';
    } else if (sidebar) {
      sidebar.style.width = '200px';
    }
  }, [location.pathname]);

  useEffect(() => {
    const sidebar = sidebarRef.current;

    const toggleVisibility = () => {
      if (sidebar && window.scrollY > 350) {
        sidebar.style.width = '0px';
      } else if (sidebar) {
        sidebar.style.width = '200px';
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={styles.container} ref={sidebarRef}>
      <DropSidebar className={styles.sidebar} />
    </div>
  );
};
