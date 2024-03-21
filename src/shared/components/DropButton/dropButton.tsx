import React, { ReactNode } from 'react';
import styles from './dropButton.module.css';

type DropButtonProps = {
  url?: string;
  className?: string;
  icon?: ReactNode;
  children?: ReactNode;
};

export const DropButton = ({ url, className, children }: DropButtonProps) => {
  return <div></div>;
};
