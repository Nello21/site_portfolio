import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMovieIsLoading, getMovie, clearMovieStore } from 'store/cinema/oneMovieSlice';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { getOneMovie } from 'store/cinema/effects';
import { fetchReviewsWithUsers, fetchUser } from 'features/auth/model/store/effects';
import { getReviewsWithUser } from 'features/auth/model/store/reviewsSlice';
import { ROUTES } from 'router/routes';
import { CommentForm } from 'features/create-review/ui';
import { addFavoriteMovie, deleteFavoriteMovie } from 'features/favorite-movies/model/store/effects';
import styles from './oneMovieContent.module.css';
import clsx from 'clsx';
import StarSVG from 'shared/assets/icons/star.svg';
import HeartSVG from 'shared/assets/icons/heart.svg';
import {
  getAuthUserFavoriteMovies,
  getAuthUserId,
  getAuthUserToken,
  userActions,
} from 'features/auth/model/store/slice';
import { getUserFavoriteMovies } from 'features/auth/model/store/userProfileSlice';

export const OneMovieContent = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const movie = useSelector(getMovie);
  const reviews = useSelector(getReviewsWithUser);
  const isLoading = useSelector(getMovieIsLoading);

  const commentFormRef = useRef<HTMLDivElement>(null);

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const userId = useSelector(getAuthUserId);
  console.log(userId);
  const token = useSelector(getAuthUserToken);
  const favoriteMovieIds = useSelector(getUserFavoriteMovies);
  console.log(favoriteMovieIds);

  const [isFavorite, setIsFavorite] = useState(false);

  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const movieId = Number(id);

  useEffect(() => {
    if (id) {
      dispatch(getOneMovie(id));
      dispatch(fetchReviewsWithUsers(id));
    }

    if (favoriteMovieIds !== null) {
      setIsFavorite(favoriteMovieIds.includes(Number(id)));
    }

    return () => {
      dispatch(clearMovieStore());
    };
  }, [dispatch, id, favoriteMovieIds]);

  if (isLoading) return <div>Загрузка...</div>;
  if (!movie) return <div>Нет данных</div>;

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(deleteFavoriteMovie(movieId));
    } else {
      dispatch(addFavoriteMovie(movieId));
    }
    setIsFavorite(!isFavorite);
  };

  const handleStarClick = (value: number) => {
    setRating(value);
    commentFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStarHover = (value: number) => {
    setHoveredRating(value);
  };

  const handleWatchClick = () => {
    setIsVideoVisible(prev => !prev);
  };

  const renderStarRating = () => {
    const stars = [];

    for (let i = 1; i <= 10; i++) {
      const filled = i <= (hoveredRating || rating);
      stars.push(
        <StarSVG
          key={i}
          width="32"
          height="32"
          className={clsx(styles.star, { [styles.filledStar]: filled })}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={() => handleStarHover(0)}
        />,
      );
    }

    return stars;
  };

  return (
    <div className={styles.container}>
      <div className={styles.movieInfo}>
        <div className={styles.imageSection}>
          <img src={movie.image} alt="Постер" className={styles.poster} />
          <div className={styles.ratingSection}>
            <div style={{ textAlign: 'center', fontSize: '20px' }}>Рейтинг: </div>
            <div className={styles.rating}>{renderStarRating()}</div>
          </div>

          {token ? (
            <div className={styles.favoriteButtonContainer}>
              <div className={styles.favoriteButtonLabel}>Добавить в избранное</div>
              <div className={styles.favoriteButton} onClick={handleToggleFavorite}>
                <HeartSVG width="32" height="32" fill={isFavorite ? '#FF0000' : 'none'} />
              </div>
            </div>
          ) : (
            <div className={styles.favoriteButtonLabel}>Войдите для добавления в избранное</div>
          )}
        </div>
        <div>
          <button
            style={{ textAlign: 'center' }}
            className={clsx(styles.watchButton, { [styles.closeButton]: isVideoVisible })}
            onClick={handleWatchClick}
          >
            {isVideoVisible ? 'Закрыть' : 'Смотреть трейлер'}
          </button>
          {isVideoVisible && (
            <div style={{ borderRadius: '10px', marginTop: '10px' }}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/_WZCvQ5J3pk?si=vIPAKHfHtuFB_YD3"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
      <div className={styles.description}>
        <h2>Описание</h2>
        <p>{movie.description}</p>
        <h2>Отзывы</h2>
        {reviews.map((review, index) => (
          <div style={{ padding: '10px' }} key={index}>
            {review.user && (
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Link to={`${ROUTES.userProfile}/${review.user.id}`} style={{ textDecoration: 'none' }}>
                  <img
                    src={String(review.user.avatar)}
                    alt="Avatar"
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                </Link>
                <div style={{ padding: '10px', fontSize: '22px' }}>{review.user.fullName}</div>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '10px', fontSize: '18px' }}>
              {review.review}
            </div>
            <div>Оценка: {review.rating}</div>
          </div>
        ))}
      </div>
      <div ref={commentFormRef}>
        <h2>оставить комментарий</h2>
        <CommentForm movie_name={movie.name} movieId={movieId} rating={rating} />
      </div>
    </div>
  );
};
