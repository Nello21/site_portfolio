import React, { useRef, useState } from 'react';
import { cinemaData } from '../../../../types/cinemaData';
import styles from './cinemaOneCard.module.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router/routes';

type PostCardProps = {
  card: cinemaData;
  className?: string;
  style?: React.CSSProperties;
  hasMoved?: boolean;
};

export const CinemaOneCard = ({ card, className, style, hasMoved }: PostCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (hasMoved) {
      e.preventDefault();
    }
  };
  return (
    <motion.div layout>
      <div className={styles.card} style={style}>
        <Link to={`${ROUTES.root}${card.id}`} draggable="false" onClick={handleClick}>
          <img src={card.image} className={className} style={style} draggable="false" />
          <span className={styles.text}>{card.rating}</span>
        </Link>
      </div>
    </motion.div>
  );
};
