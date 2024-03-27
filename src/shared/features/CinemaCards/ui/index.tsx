import React, { useEffect, useRef, useState } from 'react';
import { CinemaOneCard } from './CinemaCard';
import { cinemaData } from '../../../types/cinemaData';
import styles from './cinemaCards.module.css';

const ITEM_WIDTH = 830;

export const CinemaCards = ({ cards }: { cards: cinemaData[] }) => {
  const itemsRef = useRef<HTMLInputElement>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);

  const handleMouseClick = (scrollAmount: number) => {
    if (itemsRef.current) {
      smoothScroll(itemsRef.current, scrollAmount);
    }
  };

  const smoothScroll = (e: HTMLElement, scrollAmount: number) => {
    const step = 20;
    let count = 0;

    const scroll = () => {
      if (count < Math.abs(scrollAmount)) {
        e.scrollBy(scrollAmount > 0 ? step : -step, 0);
        count += step;
        requestAnimationFrame(scroll);
      }
    };

    scroll();
  };

  useEffect(() => {
    const currentItemsRef = itemsRef.current;
    const handleScroll = () => {
      if (currentItemsRef) {
        const scrollPosition = currentItemsRef.scrollLeft;
        if (scrollPosition <= 0) {
          if (leftButtonRef.current) {
            leftButtonRef.current.style.opacity = '0';
            leftButtonRef.current.disabled = true;
          }
          if (rightButtonRef.current) {
            rightButtonRef.current.style.opacity = '1';
            rightButtonRef.current.disabled = false;
          }
        } else if (scrollPosition >= ITEM_WIDTH) {
          if (rightButtonRef.current) {
            rightButtonRef.current.style.opacity = '0';
            rightButtonRef.current.disabled = true;
          }
          if (leftButtonRef.current) {
            leftButtonRef.current.style.opacity = '1';
            leftButtonRef.current.disabled = false;
          }
        }
      }
    };

    if (currentItemsRef) {
      currentItemsRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentItemsRef) {
        currentItemsRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleMouseDown = (e: any) => {
    setIsMouseDown(true);
    if (itemsRef && itemsRef.current) {
      setStartX(e.pageX - -itemsRef.current.offsetLeft);
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
      const x = e.pageX - itemsRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      itemsRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className={styles.container}>
      <button
        ref={leftButtonRef}
        className={styles.leftScrollButton}
        onClick={() => {
          handleMouseClick(-ITEM_WIDTH);
        }}
      >
        Л
      </button>
      <button
        ref={rightButtonRef}
        className={styles.rightScrollButton}
        onClick={() => {
          handleMouseClick(ITEM_WIDTH);
        }}
      >
        П
      </button>
      <div
        className={styles.content}
        ref={itemsRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {cards.map(card => (
          <CinemaOneCard post={card} key={card.id} />
        ))}
      </div>
    </div>
  );
};
