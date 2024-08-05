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

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [imageQuantity, setimageQuantity] = useState(5);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [gap, setGap] = useState(30);

  const handleResize = useCallback(() => {
    const track = sliderContainerRef.current;
    if (track) {
      const visibleWidth = track.clientWidth;
      const imageWidth = (visibleWidth - (imageQuantity - 1) * gap) / imageQuantity;
      const imageHeight = imageWidth * 1.25;

      track.style.height = `${imageHeight}px`;

      setImageWidth(imageWidth);
      setImageHeight(imageHeight);

      const scrollWidth = cards.length * imageWidth + (cards.length - 1) * gap;

      const maxPercent = -100 * (1 - visibleWidth / scrollWidth);
      setMaxPercentage(maxPercent);
    }
    setWindowWidth(window.innerWidth);
  }, [cards.length, gap, imageQuantity]);

  useEffect(() => {
    if (windowWidth > 1280) {
      setimageQuantity(5);
      setGap(25);
    }
    if (windowWidth <= 1280) {
      setimageQuantity(5);
      setGap(20);
    }
    if (windowWidth <= 1024) {
      setimageQuantity(4);
      setGap(20);
    }
    if (windowWidth <= 768) {
      setimageQuantity(3);
      setGap(15);
    }
    if (windowWidth <= 530) {
      setimageQuantity(3);
      setGap(10);
    }
    if (windowWidth <= 320) {
      setimageQuantity(2);
      setGap(5);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, windowWidth]);

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

      if (trackRef.current && windowWidth > 1280) {
        trackRef.current.animate(
          {
            transform: `translate(${nextPercentage}%)`,
          },
          { duration: 1500, fill: 'forwards' },
        );

        for (const image of trackRef.current.getElementsByClassName(styles.image)) {
          image.animate(
            {
              objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 1500, fill: 'forwards' },
          );
        }
      } else if (trackRef.current) {
        trackRef.current.style.transform = `translate(${nextPercentage}%)`;
        trackRef.current.style.transition = 'transform 0.8s ease-in-out';

        const images = trackRef.current.getElementsByClassName(styles.image);

        for (const image of images) {
          const htmlImage = image as HTMLElement;
          htmlImage.style.objectPosition = `${100 + nextPercentage}% center`;
          htmlImage.style.transition = 'object-position 0.8s ease-in';
        }
      }
    },
    [isDragging, startX, prevPercentage, maxPercentage, windowWidth],
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
        {cards.map((card, index) => (
          <CinemaOneCard
            key={index}
            hasMoved={hasMoved}
            card={card}
            className={styles.image}
            style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
          />
        ))}
      </div>
    </div>
  );
};
