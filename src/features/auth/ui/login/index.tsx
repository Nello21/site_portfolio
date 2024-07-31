import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { getUserIsLoading, getAuthUserToken, userActions } from '../../model/store/slice';
import { postAuthData } from '../../model/store/effects';
import { ROUTES } from 'router/routes';
import styles from './loginForm.module.css';
import { Field, Form, Formik } from 'formik';
import { AuthRequestData } from 'features/auth/model/store/types';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getUserIsLoading);
  const token = useSelector(getAuthUserToken);

  const handleSubmit = async (values: AuthRequestData) => {
    dispatch(postAuthData(values) as any);
  };

  if (token) return <Navigate to={ROUTES.root} />;

  return (
    <div className={styles.container}>
      <h2 className={styles.loginTitle}>Авторизация</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleSubmit}
        validateOnBlur
      >
        <Form className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Почта:</label>
            <Field type="text" id="email" name="email" className={styles.inputField} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль:</label>
            <Field type="password" id="password" name="password" className={styles.inputField} />
          </div>
          <div className={styles.buttonContainer}>
            <button disabled={isLoading} type="submit" className={styles.loginButton}>
              Войти
            </button>
            <div style={{ fontSize: '18px', color: 'orange' }}>Не зарегистрированы?</div>
            <button className={styles.loginButton}>
              <Link to={ROUTES.register} style={{ textDecoration: 'none', color: 'white' }}>
                зарегистрироваться
              </Link>
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
