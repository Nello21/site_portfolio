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
    <NavLink to={url} className={({ isActive }) => clsx(styles.menuItem, { [styles.active]: isActive })}>
      {icon && <span className={className}>{icon}</span>}
      {children}
    </NavLink>
  );
};
