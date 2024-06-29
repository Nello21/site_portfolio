import React, { ReactNode } from 'react';
import styles from './navButton.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

type NavButtonProps = {
  url: string;
  className?: string;
  icon?: ReactNode;
  children?: ReactNode;
  text?: string;
};

export const NavButton = ({ url, className, icon, children }: NavButtonProps) => {
  return (
    <div className={styles.itemContainer}>
      <NavLink to={url} className={({ isActive }) => clsx(styles.icon, { [styles.iconActive]: isActive })}>
        {icon && <div className={className}>{icon}</div>}
      </NavLink>
      <NavLink to={url} className={({ isActive }) => clsx(styles.menuItem, { [styles.itemActive]: isActive })}>
        {children}
      </NavLink>
    </div>
  );
};
