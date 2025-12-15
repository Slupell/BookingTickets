import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { fetchCinemas, fetchCinemaSessionsById } from './api.methods'
import type { FetchCinemaSessionsByIdResponse, FetchCinemasResponse } from './api.types'

const CINEMAS_QUERY_KEYS = {
  FETCH_CINEMAS: ['fetchCinemas'],
  FETCH_CINMEAS_SESSIONS: ['fetchCinemaSessions'],
}

export const useFetchCinemasQuery = ({
  options,
}: {
  options?: Omit<
    UseQueryOptions<FetchCinemasResponse[], AxiosError<TErrorResponse>>,
    'queryKey' | 'queryFn'
  >
} = {}) => {
  return useQuery({ queryKey: CINEMAS_QUERY_KEYS.FETCH_CINEMAS, queryFn: fetchCinemas, ...options })
}

export const useFetchCinemaSessionsQuery = ({
  id,
  options,
}: {
  id: string
  options?: Omit<
    UseQueryOptions<FetchCinemaSessionsByIdResponse[], AxiosError<TErrorResponse>>,
    'queryKey' | 'queryFn'
  >
}) => {
  return useQuery({
    queryKey: CINEMAS_QUERY_KEYS.FETCH_CINMEAS_SESSIONS,
    queryFn: () => fetchCinemaSessionsById(id),
    enabled: Boolean(id),
    ...options,
  })
}
