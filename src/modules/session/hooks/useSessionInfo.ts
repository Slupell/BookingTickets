import { useFetchCinemasQuery } from 'src/modules/cinemas/api'
import type { FetchCinemasResponse } from 'src/modules/cinemas/api/api.types'
import { useFetchMoviesQuery } from 'src/modules/movies/api'
import type { FetchMoviesResponse } from 'src/modules/movies/api/api.types'
import type { FetchMoviesSessionByIdResponse } from 'src/modules/session/api/api.types'

type UseSessionInfoResult = {
  isPending: boolean
  isError: boolean
  movie: FetchMoviesResponse | null
  cinema: FetchCinemasResponse | null
}

export const useSessionInfo = (
  sessionDetails: FetchMoviesSessionByIdResponse | null,
): UseSessionInfoResult => {
  const { data: movies, isPending: isMoviesLoading, isError: isMoviesError } = useFetchMoviesQuery()
  const {
    data: cinemas,
    isPending: isCinemasLoading,
    isError: isCinemasError,
  } = useFetchCinemasQuery()

  const isPending = isMoviesLoading || isCinemasLoading
  const isError = isMoviesError || isCinemasError

  if (!sessionDetails || !movies || !cinemas) {
    return { isPending: false, isError, movie: null, cinema: null }
  }

  const movie = movies.find((m) => m.id === sessionDetails.movieId) ?? null
  const cinema = cinemas.find((c) => c.id === sessionDetails.cinemaId) ?? null

  return { isPending, isError, movie, cinema }
}
