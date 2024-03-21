import { ReactNode } from 'react';
import style from './content-wrapper.module.css';

export const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return <div className={style.root}>{children}</div>;
};
