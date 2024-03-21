import React, { ReactNode } from 'react';
import styles from './header.module.css';
import { DropButton } from 'shared/components/DropButton/dropButton';
import Basket from 'shared/assets/icons/basketball-solid.svg';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { getUserToken, userActions } from 'features/auth/model/store/slice';
import { STORAGE_KEY, setStorageItem } from 'services/storage';
import { ROUTES } from 'router/routes';

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
              <span>Избранное</span>
              <span>
                <LoginButton />
              </span>
              <span className={styles.tooltip}></span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const LoginButton = () => {
  const dispatch = useAppDispatch();
  const token = useSelector(getUserToken);

  const logout = () => {
    dispatch(userActions.clearUserStore());
    setStorageItem(STORAGE_KEY.USER_DATA, null);
  };

  if (token)
    return (
      <button className={styles.newPostButton} onClick={logout}>
        Выйти
      </button>
    );

  return (
    <Link to={ROUTES.auth} className={styles.newPostButton}>
      Войти
    </Link>
  );
};
