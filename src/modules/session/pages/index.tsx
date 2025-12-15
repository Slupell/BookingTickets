import { AxiosError } from 'axios'
import clsx from 'clsx'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LOGIN_ROUTE, MY_TICKETS_ROUTE } from 'src/constants/routes'
import { useBookSeatInSessionMutations } from 'src/modules/session/api/api.mutations'
import { SeatButton } from 'src/modules/session/components/seatButton'
import { SessionHeader } from 'src/modules/session/components/sessionHeader'
import { useSeatMap } from 'src/modules/session/hooks/useSeatsMap'
import { isCheckAuth } from 'src/services/isCheckAuth'

export const SeatSelectionPage = () => {
  const navigate = useNavigate()
  const { sessionId = '' } = useParams<{ sessionId: string }>()
  const [error, setError] = useState<string | null>(null)
  const { mutate: bookSeatsMutation, isPending } = useBookSeatInSessionMutations({
    onSuccess: () => {
      navigate(MY_TICKETS_ROUTE)
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data.message) {
        setError(error.response?.data.message)
      }
    },
  })

  const {
    rows,
    seatsPerRow,
    bookedSet,
    isPending: isSeatLoading,
    isError: isSeatError,
    sessionDetails,
  } = useSeatMap(sessionId)

  const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set())

  if (isSeatLoading || !sessionDetails) {
    return <div>Загрузка...</div>
  }

  if (isSeatError) {
    return <div>Ошибка загрузки</div>
  }

  const toggleSeat = (row: number, seat: number) => {
    const key = `${row}-${seat}`
    if (bookedSet.has(key)) return

    setSelectedSet((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const onClick = () => {
    const seats = [...selectedSet].map((el) => {
      const [row, seat] = el.split('-')
      return {
        rowNumber: Number(row),
        seatNumber: Number(seat),
      }
    })
    bookSeatsMutation({
      id: Number(sessionId),
      seats,
    })
  }

  const navigateToLogin = () => {
    navigate(LOGIN_ROUTE)
  }

  const isUserAuth = isCheckAuth()

  const isBigHall = seatsPerRow > 12 || rows > 10
  const seatSize = isBigHall ? 18 : 32

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-5xl flex-col gap-8 px-10 py-8">
        <SessionHeader sessionDetails={sessionDetails} />

        <section className="mt-6 flex justify-center">
          <div
            className={clsx('rounded border px-4 py-4', {
              'max-h-[520px] overflow-y-auto': isBigHall,
            })}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="w-14 text-xs" />

                <div
                  className={clsx('grid', {
                    'gap-x-[4.25px]': isBigHall,
                    'gap-x-2': !isBigHall,
                  })}
                  style={{
                    gridTemplateColumns: `repeat(${seatsPerRow}, ${seatSize}px)`,
                  }}
                >
                  {Array.from({ length: seatsPerRow }, (_, i) => (
                    <span
                      key={i}
                      className="text-center text-xs leading-none"
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>
              {Array.from({ length: rows }, (_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex items-center gap-3"
                >
                  <span className="w-14 text-xs">ряд {rowIndex + 1}</span>

                  <div
                    className={clsx('grid', {
                      'gap-[4.25px]': isBigHall,
                      'gap-2': !isBigHall,
                    })}
                    style={{
                      gridTemplateColumns: `repeat(${seatsPerRow}, ${seatSize}px)`,
                    }}
                  >
                    {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                      const rowNumber = rowIndex + 1
                      const seatNumber = seatIndex + 1
                      const key = `${rowNumber}-${seatNumber}`

                      const isBooked = bookedSet.has(key)
                      const isSelected = selectedSet.has(key)

                      return (
                        <SeatButton
                          key={key}
                          className={clsx({
                            'cursor-not-allowed bg-amber-500 opacity-60': isBooked,
                            'cursor-pointer': !isBooked,
                            'bg-blue-500 ring-2': isSelected,
                            'h-[18px] w-[18px]': isBigHall,
                            'h-8 w-8': !isBigHall,
                          })}
                          isDisabled={isBooked}
                          toggleSeat={toggleSeat}
                          seatNumber={seatNumber}
                          rowNumber={rowNumber}
                        />
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            className="rounded border px-8 py-2 text-sm"
            onClick={isUserAuth ? onClick : navigateToLogin}
            disabled={isPending}
          >
            Забронировать
          </button>
          <div>{error}</div>
        </div>
      </div>
    </main>
  )
}
