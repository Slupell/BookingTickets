import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { fetchUserLogIn, fetchUserRegistration } from './api.methods'
import type {
  FetchLoginRequest,
  FetchLoginResponse,
  FetchRegistrationRequest,
  FetchRegistrationResponse,
} from './api.types'

export const useFetchRegistationMutation = (
  options?: Omit<
    UseMutationOptions<
      FetchRegistrationResponse,
      AxiosError<TErrorResponse>,
      FetchRegistrationRequest
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useMutation({
    mutationFn: fetchUserRegistration,
    ...options,
  })
}

export const useFetchLoginMutation = (
  options?: Omit<
    UseMutationOptions<FetchLoginResponse, AxiosError<TErrorResponse>, FetchLoginRequest>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useMutation({
    mutationFn: fetchUserLogIn,
    ...options,
  })
}
