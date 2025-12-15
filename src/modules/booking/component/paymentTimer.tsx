import React from 'react'

export const PaymentTimer = ({ initialSeconds }: { initialSeconds: number }) => {
  const [seconds, setSeconds] = React.useState(initialSeconds)

  React.useEffect(() => {
    setSeconds(initialSeconds)
  }, [initialSeconds])

  React.useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [seconds])

  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  const formatted = `${m}:${s.toString().padStart(2, '0')}`

  return <span className="text-sm">Осталось {formatted}</span>
}
