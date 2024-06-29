import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import styles from './carousel.module.css';
import { CinemaOneCard } from 'shared/features/CinemaCards/ui/CinemaCard';
import { cinemaData } from 'shared/types/cinemaData';

export const Carousel3d = ({ cards }: { cards: cinemaData[] }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const [degreeX, setDegreeX] = useState(0);
  const [degreeY, setDegreeY] = useState(0);
  const [prevDegreeX, setPrevDegreeX] = useState(15);
  const [prevDegreeY, setPrevDegreeY] = useState(-16);

  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const handleOnDown = (e: any) => {
    const clientX = (e as MouseEvent).clientX ?? (e as TouchEvent).touches[0].clientX;
    const clientY = (e as MouseEvent).clientY ?? (e as TouchEvent).touches[0].clientY;
    setIsDragging(true);
    setStartX(clientX);
    setStartY(clientY);
    setHasMoved(false);
  };

  const handleOnUp = useCallback(() => {
    setIsDragging(false);
    setPrevDegreeX(degreeX);
    setPrevDegreeY(degreeY);
    const track = sliderRef.current;
    if (track) {
      track.style.transform = `perspective(1000px) rotateX(${degreeY}deg) rotateY(${degreeX}deg)`;
    }
  }, [degreeX, degreeY]);

  const handleOnMove = useCallback(
    (e: any) => {
      if (!isDragging) return;

      setHasMoved(true);
      const track = sliderRef.current;

      const clientX = (e as MouseEvent).clientX ?? (e as TouchEvent).touches[0].clientX;
      const clientY = (e as MouseEvent).clientY ?? (e as TouchEvent).touches[0].clientY;
      const mouseDeltaX = startX - clientX;
      const mouseDeltaY = startY - clientY;
      const maxDelta = window.innerWidth;

      const newDegreeX = (mouseDeltaX / maxDelta) * -100;
      const nextDegreeX = prevDegreeX + newDegreeX;
      const newDegreeY = (mouseDeltaY / maxDelta) * 100;
      let nextDegreeY = prevDegreeY + newDegreeY;

      nextDegreeY = Math.max(Math.min(nextDegreeY, -3), -18);

      setDegreeX(nextDegreeX);
      setDegreeY(nextDegreeY);
      console.log('new', newDegreeY);
      console.log('next', nextDegreeY);

      if (track) {
        track.animate(
          {
            transform: `perspective(1000px) rotateX(${nextDegreeY}deg) rotateY(${nextDegreeX}deg)`,
          },
          { duration: 4000 },
        );
      }
    },
    [isDragging, startX, startY, prevDegreeX, prevDegreeY],
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
      className={styles.banner}
      onMouseDown={handleOnDown}
      onTouchStart={handleOnDown}
      onMouseMove={handleOnMove}
      onTouchMove={handleOnMove}
    >
      <div className={styles.slider} style={{ '--quantity': '12' } as CSSProperties} ref={sliderRef}>
        {cards.map(card => (
          <div className={styles.item} key={card.id} style={{ '--position': `${card.id}` } as CSSProperties}>
            <CinemaOneCard card={card} className={styles.image} hasMoved={hasMoved} />
          </div>
        ))}
      </div>
    </div>
  );
};
