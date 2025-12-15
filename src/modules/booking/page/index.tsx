import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { BOOKING_QUERY_KEYS } from 'src/modules/booking/api'
import { useBookingTicketsUserMutation } from 'src/modules/booking/api/api.mutation'
import { PaymentTimer } from 'src/modules/booking/component/paymentTimer'
import { useUserTickets } from 'src/modules/booking/hooks/useUserTickets'

export const Tickets: React.FC = () => {
  const queryClient = useQueryClient()
  const { isPending, isError, unpaid, upcoming, past } = useUserTickets()

  const payMutation = useBookingTicketsUserMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKING_QUERY_KEYS.FETCH_BOOKING })
    },
  })

  if (isPending) {
    return <div className="px-12 py-8 text-sm">Загрузка...</div>
  }

  if (isError) {
    return <div className="px-12 py-8 text-sm">Ошибка при загрузке билетов</div>
  }

  const renderBooking = (b: (typeof unpaid)[number], withPayButton = false) => {
    const dateObj = new Date(b.startTime)
    const dateStr = dateObj.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
    })
    const timeStr = dateObj.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })

    return (
      <div
        key={b.id}
        className="flex items-start justify-between border-b border-neutral-700/70 py-6 last:border-0"
      >
        <div className="flex min-w-[220px] flex-col gap-1">
          <div className="text-base leading-tight">{b.movieTitle}</div>
          <div className="text-sm leading-tight">{b.cinemaName}</div>
          <div className="text-sm leading-tight">
            {dateStr} {timeStr}
          </div>
        </div>
        <div className="flex min-w-40 flex-col gap-1 text-sm">
          {b.seats.map((s) => (
            <div key={`${s.rowNumber}-${s.seatNumber}`}>
              Ряд {s.rowNumber}, место {s.seatNumber}
            </div>
          ))}
        </div>
        {withPayButton && (
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => payMutation.mutate({ bookingId: b.id })}
              disabled={payMutation.isPending}
              className="rounded border border-neutral-500 px-6 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-70"
            >
              {payMutation.isPending ? 'Оплата...' : 'Оплатить'}
            </button>

            {b.secondsLeft !== null && b.secondsLeft > 0 && (
              <div className="text-sm">
                <PaymentTimer initialSeconds={b.secondsLeft} />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderSection = (title: string, items: typeof unpaid, withPayButton = false) => {
    if (!items || items.length === 0) return null

    return (
      <section className="mt-10">
        <h2 className="mb-3 text-sm font-normal">{title}</h2>
        <div className="h-px w-full bg-neutral-700/70" />
        {items.map((b, idx) => (
          <div
            key={b.id}
            className={idx === 0 ? 'mt-6' : ''}
          >
            {renderBooking(b, withPayButton)}
          </div>
        ))}
      </section>
    )
  }

  const hasAnyTickets = unpaid.length > 0 || upcoming.length > 0 || past.length > 0

  return (
    <div className="px-12 py-10">
      <h1 className="mb-10 text-center text-3xl font-normal">Мои билеты</h1>

      {renderSection('Неоплаченные', unpaid, true)}
      {renderSection('Будущие', upcoming, false)}
      {renderSection('Прошедшие', past, false)}

      {!hasAnyTickets && <div className="mt-10 text-sm">У вас пока нет билетов</div>}
    </div>
  )
}
