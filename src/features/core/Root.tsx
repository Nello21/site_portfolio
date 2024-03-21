import React from 'react';
import { Header } from './page-wrapper/navbar';
import { PageWrapper } from './page-wrapper';
import { Outlet } from 'react-router-dom';

export const RootComponent = () => {
  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
};
