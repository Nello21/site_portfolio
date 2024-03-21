import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMovieIsLoading, getMovie, clearMovieStore } from 'store/cinema/oneMovieSlice';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { getOneMovie } from 'store/cinema/effects';
import { fetchUser, fetchUserReviews } from 'features/auth/model/store/effects';
import { getUsers } from 'features/auth/model/store/allUsersSlice';
import styles from './oneMovieContent.module.css';
import { getUserReviews } from 'features/auth/model/store/slice';

export const OneMovieContent = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const movie = useSelector(getMovie);
  const reviews = useSelector(getUserReviews);
  const users = useSelector(getUsers);
  const isLoading = useSelector(getMovieIsLoading);

  useEffect(() => {
    if (id) {
      dispatch(getOneMovie(id));
      dispatch(fetchUserReviews(id));
    }
    return () => {
      dispatch(clearMovieStore());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (reviews.length > 0) {
      const userIds = reviews.map(review => review.user_id);
      userIds.forEach(userId => dispatch(fetchUser(String(userId))));
    }
  }, [dispatch, reviews]);

  if (isLoading) return <div>Загрузка...</div>;
  if (!movie) return <div>Нет данных</div>;

  const renderStarRating = () => {
    const filledStars = Math.round(movie.rating as number);
    const stars = [];

    for (let i = 0; i < 10; i++) {
      if (i < filledStars) {
        stars.push(
          <span key={i} className={styles.starFilled}>
            &#9733;
          </span>,
        );
      } else {
        stars.push(
          <span key={i} className={styles.starEmpty}>
            &#9733;
          </span>,
        );
      }
    }

    return stars;
  };

  const handleWatchClick = () => {
    // Handle watching the teaser video
    // You can use the 'teaser' URL here to open the video player
  };

  return (
    <div className={styles.container}>
      <div className={styles.movieInfo}>
        <div className={styles.imageSection}>
          <img src={movie.image} alt="Постер" className={styles.poster} />
          <div className={styles.ratingSection}>
            <div className={styles.rating}>Рейтинг: {renderStarRating()}</div>
          </div>
        </div>
        <div>
          <button className={styles.watchButton} onClick={handleWatchClick}>
            Смотреть
          </button>
        </div>
      </div>
      <div className={styles.description}>
        <h2>Описание</h2>
        <p>{movie.description}</p>
        {reviews.map((review, index) => {
          const currentUser = users.find(user => user.id === review.user_id);
          if (currentUser) {
            return (
              <div key={index}>
                <div>{currentUser.fullName}</div>
                <img
                  src={String(currentUser.avatar)}
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                ></img>
                <div>{review.review}</div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
