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

type FormData = {
  review: string;
  rating: number;
};

export const CommentForm = ({ movie_name, movieId }: any) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getCreateCommentIsLoading);
  const token = useSelector(getUserToken);
  const navigate = useNavigate();

  const logIn = () => {
    navigate('/auth');
  };

  if (!token) return <button onClick={logIn}>Войдите чтобы оставить комментарий</button>;

  const handleSubmit = (values: FormData, actions: any) => {
    const { review, rating } = values;
    dispatch(createComment({ movies_data_id: movieId, movie_name, review, rating })).then(() => {
      actions.resetForm();
      dispatch(fetchReviewsWithUsers(String(movieId)));
    });
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
              <Field type="number" name="rating" placeholder="Поставьте оценку" className={styles.inputField} />
            </div>
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
