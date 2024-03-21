import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { postRegisterData } from '../../model/store/effects';
import { useNavigate } from 'react-router-dom';
import { getRegisterStatus, getUserIsLoading } from 'features/auth/model/store/slice';
import { RegisterRequestData } from 'features/auth/model/store/types';
import { registerScheme } from './validation';
import styles from './register.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(getUserIsLoading);

  const registerStatus = useSelector(getRegisterStatus);

  useEffect(() => {
    if (registerStatus === 'fulfilled') {
      navigate('/auth');
    }
  }, [registerStatus, navigate]);

  const handleSubmit = async (values: RegisterRequestData) => {
    dispatch(postRegisterData(values) as any);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Регистрация</h2>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          avatar: '',
        }}
        validationSchema={registerScheme}
        onSubmit={handleSubmit}
        validateOnBlur
      >
        {({ errors, touched }) => (
          <Form className={styles.registerForm}>
            <div className={styles.formField}>
              <label htmlFor="fullName">Full Name</label>
              <Field className={styles.inputField} type="text" name="fullName" />
              <ErrorMessage name="fullName" component="div" className={styles.errorMessage} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="email">Email</label>
              <Field className={styles.inputField} type="email" name="email" />
              <ErrorMessage name="email" component="div" className={styles.errorMessage} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="password">Password</label>
              <Field className={styles.inputField} type="password" name="password" />
              <ErrorMessage name="password" component="div" className={styles.errorMessage} />
            </div>
            <button className={styles.submitButton} type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
