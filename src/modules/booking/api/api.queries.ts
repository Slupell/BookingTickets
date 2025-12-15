import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { fetchBookings } from 'src/modules/booking/api/api.methods'
import type { FetchUserBookingResponse } from 'src/modules/booking/api/api.types'

export const BOOKING_QUERY_KEYS = {
  FETCH_BOOKING: ['fetchBooking'],
}

export const useBookingUserQuery = ({
  options,
}: {
  options?: Omit<
    UseQueryOptions<FetchUserBookingResponse[], AxiosError<TErrorResponse>>,
    'queryKey' | 'queryFn'
  >
} = {}) => {
  return useQuery({
    queryKey: BOOKING_QUERY_KEYS.FETCH_BOOKING,
    queryFn: fetchBookings,
    ...options,
  })
}
