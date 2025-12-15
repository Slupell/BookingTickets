import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from 'src/components/mainLayout'
import { ProtectedLayout } from 'src/components/protectedLayout'
import {
  CINEMAS_PATH,
  CINEMAS_SESSIONS_PATH,
  LOGIN_PATH,
  MOVIE_SESSION_ROUTE,
  MOVIES_PATH,
  MOVIES_SESSIONS_PATH,
  MY_TICKETS_PATH,
  REGISTRATION_PATH,
} from 'src/constants/routes'
import { Tickets } from 'src/modules/booking/page'
import { Cinemas } from 'src/modules/cinemas/pages/main'
import { CinemaSessions } from 'src/modules/cinemas/pages/session'

import { Movies } from 'src/modules/movies/pages/main'
import { MovieSessions } from 'src/modules/movies/pages/sessions'
import { SeatSelectionPage } from 'src/modules/session/pages'
import { Login } from 'src/modules/user/pages/login'
import { Registration } from 'src/modules/user/pages/registration'

export const router = createBrowserRouter([
  {
    path: '/',

    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to={MOVIES_PATH}
            replace
          />
        ),
      },
      {
        path: MOVIES_PATH,
        children: [
          {
            index: true,
            element: <Movies />,
          },
          {
            path: MOVIES_SESSIONS_PATH,
            element: <MovieSessions />,
          },
        ],
      },
      {
        path: MOVIE_SESSION_ROUTE,
        element: <SeatSelectionPage />,
      },
      {
        path: CINEMAS_PATH,
        children: [
          {
            index: true,
            element: <Cinemas />,
          },
          {
            path: CINEMAS_SESSIONS_PATH,
            element: <CinemaSessions />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: MY_TICKETS_PATH,
            element: <Tickets />,
          },
        ],
      },
      {
        path: LOGIN_PATH,
        element: <Login />,
      },
      {
        path: REGISTRATION_PATH,
        element: <Registration />,
      },
    ],
  },

  {
    path: '*',
    element: <MainLayout />,
    children: [
      {
        path: '*',
        element: <div>not found</div>,
      },
    ],
  },
])
