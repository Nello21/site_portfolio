import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMovieIsLoading, getMovie, clearMovieStore } from 'store/cinema/oneMovieSlice';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { getOneMovie } from 'store/cinema/effects';
import { fetchReviewsWithUsers } from 'features/auth/model/store/effects';
import { getReviewsWithUser } from 'features/auth/model/store/reviewsSlice';
import styles from './oneMovieContent.module.css';
import clsx from 'clsx';
import { ROUTES } from 'router/routes';
import { CommentForm } from 'features/create-review/ui';

export const OneMovieContent = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const movie = useSelector(getMovie);
  const reviews = useSelector(getReviewsWithUser);
  console.log(reviews);
  const isLoading = useSelector(getMovieIsLoading);

  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getOneMovie(id));
      dispatch(fetchReviewsWithUsers(id));
    }
    return () => {
      dispatch(clearMovieStore());
    };
  }, [dispatch, id]);

  if (isLoading) return <div>Загрузка...</div>;
  if (!movie) return <div>Нет данных</div>;

  const renderStarRating = () => {
    const filledStars = movie.rating;
    const remainingPercentage = (movie.rating - filledStars) * 100;

    const stars = [];

    for (let i = 0; i < 10; i++) {
      const starStyle: React.CSSProperties = {};

      if (i < filledStars) {
        starStyle.width = '100%'; // Заполняем звезду полностью
      } else if (i === filledStars && remainingPercentage > 0) {
        starStyle.backgroundSize = `${remainingPercentage}%`; // Устанавливаем ширину для частично заполненной звезды
      }

      stars.push(
        <span key={i} className={styles.starFilled} style={starStyle}>
          &#9733;
        </span>,
      );
    }

    return stars;
  };

  const handleWatchClick = () => {
    setIsVideoVisible(prev => !prev);
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
      <div>
        <h2>оставить комментарий</h2>
        <CommentForm movie_name={movie.name} movieId={Number(id)} />
      </div>
    </div>
  );
};
