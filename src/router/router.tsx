import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import { RootComponent } from 'features/core/Root';
import { OnlineCinema } from 'pages/OnlineCinema';
import { Navigator } from 'pages/Navigator';
import { AuthPage } from 'pages/Auth';
import { Register } from 'pages/Register';
import { RootPage } from 'pages/RootPage';
import { MoviePage } from 'pages/MoviePage';

export const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <RootComponent />,
    children: [
      { path: ROUTES.root, element: <RootPage /> },
      {
        path: ROUTES.register,
        element: <Register />,
      },
      {
        path: ROUTES.auth,
        element: <AuthPage />,
      },
      { path: ROUTES.cinema, element: <OnlineCinema /> },
      { path: `${ROUTES.cinema}/:id`, element: <MoviePage /> },
      { path: ROUTES.navigator, element: <Navigator /> },
    ],
  },
]);
