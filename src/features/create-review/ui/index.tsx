import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { createComment } from '../model/store/effects';
import { getCreateCommentIsLoading } from '../model/store/slice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getUserToken } from 'features/auth/model/store/slice';
import { useNavigate } from 'react-router-dom';
import { fetchReviewsWithUsers } from 'features/auth/model/store/effects';
import { reviewScheme } from './validation';
import styles from './reviewForm.module.css';
import { useEffect, useState } from 'react';

type FormData = {
  review: string;
  rating: number;
};

export const CommentForm = ({ movie_name, movieId, rating }: any) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getCreateCommentIsLoading);
  const token = useSelector(getUserToken);
  const navigate = useNavigate();
  const [formRating, setFormRating] = useState(rating);

  const logIn = () => {
    navigate('/auth');
  };

  useEffect(() => {
    setFormRating(rating);
  }, [rating]);

  const handleSubmit = (values: FormData, actions: any) => {
    const { review, rating } = values;
    dispatch(createComment({ movies_data_id: movieId, movie_name, review, rating })).then(() => {
      actions.resetForm();
      dispatch(fetchReviewsWithUsers(String(movieId)));
    });
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormRating(parseInt(event.target.value));
  };

  return (
    <div>
      <Formik
        initialValues={{ review: '', rating: 0 }}
        onSubmit={handleSubmit}
        validationSchema={reviewScheme}
        validateOnBlur
      >
        {({ errors, touched }) => (
          <Form className={styles.reviewForm}>
            <div className={styles.formField}>
              <Field type="text" name="review" placeholder="Введите комментарий" className={styles.inputField} />
            </div>
            <div className={styles.formField}>
              <Field
                type="number"
                name="rating"
                placeholder="Поставьте оценку"
                className={styles.inputRatingField}
                onChange={handleRatingChange}
                value={formRating}
              />
            </div>
            {!token && (
              <div className={styles.formField}>
                <button type="button" onClick={logIn} className={styles.loginButton}>
                  Войти, чтобы оставить комментарий
                </button>
              </div>
            )}
            <button type="submit" disabled={isLoading} className={styles.submitButton}>
              {isLoading ? 'Отправка...' : 'Отправить'}
            </button>
            <ErrorMessage name="review" component="div" />
          </Form>
        )}
      </Formik>
    </div>
  );
};
