import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { getAuthUserToken, userActions, getAuthUser } from 'features/auth/model/store/slice';
import { STORAGE_KEY, setStorageItem } from 'services/storage';
import { DropSidebar } from 'shared/components/DropSidebar/dropSidebar';
import { ROUTES } from 'router/routes';
import { userProfileActions } from 'features/auth/model/store/userProfileSlice';
import { SearchBar } from 'features/searchBar/searchBar';
import clsx from 'clsx';
import styles from './header.module.css';

export const Header = () => {
  const token = useSelector(getAuthUserToken);
  const user = useSelector(getAuthUser);

  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
  const DropMenuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLLabelElement>(null);

  const location = useLocation();
  const [hideBurgerButton, setHideBurgerButton] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [checked, setChecked] = useState(false);

  const [lastScrollY, setLastScrollY] = useState(0);

  const controlBars = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setHideNavbar(true);
      setChecked(false);
    } else {
      setHideNavbar(false);
    }

    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', controlBars);

    return () => {
      window.removeEventListener('scroll', controlBars);
    };
  }, [controlBars]);

  useEffect(() => {
    if (location.pathname === '/navigator' || location.pathname === '/') {
      setHideBurgerButton(true);
    } else {
      setHideBurgerButton(false);
    }
  }, [hideBurgerButton, location.pathname]);

  const handleMouseEnterMenu = () => {
    setIsDropMenuOpen(true);
    DropMenuRef.current?.focus();
  };

  const handleMouseClickMenu = () => {
    DropMenuRef.current?.focus();
  };

  const hideDropMenuOnBlur = useCallback((e: any) => {
    if (e && !e.relatedTarget) {
      setIsDropMenuOpen(false);
    }
  }, []);

  const handleMouseLeaveMenu = (e: any) => {
    setIsDropMenuOpen(false);
  };

  const burgerAnimation = () => {
    const burger = burgerRef.current;
    if (burger) {
      burger.animate(
        {
          transform: 'scaleY(0.7) scaleX(1.3)',
        },
        { duration: 350, easing: 'ease' },
      );
    }
  };

  return (
    <nav className={clsx(styles.headerContainer, { [styles.hiddenNavbar]: hideNavbar })}>
      <div className={styles.leftSection}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className={styles.burgerInput}
          id="burgerButton"
        />
        <label htmlFor="burgerButton" className={styles.burgerButton} onClick={burgerAnimation} ref={burgerRef}>
          ☰
        </label>
        <div className={styles.dropSideBar}>
          <DropSidebar />
        </div>
        <Link to={ROUTES.root} className={styles.siteName}>
          <span>КИНОЛЕНТА</span>
        </Link>
      </div>
      <div className={styles.centerSection}>
        <SearchBar />
      </div>
      <div className={styles.rightSection}>
        <div onMouseEnter={handleMouseEnterMenu} onClick={handleMouseClickMenu}>
          {token ? (
            <img src={String(user.avatar)} className={styles.avatar} />
          ) : (
            <button className={styles.logInButton} onClick={() => setIsDropMenuOpen(!isDropMenuOpen)}>
              Аккаунт
            </button>
          )}
          <div
            className={clsx(styles.dropMenu, { [styles.dropMenuVisible]: isDropMenuOpen })}
            onMouseLeave={handleMouseLeaveMenu}
            onBlur={hideDropMenuOnBlur}
            ref={DropMenuRef}
          >
            <div className={styles.menuHeader}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div className={styles.userName}>
                  {user.fullName}
                  <div className={styles.userEmail}>{user.email}</div>
                </div>
                {token ? (
                  <img src={String(user.avatar)} className={styles.menuAvatar}></img>
                ) : (
                  <div className={styles.menuAvatar}>Аватар</div>
                )}
              </div>
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
  else
    return (
      <Link to={ROUTES.auth} className={styles.newPostButton}>
        <span style={{ color: 'salmon' }}>Войти</span>
      </Link>
    );
};
