import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './rangeSlider.module.css';
import ReactSlider from 'react-slider';

const MIN = 1970;
const MAX = 2024;

interface RangeSliderProps {
  onChange: (newRange: number[]) => void;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({ onChange }) => {
  const [values, setValues] = useState([MIN, MAX]);
  // const dispatch = useDispatch();

  const handleChange = (newValue: any) => {
    setValues(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.Years}>
          <div>Года</div>
          {values[0]} - {values[1]}
        </div>
        <div className={styles.slider}>
          <ReactSlider
            className={styles.sliderLine}
            thumbClassName={styles.thumb}
            onChange={handleChange}
            value={values}
            min={MIN}
            max={MAX}
          />
        </div>
      </div>
    </div>
  );
};
