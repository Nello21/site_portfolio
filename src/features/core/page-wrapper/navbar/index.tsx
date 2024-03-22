import React, { ReactNode, useEffect } from 'react';
import styles from './header.module.css';
import { DropButton } from 'shared/components/DropButton/dropButton';
import Basket from 'shared/assets/icons/basketball-solid.svg';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { getUserToken, userActions, getUser } from 'features/auth/model/store/slice';
import { STORAGE_KEY, setStorageItem } from 'services/storage';
import { ROUTES } from 'router/routes';

export const Header = ({ onSearch }: { onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const dispatch = useAppDispatch();
  const token = useSelector(getUserToken);
  const user = useSelector(getUser);
  console.log(user);

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
          <img src={String(user.avatar)} className={styles.avatar} />
          <div className={styles.dropMenu}>
            <div className={styles.menuHeader}>
              {token ? (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className={styles.userName}>
                    {user.fullName}
                    <div className={styles.userEmail}>{user.email}</div>
                  </div>
                  <img src={String(user.avatar)} className={styles.menuAvatar}></img>
                </div>
              ) : (
                <div className={styles.userName}>Войдите</div>
              )}
            </div>
            <div className={styles.menuItem}>
              {token ? (
                <div>
                  <Link to={`${ROUTES.userProfile}/${user.id}`} style={{ textDecoration: 'none' }}>
                    <span>Профиль</span>
                  </Link>
                  <span>Избранное</span>
                </div>
              ) : (
                <div></div>
              )}
              <LoginButton />
              {/* <span className={styles.tooltip}></span> */}
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
      <span className={styles.newPostButton} onClick={logout}>
        Выйти
      </span>
    );

  return (
    <Link to={ROUTES.auth} className={styles.newPostButton} style={{ textDecoration: 'none' }}>
      <span style={{ color: 'orange' }}>Войти</span>
    </Link>
  );
};
