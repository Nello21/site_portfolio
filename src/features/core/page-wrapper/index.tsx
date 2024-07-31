import React, { ReactNode } from 'react';
import { BaseContainer } from './base-container.tsx';
import { Header } from './navbar';
import { ContentWrapper } from './content-wrapper';
import { Sidebar } from './sidebar';
import { MainContent } from './main-content/index';
import { Footer } from './footer/index';

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <BaseContainer>
      <Header />
      <ContentWrapper>
        <Sidebar />
        <MainContent>{children}</MainContent>
      </ContentWrapper>
      <Footer />
    </BaseContainer>
  );
};
