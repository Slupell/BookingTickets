import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { fetchMovies, fetchMovieSessions } from './api.methods'
import type { FetchMovieSessionsResponse, FetchMoviesResponse } from './api.types'

const MOVIES_QUERY_KEYS = {
  FETCH_MOVIES: ['fetchMovies'],
  FETCH_MOVIE_SESSIONS: ['fetchMovieSessions'],
}

export const useFetchMoviesQuery = ({
  options,
}: {
  options?: Omit<
    UseQueryOptions<FetchMoviesResponse[], AxiosError<TErrorResponse>>,
    'queryKey' | 'queryFn'
  >
} = {}) => {
  return useQuery({ queryKey: MOVIES_QUERY_KEYS.FETCH_MOVIES, queryFn: fetchMovies, ...options })
}

export const useFetchMovieSessionsQuery = ({
  id,
  options,
}: {
  id: string
  options?: Omit<
    UseQueryOptions<FetchMovieSessionsResponse[], AxiosError<TErrorResponse>>,
    'queryKey' | 'queryFn'
  >
}) => {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.FETCH_MOVIE_SESSIONS,
    queryFn: () => fetchMovieSessions(id),
    enabled: Boolean(id),
    ...options,
  })
}
