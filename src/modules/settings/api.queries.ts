import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { fetchSettings } from './api/api.methods'
import type { FetchSettingsResponse } from './api/api.types'

const SETTINGS_QUERY_KEYS = {
  FETCH_SETTINGS: ['fetchSettings'],
}

export const useFetchSettingsQuery = ({
  options,
}: {
  options?: Omit<
    UseQueryOptions<FetchSettingsResponse, AxiosError<TErrorResponse>>,
    'queryKey' | 'queryFn'
  >
} = {}) => {
  return useQuery({
    queryKey: SETTINGS_QUERY_KEYS.FETCH_SETTINGS,
    queryFn: fetchSettings,
    ...options,
  })
}
