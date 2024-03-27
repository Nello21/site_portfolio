import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import { RootComponent } from 'features/core/Root';
import { Navigator } from 'pages/Navigator';
import { AuthPage } from 'pages/Auth';
import { Register } from 'pages/Register';
import { RootPage } from 'pages/RootPage';
import { MoviePage } from 'pages/MoviePage';
import { UserProfile } from 'pages/UserProfile';
import { FavoriteMovies } from 'features/favorite-movies/ui';
import { OnlineCinema } from 'pages/OnlineCinema';

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
      {
        path: `${ROUTES.userProfile}/:id`,
        element: <UserProfile />,
      },
      {
        path: `${ROUTES.favorites}/:id`,
        element: <FavoriteMovies />,
      },
      {
        path: ROUTES.cinema,
        element: <OnlineCinema />,
      },
      { path: `${ROUTES.root}:id`, element: <MoviePage /> },
      { path: ROUTES.navigator, element: <Navigator /> },
    ],
  },
]);
