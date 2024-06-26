import React, { useEffect } from 'react';
import { fetchUser, fetchUserComments } from 'features/auth/model/store/effects';
import { getUserProfile, userProfileActions } from 'features/auth/model/store/userProfileSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { getUserComments } from 'features/auth/model/store/reviewsSlice';
import styles from './userProfile.module.css';
import { Loader } from 'shared/components/Loader/loader';

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
      dispatch(userProfileActions.clearUserStore());
    };
  }, [dispatch, id]);

  if (!user || !reviews) return <Loader />;

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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  color: 'white',
                  fontFamily: 'sans-serif',
                  fontSize: '20px',
                }}
              >
                <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'orange', maxWidth: '300px' }}>
                  Название фильма: {review.movie_name}
                </div>
                <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'gray', maxWidth: '300px' }}>
                  Отзыв: {review.review}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
