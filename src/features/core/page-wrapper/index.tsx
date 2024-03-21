import React, { ReactNode } from 'react';
import { BaseContainer } from './base-container.tsx';
import { Header } from './navbar';
import { ContentWrapper } from './content-wrapper';
import { Sidebar } from './sidebar';
import { MainContent } from './main-content/index';

export const PageWrapper = ({
  children,
  onSearch,
}: {
  children: ReactNode;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <BaseContainer>
      <Header onSearch={onSearch} />
      <ContentWrapper>
        <Sidebar />
        <MainContent>{children}</MainContent>
      </ContentWrapper>
    </BaseContainer>
  );
};
