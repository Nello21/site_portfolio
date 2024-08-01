import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMovieIsLoading, getMovie, clearMovieStore } from 'store/cinema/oneMovieSlice';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { getOneMovie } from 'store/cinema/effects';
import { fetchReviews, fetchAllUsers, fetchUser } from 'features/auth/model/store/effects';
import { ROUTES } from 'router/routes';
import { CommentForm } from 'features/create-review/ui';
import { addFavoriteMovie, deleteFavoriteMovie } from 'features/favorite-movies/model/store/effects';
import { getAuthUser, getAuthUserToken } from 'features/auth/model/store/slice';
import { getUserFavoriteMovies } from 'features/auth/model/store/userProfileSlice';
import clsx from 'clsx';
import StarSVG from 'shared/assets/icons/star.svg';
import HeartSVG from 'shared/assets/icons/heart.svg';
import { Loader } from 'shared/components/Loader/loader';
import styles from './oneMoviePage.module.css';
import { getReviews } from 'features/auth/model/store/reviewsSlice';
import { getAllUsers } from 'features/auth/model/store/allUsersSlice';

export const OneMovieContent = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const movie = useSelector(getMovie);
  const users = useSelector(getAllUsers);
  const reviews = useSelector(getReviews);
  const isLoading = useSelector(getMovieIsLoading);
  const favoriteMovieIds = useSelector(getUserFavoriteMovies);
  console.log(favoriteMovieIds);

  const token = useSelector(getAuthUserToken);

  const commentFormRef = useRef<HTMLDivElement>(null);

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [isFavorite, setIsFavorite] = useState(false);

  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const movieId = Number(id);

  const getUserFullnameByReviewId = (id: number | null) => {
    const user = users.find(user => user.id === id);
    return user ? user.fullName : null;
  };

  const getUserAvatarByReviewId = (id: number | null) => {
    const user = users.find(user => user.id === id);
    return user ? user.avatar : null;
  };

  useEffect(() => {
    if (id) {
      // dispatch(fetchUser());
      dispatch(fetchAllUsers());
      dispatch(getOneMovie(id));
      dispatch(fetchReviews(id));
    }

    if (id && favoriteMovieIds && favoriteMovieIds !== null) {
      setIsFavorite(favoriteMovieIds.includes(Number(id)));
    }

    return () => {
      dispatch(clearMovieStore());
    };
  }, [dispatch, id, favoriteMovieIds]);

  if (isLoading) return <Loader />;
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
      let filled = false;
      if (i <= (hoveredRating || rating)) {
        filled = true;
      }
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
            <div className={styles.ratingLabel}>Рейтинг</div>
            <div className={styles.rating}>{renderStarRating()}</div>
          </div>

          {token ? (
            <div className={styles.favoriteButtonContainer}>
              <div className={styles.favoriteButtonLabel}>Добавить в избранное </div>
              <div className={styles.favoriteButton} onClick={handleToggleFavorite}>
                <HeartSVG
                  width="32"
                  height="32"
                  className={clsx(styles.heartButton, { [styles.filledHeart]: isFavorite })}
                />
              </div>
            </div>
          ) : (
            <div className={styles.favoriteButtonLabel}>Войдите для добавления в избранное</div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              className={clsx(styles.watchButton, { [styles.closeButton]: isVideoVisible })}
              onClick={handleWatchClick}
            >
              {isVideoVisible ? 'Закрыть' : 'Смотреть трейлер'}
            </button>
            {isVideoVisible && (
              <div>
                <iframe
                  className={styles.iframe}
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/_WZCvQ5J3pk?si=vIPAKHfHtuFB_YD3"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <h2>Описание</h2>
        <p>{movie.description}</p>
      </div>
      <h2>Отзывы</h2>
      {reviews.map((review, index) => (
        <div className={styles.comments} key={index}>
          {review && (
            <div>
              <Link
                to={`${ROUTES.userProfile}/${review.user_id}`}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  color: 'white',
                }}
              >
                <img
                  src={String(getUserAvatarByReviewId(review.user_id))}
                  alt="Avatar"
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  className={styles.image}
                />
                <div style={{ padding: '10px', fontSize: '22px' }} className={styles.userName}>
                  {getUserFullnameByReviewId(review.user_id)}
                </div>
              </Link>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '10px', fontSize: '20px', gap: '5px' }}>
            {review.review}
            <div style={{ fontFamily: 'Teko', fontSize: ' 20px' }}>
              Оценка:{' '}
              <span
                style={
                  review.rating && review.rating > 7
                    ? { color: 'green' }
                    : review.rating && review.rating >= 5
                      ? { color: 'goldenrod' }
                      : { color: 'red' }
                }
              >
                {review.rating}
              </span>
            </div>
          </div>
        </div>
      ))}
      <div ref={commentFormRef}>
        <h2>оставить комментарий</h2>
        <CommentForm movie_name={movie.name} movieId={movieId} rating={rating} />
      </div>
    </div>
  );
};
