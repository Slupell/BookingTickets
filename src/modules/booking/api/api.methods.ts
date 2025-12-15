import type {
  FetchUserBookingResponse,
  FetchUserBookingTicketsRequest,
  FetchUserBookingTicketsResponse,
} from 'src/modules/booking/api/api.types'
import { apiClient } from 'src/services/api'

export const fetchBookings = () => {
  return apiClient.get<FetchUserBookingResponse[], FetchUserBookingResponse[]>('/me/bookings')
}

export const bookUserTickets = ({ bookingId }: FetchUserBookingTicketsRequest) => {
  return apiClient.post<FetchUserBookingTicketsResponse, FetchUserBookingTicketsResponse>(
    `/bookings/${bookingId}/payments`,
  )
}
