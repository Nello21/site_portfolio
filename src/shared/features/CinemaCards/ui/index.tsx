import { useEffect, useRef, useState } from 'react';
import { CinemaOneCard } from './CinemaCard';
import { cinemaData } from '../../../types/cinemaData';
import styles from './cinemaCards.module.css';
import Arrow from 'shared/assets/icons/arrow.svg';

export const CinemaCards = ({ cards }: { cards: cinemaData[] }) => {
  const itemsRef = useRef<HTMLDivElement>(null);
  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [itemWidth, setItemWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [imageIndex, setImageIndex] = useState(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const showNextImages = (scrollAmount: number) => {
    setImageIndex(index => {
      if (index === cards.length - scrollAmount) return 0;
      return index + scrollAmount;
    });
  };

  const showPrevImages = (scrollAmount: number) => {
    setImageIndex(index => {
      if (index === 0) return cards.length - scrollAmount;
      return index - scrollAmount;
    });
  };

  const handleMouseDown = (e: any) => {
    setIsMouseDown(true);
    if (itemsRef && itemsRef.current) {
      setStartX(e.clientX);
      setScrollLeft(itemsRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: any) => {
    if (!isMouseDown) return;
    e.preventDefault();
    if (itemsRef && itemsRef.current) {
      const x = e.clientX - itemsRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      itemsRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    if (windowWidth > 1024) {
      setItemWidth(4);
    }
    if (windowWidth <= 1024) {
      setItemWidth(3);
    }
    if (windowWidth <= 768) {
      setItemWidth(2);
    }
    if (windowWidth <= 530) {
      setItemWidth(1);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  return (
    <div className={styles.container}>
      <div
        className={styles.content}
        ref={itemsRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {cards.map(card => (
          <CinemaOneCard card={card} key={card.id} style={{ translate: `${-105 * imageIndex}%` }} />
        ))}
      </div>
      <button
        ref={leftButtonRef}
        className={styles.leftScrollButton}
        onClick={() => {
          showPrevImages(itemWidth);
        }}
      >
        <Arrow className={styles.arrowButton} style={{ rotate: '180deg' }} />
      </button>
      <button
        ref={rightButtonRef}
        className={styles.rightScrollButton}
        onClick={() => {
          showNextImages(itemWidth);
        }}
      >
        <Arrow className={styles.arrowButton} />
      </button>
    </div>
  );
};
