export interface FetchMoviesSessionByIdResponse {
  id: number
  movieId: number
  cinemaId: number
  startTime: string
  seats: {
    rows: number
    seatsPerRow: number
  }
  bookedSeats: BookedSeat[]
}

export type BookedSeat = {
  rowNumber: number
  seatNumber: number
}

export interface BookInSessionRequest {
  id: number
  seats: BookedSeat[]
}

export interface BookInSessionResponse {
  bookingId: string
}
