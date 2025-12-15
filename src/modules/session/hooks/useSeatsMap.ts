import { useFetchSessionsQuery } from 'src/modules/session/api'
import type { FetchMoviesSessionByIdResponse } from 'src/modules/session/api/api.types'

type UseSeatMapResult = {
  isPending: boolean
  isError: boolean
  rows: number
  seatsPerRow: number
  bookedSet: Set<string>
  sessionDetails: FetchMoviesSessionByIdResponse | null
}

export const useSeatMap = (sessionId: string): UseSeatMapResult => {
  const { data, isPending, isError } = useFetchSessionsQuery({ id: Number(sessionId) })

  if (!data) {
    return {
      isPending,
      isError,
      rows: 0,
      seatsPerRow: 0,
      bookedSet: new Set(),
      sessionDetails: null,
    }
  }

  const rows = data.seats.rows
  const seatsPerRow = data.seats.seatsPerRow

  const bookedSet = new Set(data.bookedSeats.map((s) => `${s.rowNumber}-${s.seatNumber}`))

  return {
    isPending: false,
    isError: false,
    rows,
    seatsPerRow,
    bookedSet,
    sessionDetails: data,
  }
}
