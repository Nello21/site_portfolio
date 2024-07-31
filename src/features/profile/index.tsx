import { useEffect, useState } from 'react';
import { fetchUser, fetchUserComments } from 'features/auth/model/store/effects';
import { getUserProfile, userProfileActions } from 'features/auth/model/store/userProfileSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { getUserComments } from 'features/auth/model/store/reviewsSlice';
import { Loader } from 'shared/components/Loader/loader';
import { getAllCinema } from 'store/cinema/slice';
import { getCinema } from 'store/cinema/effects';
import styles from './userProfile.module.css';
import { AvatarModal } from 'features/avatar-upload/ui';
import { changeAvatar } from 'features/avatar-upload/model/store/effects';
import { getAuthUser, getAuthUserToken, userActions } from 'features/auth/model/store/slice';
import { setStorageItem, STORAGE_KEY } from 'services/storage';

export const UserPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const userProfile = useSelector(getUserProfile);
  const user = useSelector(getAuthUser);
  const token = useSelector(getAuthUserToken);
  const reviews = useSelector(getUserComments);
  const cinema = useSelector(getAllCinema);

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getCinema());
      dispatch(fetchUser(id));
      dispatch(fetchUserComments(id));
    }
    return () => {
      dispatch(userProfileActions.clearUserStore());
    };
  }, [dispatch, id]);

  if (!userProfile || !reviews || !cinema) return <Loader />;

  const getMovieImageById = (id: number | null) => {
    const movie = cinema.find(movie => movie.id === id);
    return movie ? movie.image : null;
  };

  const handleSelectAvatar = (avatar: string) => {
    dispatch(userProfileActions.setUserAvatar(avatar));
    dispatch(changeAvatar(avatar));
    const updatedUser = { ...user, avatar };
    dispatch(userActions.setUserData(updatedUser));
    setStorageItem(STORAGE_KEY.USER_DATA, updatedUser);
  };

  return (
    <div className={styles.userPage}>
      <div className={styles.avatarContainer}>
        <img src={String(userProfile.avatar)} alt="Аватар" className={styles.avatar} />
        {token ? (
          <button onClick={() => setIsAvatarModalOpen(true)} className={styles.changeAvatarButton}>
            Сменить аватар
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div className={styles.fullName}>{userProfile.fullName}</div>
      <div className={styles.commentsContainer}>
        <h2>Комментарии пользователя</h2>
        <div className={styles.commentList}>
          {reviews.length != 0 ? (
            reviews.map((review, index) => (
              <div key={index} className={styles.commentItem}>
                <div className={styles.container}>
                  <img
                    src={String(getMovieImageById(review.movies_data_id))}
                    alt={review.movie_name}
                    className={styles.image}
                  />
                  <div className={styles.header}>{review.movie_name}</div>
                  <div className={styles.review}>Отзыв: {review.review}</div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ fontSize: '20px', padding: '10px 0' }}>Комментариев пока нет</div>
          )}
        </div>
      </div>
      <AvatarModal
        isOpen={isAvatarModalOpen}
        onRequestClose={() => setIsAvatarModalOpen(false)}
        onSelectAvatar={handleSelectAvatar}
      />
    </div>
  );
};
