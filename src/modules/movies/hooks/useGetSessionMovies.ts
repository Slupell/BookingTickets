import { useFetchCinemasQuery } from 'src/modules/cinemas/api'
import type { FetchCinemasResponse } from 'src/modules/cinemas/api/api.types'
import { useFetchMovieSessionsQuery, useFetchMoviesQuery } from 'src/modules/movies/api'

export interface MovieDayResult {
  date: string
  cinemas: {
    cinemaId: number
    cinemaName: string
    sessions: {
      id: number
      time: string
      startTime: string
    }[]
  }[]
}

export const useGetSessionMovies = (movieId: string) => {
  const { data: movies } = useFetchMoviesQuery()
  const { data: cinemas } = useFetchCinemasQuery()
  const { data: sessions } = useFetchMovieSessionsQuery({ id: movieId })

  if (!movies || !cinemas || !sessions) {
    return { movie: null, cinemasForMovie: [], sessions: [] }
  }
  const movie = movies.find((item) => item.id === Number(movieId))
  const cinemaById: Record<number, FetchCinemasResponse> = {}
  cinemas.forEach((c) => (cinemaById[c.id] = c))

  const daysMap = new Map<
    string,
    {
      date: string
      cinemas: Map<
        number,
        {
          cinemaId: number
          cinemaName: string
          sessions: { id: number; time: string; startTime: string }[]
        }
      >
    }
  >()

  sessions
    .filter((s) => (movieId ? s.movieId === Number(movieId) : true))
    .forEach((s) => {
      const dateObj = new Date(s.startTime)

      const dateKey = dateObj.toISOString().slice(5, 10).replace('-', '.')
      const timeStr = dateObj.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      })

      if (!daysMap.has(dateKey)) {
        daysMap.set(dateKey, {
          date: dateKey,
          cinemas: new Map(),
        })
      }

      const day = daysMap.get(dateKey)!

      if (!day.cinemas.has(s.cinemaId)) {
        const cinema = cinemaById[s.cinemaId]
        day.cinemas.set(s.cinemaId, {
          cinemaId: s.cinemaId,
          cinemaName: cinema?.name ?? '',
          sessions: [],
        })
      }

      const cinemaGroup = day.cinemas.get(s.cinemaId)!
      cinemaGroup.sessions.push({
        id: s.id,
        time: timeStr,
        startTime: s.startTime,
      })
    })

  const result: MovieDayResult[] = Array.from(daysMap.values())
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((day) => ({
      date: day.date,
      cinemas: Array.from(day.cinemas.values())
        .sort((a, b) => a.cinemaName.localeCompare(b.cinemaName))
        .map((cinema) => ({
          ...cinema,
          sessions: cinema.sessions.sort((a, b) => +new Date(a.startTime) - +new Date(b.startTime)),
        })),
    }))

  return {
    result,
    movie,
  }
}
