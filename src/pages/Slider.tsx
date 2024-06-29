import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './slider.module.css';
import { cinemaData } from 'shared/types/cinemaData';
import { CinemaOneCard } from 'shared/features/CinemaCards/ui/CinemaCard';

export const Slider = ({ cards }: { cards: cinemaData[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [startX, setStartX] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [maxPercentage, setMaxPercentage] = useState(0);

  const imageWidth = 300;
  const gap = 35;

  const handleResize = useCallback(() => {
    const track = sliderContainerRef.current;
    if (track) {
      const scrollWidth = cards.length * imageWidth + (cards.length - 1) * gap;
      const visibleWidth = track.clientWidth;
      const maxPercent = -100 * (1 - visibleWidth / scrollWidth);
      setMaxPercentage(maxPercent);
    }
  }, [cards.length]);

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const handleOnDown = (e: any) => {
    const clientX = (e as MouseEvent).clientX ?? (e as TouchEvent).touches[0].clientX;
    setIsDragging(true);
    setStartX(clientX);
    setHasMoved(false);
    console.log(maxPercentage);
  };

  const handleOnUp = useCallback(() => {
    setIsDragging(false);
    setPrevPercentage(percentage);
  }, [percentage]);

  const handleOnMove = useCallback(
    (e: any) => {
      if (!isDragging) return;

      setHasMoved(true);

      const clientX = (e as MouseEvent).clientX ?? (e as TouchEvent).touches[0].clientX;
      const mouseDelta = startX - clientX;
      const maxDelta = window.innerWidth * 2;

      const newPercentage = (mouseDelta / maxDelta) * -100;
      const nextPercentageUnconstrained = prevPercentage + newPercentage;
      const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), maxPercentage);
      setPercentage(nextPercentage);

      if (trackRef.current) {
        trackRef.current.animate(
          {
            transform: `translate(${nextPercentage}%)`,
          },
          { duration: 1200, fill: 'forwards' },
        );

        for (const image of trackRef.current.getElementsByClassName(styles.image)) {
          image.animate(
            {
              objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 1200, fill: 'forwards' },
          );
        }
      }
    },
    [isDragging, startX, prevPercentage, maxPercentage],
  );

  useEffect(() => {
    const handleDocumentMouseMove = (e: any) => {
      if (isDragging) {
        handleOnMove(e);
      }
    };

    const handleDocumentMouseUp = () => {
      if (isDragging) {
        handleOnUp();
      }
    };

    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('touchmove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);
    document.addEventListener('touchend', handleDocumentMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('touchmove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      document.removeEventListener('touchend', handleDocumentMouseUp);
    };
  }, [isDragging, handleOnMove, handleOnUp]);

  return (
    <div
      className={styles.sliderContainer}
      onMouseDown={handleOnDown}
      onTouchStart={handleOnDown}
      onMouseMove={handleOnMove}
      onTouchMove={handleOnMove}
      ref={sliderContainerRef}
    >
      <div className={styles.imageTrack} ref={trackRef} style={{ gap: `${gap}px` }}>
        {cards.map(card => (
          <CinemaOneCard
            card={card}
            key={card.id}
            hasMoved={hasMoved}
            className={styles.image}
            style={{ width: `${imageWidth}px` }}
          />
        ))}
      </div>
    </div>
  );
};
