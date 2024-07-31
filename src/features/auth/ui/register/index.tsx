import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector } from 'react-redux';
import { postRegisterData } from '../../model/store/effects';
import { useNavigate } from 'react-router-dom';
import { getRegisterStatus, getUserIsLoading } from 'features/auth/model/store/slice';
import { RegisterRequestData } from 'features/auth/model/store/types';
import { registerScheme } from './validation';
import { AvatarModal } from 'features/avatar-upload/ui';
import { useAppDispatch } from 'store';
import styles from './register.module.css';

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(getUserIsLoading);
  const registerStatus = useSelector(getRegisterStatus);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');

  useEffect(() => {
    if (registerStatus === 'fulfilled') {
      navigate('/auth');
    }
  }, [registerStatus, navigate]);

  const handleSubmit = async (values: RegisterRequestData) => {
    dispatch(postRegisterData(values));
  };

  const handleSelectAvatar = (avatar: string) => {
    setSelectedAvatar(avatar);
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
        {({ errors, touched, setFieldValue }) => (
          <Form className={styles.registerForm}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.label}>
                Логин:
              </label>
              <Field className={styles.inputField} type="text" id="fullName" name="fullName" />
              <ErrorMessage id="fullName" name="fullName" component="div" className={styles.errorMessage} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Почта:
              </label>
              <Field className={styles.inputField} type="email" id="email" name="email" />
              <ErrorMessage id="email" name="email" component="div" className={styles.errorMessage} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Пароль:
              </label>
              <Field className={styles.inputField} type="password" id="password" name="password" />
              <ErrorMessage id="password" name="password" component="div" className={styles.errorMessage} />
            </div>
            <div className={styles.formGroup}>
              <span className={styles.label}>Аватар:</span>
              <button type="button" onClick={() => setIsAvatarModalOpen(true)} className={styles.avatarButton}>
                Выбрать аватар
              </button>
              {selectedAvatar && <img src={selectedAvatar} alt="avatar" className={styles.selectedAvatar} />}
              <ErrorMessage id="avatar" name="avatar" component="div" className={styles.errorMessage} />
            </div>
            <button
              className={styles.submitButton}
              type="submit"
              disabled={isLoading}
              onClick={() => setFieldValue('avatar', selectedAvatar)}
            >
              {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
            </button>
          </Form>
        )}
      </Formik>
      <AvatarModal
        isOpen={isAvatarModalOpen}
        onRequestClose={() => setIsAvatarModalOpen(false)}
        onSelectAvatar={handleSelectAvatar}
      />
    </div>
  );
};
