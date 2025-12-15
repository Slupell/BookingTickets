import type { BookedSeat } from 'src/modules/session/api/api.types'

export interface FetchUserBookingResponse {
  id: string
  userId: string
  movieSessionsId: number
  seats: BookedSeat
  isPaid: boolean
  bookedAt: string
}

export interface FetchUserBookingTicketsResponse {
  message: string
}

export interface FetchUserBookingTicketsRequest {
  bookingId: string
}
