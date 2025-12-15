import type { FetchMoviesSessionByIdResponse } from 'src/modules/session/api/api.types'
import { useSessionInfo } from 'src/modules/session/hooks/useSessionInfo'

export const SessionHeader = ({
  sessionDetails,
}: {
  sessionDetails: FetchMoviesSessionByIdResponse
}) => {
  const { movie, cinema } = useSessionInfo(sessionDetails)
  return (
    <header className="flex flex-col gap-3">
      <h1 className="text-center text-3xl font-semibold">Выбрать места</h1>

      <div className="mx-auto w-[640px] text-sm leading-relaxed">
        <p>Фильм: {movie?.title ?? '...'}</p>
        <p>Кинотеатр: {cinema?.name ?? '...'}</p>
        <p>
          Время:
          {new Date(sessionDetails.startTime).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </header>
  )
}
