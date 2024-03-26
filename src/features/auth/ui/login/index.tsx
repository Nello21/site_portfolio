import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { getUserIsLoading, getUserToken, userActions } from '../../model/store/slice';
import { postAuthData } from '../../model/store/effects';
import { ROUTES } from 'router/routes';
import styles from './loginForm.module.css';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getUserIsLoading);
  const token = useSelector(getUserToken);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(postAuthData(formData));
  };

  if (token) return <Navigate to={ROUTES.root} />;

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Авторизация</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.buttonContainer}>
          <button disabled={isLoading} type="submit" className={styles.loginButton}>
            Войти
          </button>
          <div>Не зарегистрированы?</div>
          <Link to={ROUTES.register}>
            <button className={styles.loginButton}>зарегистрироваться</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
