import { useMemo } from 'react'
import { useBookingUserQuery } from 'src/modules/booking/api'
import { useFetchSessionsQuery } from 'src/modules/session/api'
import { useSessionInfo } from 'src/modules/session/hooks/useSessionInfo'
import { useFetchSettingsQuery } from 'src/modules/settings/api.queries'

type SeatView = {
  rowNumber: number
  seatNumber: number
}

export type UserBookingView = {
  id: string
  isPaid: boolean
  movieTitle: string
  cinemaName: string
  startTime: string
  seats: SeatView[]
  secondsLeft: number | null
}

type UseUserTicketsResult = {
  isPending: boolean
  isError: boolean
  unpaid: UserBookingView[]
  upcoming: UserBookingView[]
  past: UserBookingView[]
}

export const useUserTickets = (): UseUserTicketsResult => {
  const {
    data: bookings,
    isPending: isBookingsLoading,
    isError: isBookingsError,
  } = useBookingUserQuery()

  const {
    data: settings,
    isPending: isSettingsLoading,
    isError: isSettingsError,
  } = useFetchSettingsQuery()

  const paymentSeconds = settings?.bookingPaymentTimeSeconds ?? 0

  const firstBooking = bookings?.[0] ?? null
  const sessionId = firstBooking ? Number(firstBooking.movieSessionsId) : null

  const {
    data: sessionDetails,
    isPending: isSessionLoading,
    isError: isSessionError,
  } = useFetchSessionsQuery({ id: sessionId ?? 0, options: { enabled: !!sessionId } })

  const {
    movie,
    cinema,
    isPending: isInfoLoading,
    isError: isInfoError,
  } = useSessionInfo(sessionDetails ?? null)

  const isPending = isBookingsLoading || isSettingsLoading || isSessionLoading || isInfoLoading
  const isError = isBookingsError || isSettingsError || isSessionError || isInfoError

  const { unpaid, upcoming, past } = useMemo(() => {
    const result = {
      unpaid: [] as UserBookingView[],
      upcoming: [] as UserBookingView[],
      past: [] as UserBookingView[],
    }

    if (!bookings || !sessionDetails || !movie || !cinema) {
      return result
    }

    const now = new Date()
    const nowMs = now.getTime()

    bookings.forEach((b) => {
      const startTime = sessionDetails.startTime
      const start = new Date(startTime)

      let secondsLeft: number | null = null
      if (!b.isPaid && paymentSeconds && b.bookedAt) {
        const expiresAt = new Date(b.bookedAt).getTime() + paymentSeconds * 1000
        const diff = Math.floor((expiresAt - nowMs) / 1000)
        secondsLeft = diff > 0 ? diff : 0
      }

      const view: UserBookingView = {
        id: b.id,
        isPaid: b.isPaid,
        movieTitle: movie.title,
        cinemaName: cinema.name,
        startTime,
        seats: Array.isArray(b.seats) ? b.seats : [b.seats],
        secondsLeft,
      }

      if (!b.isPaid && secondsLeft !== null && secondsLeft > 0) {
        result.unpaid.push(view)
      } else if (b.isPaid && start > now) {
        result.upcoming.push(view)
      } else if (b.isPaid && start <= now) {
        result.past.push(view)
      }
    })

    return result
  }, [bookings, sessionDetails, movie, cinema, paymentSeconds])

  return {
    isPending,
    isError,
    unpaid,
    upcoming,
    past,
  }
}
