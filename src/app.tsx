import { SearchProvider } from 'features/core/searchContext/searchContext';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from 'router/router';
import { rootStore } from 'store';

export const App = () => {
  return (
    <SearchProvider>
      <Provider store={rootStore}>
        <RouterProvider router={router} />;
      </Provider>
    </SearchProvider>
  );
};
