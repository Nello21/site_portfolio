import React, { useRef, useState } from 'react';
import { cinemaData } from '../../../../types/cinemaData';
import styles from './cinemaOneCard.module.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router/routes';

type PostCardProps = {
  post: cinemaData;
  className?: string;
};

export const CinemaOneCard = ({ post, className }: PostCardProps) => {
  return (
    <motion.div layout>
      <div className={styles.article}>
        <Link to={`${ROUTES.root}${post.id}`}>
          <img src={post.image} className={className} />
          <div className={styles.text}>{post.rating}</div>
        </Link>
      </div>
    </motion.div>
  );
};
