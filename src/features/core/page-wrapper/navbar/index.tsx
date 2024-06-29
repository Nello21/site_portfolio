import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { getAuthUserToken, userActions, getAuthUser } from 'features/auth/model/store/slice';
import { STORAGE_KEY, setStorageItem } from 'services/storage';
import { DropSidebar } from 'shared/components/DropSidebar/dropSidebar';
import { ROUTES } from 'router/routes';
import clsx from 'clsx';
import { userProfileActions } from 'features/auth/model/store/userProfileSlice';

export const Header = ({ onSearch }: { onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const token = useSelector(getAuthUserToken);
  const user = useSelector(getAuthUser);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropMenuHovered, setIsDropMenuHovered] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsSidebarOpen(prevState => !prevState);
    sideRef.current?.focus();
  };

  const hideSidebar = useCallback((e: any) => {
    if (e && !e.relatedTarget) {
      setIsSidebarOpen(false);
    }
  }, []);

  const handleMouseEnterMenu = () => {
    setIsDropMenuHovered(true);
    avatarRef.current?.focus();
  };

  const hideDropMenu = (e: any) => {
    if (e && !e.relatedTarget) {
      setIsDropMenuHovered(false);
    }
  };

  return (
    <nav className={styles.headerContainer}>
      <div className={styles.leftSection}>
        <button className={styles.burgerButton} onClick={toggleMenu}>
          ☰
        </button>
        <div
          className={clsx(styles.dropSideBar, { [styles.sideBarVisible]: isSidebarOpen })}
          onBlur={hideSidebar}
          ref={sideRef}
          tabIndex={-1}
        >
          {isSidebarOpen && <DropSidebar />}
        </div>
        <div className={styles.siteName}>
          <span>КИНОЛЕНТА</span>
        </div>
      </div>
      <div className={styles.centerSection}>
        <input type="text" placeholder="Search" className={styles.searchInput} onChange={onSearch} />
      </div>
      <div className={styles.rightSection}>
        <div onMouseEnter={handleMouseEnterMenu} onBlur={hideDropMenu} ref={avatarRef} tabIndex={-1}>
          {token ? <img src={String(user.avatar)} className={styles.avatar} /> : <div></div>}
          <div className={clsx(styles.dropMenu, { [styles.dropMenuVisible]: isDropMenuHovered })}>
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
                  <Link to={`${ROUTES.userProfile}/${user.id}`} className={styles.link}>
                    <span>Профиль</span>
                  </Link>
                  <Link to={`${ROUTES.favorites}/${user.id}`} className={styles.link}>
                    <span>Избранное</span>
                  </Link>
                </div>
              ) : (
                <div></div>
              )}
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const LoginButton = () => {
  const dispatch = useAppDispatch();
  const token = useSelector(getAuthUserToken);

  const logout = () => {
    dispatch(userActions.clearUserStore());
    dispatch(userProfileActions.clearUserStore());
    setStorageItem(STORAGE_KEY.USER_DATA, null);
  };

  if (token)
    return (
      <Link to={ROUTES.root} className={styles.newPostButton} onClick={logout}>
        <span>Выйти</span>
      </Link>
    );

  return (
    <Link to={ROUTES.auth} className={styles.newPostButton}>
      <span style={{ color: 'orange' }}>Войти</span>
    </Link>
  );
};
