import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { bookSeatInSession } from './api.methods'
import type { BookInSessionRequest, BookInSessionResponse } from './api.types'

export const useBookSeatInSessionMutations = (
  options?: Omit<
    UseMutationOptions<BookInSessionResponse, AxiosError<TErrorResponse>, BookInSessionRequest>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useMutation({
    mutationFn: bookSeatInSession,
    ...options,
  })
}
