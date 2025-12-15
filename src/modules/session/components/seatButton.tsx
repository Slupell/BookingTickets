import clsx from 'clsx'

interface SeatButtonProps {
  isDisabled: boolean
  rowNumber: number
  seatNumber: number
  className: string
  toggleSeat: (row: number, seat: number) => void
}

export const SeatButton = ({
  isDisabled,
  toggleSeat,
  rowNumber,
  seatNumber,
  className,
}: SeatButtonProps) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => toggleSeat(rowNumber, seatNumber)}
      className={clsx('flex items-center justify-center rounded border transition', className, {})}
    />
  )
}
