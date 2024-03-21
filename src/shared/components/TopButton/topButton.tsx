import React, { useEffect, useState } from 'react';
import styles from './topButton.module.css';

export const ButtonToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className={`${styles.buttonToTop} ${isVisible ? styles.visible : styles.hidden}`} onClick={scrollToTop}>
      Наверх
    </button>
  );
};
