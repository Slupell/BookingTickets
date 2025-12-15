interface HasSessionFields {
  id: number
  movieId: number
  cinemaId: number
  startTime: string
}

type NormalizedSession<T extends HasSessionFields> = T & {
  dateKey: string
  timeStr: string
}

export const normalizeSessions = <T extends HasSessionFields>(
  sessions: T[],
  filter?: (s: T) => boolean,
): NormalizedSession<T>[] => {
  return sessions
    .filter((s) => (filter ? filter(s) : true))
    .map((s) => {
      const dateObj = new Date(s.startTime)

      const dateKey = dateObj.toISOString().slice(5, 10).replace('-', '.')
      const timeStr = dateObj.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      })

      return {
        ...s,
        dateKey,
        timeStr,
      }
    })
}
