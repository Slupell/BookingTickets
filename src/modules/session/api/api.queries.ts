import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { fetchMovieSessionDetailsById } from './api.methods'
import type { FetchMoviesSessionByIdResponse } from './api.types'

const SESSIONS_QUERY_KEYS = {
  FETCH_SESSIONS: ['fetchSessions'],
}

export const useFetchSessionsQuery = ({
  id,
  options,
}: {
  id: number
  options?: Omit<
    UseQueryOptions<FetchMoviesSessionByIdResponse, AxiosError<TErrorResponse>>,
    'queryKey' | 'queryFn'
  >
}) => {
  return useQuery({
    queryKey: SESSIONS_QUERY_KEYS.FETCH_SESSIONS,
    queryFn: () => fetchMovieSessionDetailsById(id),
    ...options,
  })
}
