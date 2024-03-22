import React, { useEffect } from 'react';
import { fetchUser, fetchUserComments } from 'features/auth/model/store/effects';
import { getUserProfile, userActions } from 'features/auth/model/store/userProfileSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { getUserComments } from 'features/auth/model/store/reviewsSlice';
import styles from './userProfile.module.css';
import { getMovies } from 'store/cinema/slice';

export const UserPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useSelector(getUserProfile);
  const reviews = useSelector(getUserComments);
  console.log(reviews);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
      dispatch(fetchUserComments(id));
    }
    return () => {
      dispatch(userActions.clearUserStore());
    };
  }, [dispatch, id]);

  return (
    <div className={styles.userPage}>
      <div className={styles.avatarContainer}>
        <img src={String(user.avatar)} alt="Аватар" className={styles.avatar} />
      </div>
      <div className={styles.fullName}>{user.fullName}</div>
      <div className={styles.comments}>
        <h2>Комментарии пользователя</h2>
        <div className={styles.commentList}>
          {reviews.map((review, index) => (
            <div key={index} className={styles.commentItem}>
              <div style={{ display: 'flex', flexDirection: 'column' }}></div>
              <div style={{ padding: '10px' }}>Название фильма: {review.movie_name}</div>
              <div style={{ padding: '10px' }}>Отзыв: {review.review}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
