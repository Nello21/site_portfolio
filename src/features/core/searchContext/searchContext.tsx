import { createContext, ReactNode, useState } from 'react';

export type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>{children}</SearchContext.Provider>;
};
