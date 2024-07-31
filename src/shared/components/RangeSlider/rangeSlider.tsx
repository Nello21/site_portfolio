import React, { useRef, useState } from 'react';
import styles from './rangeSlider.module.css';
import ReactSlider from 'react-slider';

const MIN = 1970;
const MAX = 2024;

interface RangeSliderProps {
  onChange: (newRange: number[]) => void;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({ onChange }) => {
  const thumbRef = useRef(null);

  const [values, setValues] = useState([MIN, MAX]);

  const handleChange = (newValue: any) => {
    setValues(newValue);
    onChange(newValue);
  };

  const handleInputChange1 = (e: any) => {
    const results = [e.target.value, values[1]];
    setValues(results);
    onChange(results);
  };
  const handleInputChange2 = (e: any) => {
    const results = [values[0], e.target.value];
    setValues(results);
    onChange(results);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <span style={{ color: 'black' }}>Ввести год</span>
        <div className={styles.Years}>
          <input className={styles.input} value={values[0]} type="text" onChange={handleInputChange1} />
          -
          <input className={styles.input} value={values[1]} type="text" onChange={handleInputChange2} />
        </div>
      </div>

      <div className={styles.box}>
        <span style={{ color: 'black' }}>Выбрать диапазон</span>
        <div className={styles.slider}>
          <ReactSlider
            className={styles.sliderLine}
            trackClassName={`${styles.track}`}
            thumbClassName={styles.thumb}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            minDistance={1}
            pearling={true}
            value={values}
            min={MIN}
            max={MAX}
            onChange={handleChange}
            ref={thumbRef}
          />
        </div>
      </div>
    </div>
  );
};
