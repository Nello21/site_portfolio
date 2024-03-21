import React, { ReactNode } from 'react';
import styles from './header.module.css';
import { DropButton } from 'shared/components/DropButton/dropButton';
import Basket from 'shared/assets/icons/basketball-solid.svg';

export const Header = ({ onSearch }: { onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <nav className={styles.headerContainer}>
      <div className={styles.leftSection}>
        <button className={styles.burgerButton}>☰</button>
        <div className={styles.siteName}>КИНОЛЕНТА</div>
      </div>
      <div className={styles.centerSection}>
        <input type="text" placeholder="Search" className={styles.searchInput} onChange={onSearch} />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.iconNotification}>🔖</div>
        <div className={styles.avatar}>
          <div className={styles.dropMenu}>
            <div className={styles.menuHeader}>
              <div className={styles.userName}>
                user name
                <div className={styles.userEmail}>user1@email.com</div>
              </div>
              <div className={styles.menuAvatar}></div>
            </div>
            <div className={styles.menuItem}>
              <span>Профиль</span>
              <span>Поддержка</span>
              <span>Разное</span>
              <span>Профиль</span>
              <span>Поддержка</span>
              <span>Разное</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
