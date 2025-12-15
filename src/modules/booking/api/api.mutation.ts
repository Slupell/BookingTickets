import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { bookUserTickets } from 'src/modules/booking/api/api.methods'
import type { FetchUserBookingTicketsRequest, FetchUserBookingTicketsResponse } from './api.types'

export const useBookingTicketsUserMutation = (
  options?: Omit<
    UseMutationOptions<
      FetchUserBookingTicketsResponse,
      AxiosError<TErrorResponse>,
      FetchUserBookingTicketsRequest
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useMutation({
    mutationFn: bookUserTickets,
    ...options,
  })
}
