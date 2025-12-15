export const MOVIES_PATH = '/movies'
export const MOVIES_SESSIONS_PATH = `:id/sessions`
export const MOVIES_SESSIONS_ROUTE = `${MOVIES_PATH}/${MOVIES_SESSIONS_PATH}`

export const MOVIES_ROUTE = MOVIES_PATH

export const CINEMAS_PATH = '/cinemas'
export const CINEMAS_ROUTE = CINEMAS_PATH
export const CINEMAS_SESSIONS_PATH = ':id/sessions'
export const CINEMAS_SESSIONS_ROUTE = `${CINEMAS_PATH}/${CINEMAS_SESSIONS_PATH}`

export const MOVIE_SESSION_PATH = `/movieSessions`
export const MOVIE_SESSION_ROUTE = `${MOVIE_SESSION_PATH}/:sessionId`
export const MOVIE_BOOKING_SESSION_ROUTE = `${MOVIE_SESSION_ROUTE}/bookings`

export const MY_TICKETS_PATH = '/tickets'
export const MY_TICKETS_ROUTE = MY_TICKETS_PATH

export const LOGIN_PATH = '/login'
export const LOGIN_ROUTE = LOGIN_PATH

export const REGISTRATION_PATH = '/registration'
export const REGISTRATION_ROUTE = REGISTRATION_PATH
