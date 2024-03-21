import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import { RootComponent } from 'features/core/Root';
import { OnlineCinema } from 'pages/onlineCinema';

export const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <RootComponent />,
    children: [{ path: ROUTES.cinema, element: <OnlineCinema /> }],
  },
]);
