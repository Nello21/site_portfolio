import React, { useRef, useState } from 'react';
import { cinemaData } from '../../../../types/cinemaData';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import PlayButton from 'shared/assets/icons/play-button.svg';
import styles from './cinemaOneCard.module.css';

type PostCardProps = {
  card: cinemaData;
  className?: string;
  style?: React.CSSProperties;
  hasMoved?: boolean;
  hideAttributes?: boolean;
};

export const CinemaOneCard = ({ card, className, style, hasMoved, hideAttributes }: PostCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (hasMoved) {
      e.preventDefault();
    }
  };
  return (
    <motion.div layout>
      <div className={styles.card} style={style}>
        <Link to={`${ROUTES.root}${card.id}`} className={styles.container} draggable="false" onClick={handleClick}>
          <img src={card.image} className={className} style={style} draggable="false" />
          <div className={styles.text} draggable="false">
            {card.rating}
          </div>
          <div className={styles.playButton}>
            <PlayButton width={80} height={80} className={styles.svg} />
          </div>
        </Link>
      </div>
    </motion.div>
  );
};
