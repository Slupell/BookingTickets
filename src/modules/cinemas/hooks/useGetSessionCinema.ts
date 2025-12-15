import { useFetchCinemaSessionsQuery, useFetchCinemasQuery } from 'src/modules/cinemas/api'
import { useFetchMoviesQuery } from 'src/modules/movies/api'
import type { FetchMoviesResponse } from 'src/modules/movies/api/api.types'

export interface CinemaDayResult {
  date: string
  movies: {
    posterPath: any
    movieId: number
    movieName: string
    sessions: {
      id: number
      time: string
      startTime: string
    }[]
  }[]
}

export interface CinemaDayResultWithPoster extends CinemaDayResult {
  movies: (CinemaDayResult['movies'][number] & {
    posterPath?: string
  })[]
}

export const useGetSessionCinema = (cinemaId: string) => {
  const { data: movies } = useFetchMoviesQuery()
  const { data: cinemas } = useFetchCinemasQuery()
  const { data: sessions } = useFetchCinemaSessionsQuery({ id: cinemaId })

  if (!cinemas || !movies || !sessions) {
    return { cinema: null, movieForCinema: [], sessions: [] }
  }

  const cinema = cinemas.find((item) => item.id === Number(cinemaId))
  const movieById: Record<number, FetchMoviesResponse> = {}
  movies.forEach((c) => (movieById[c.id] = c))

  const daysMap = new Map<
    string,
    {
      date: string
      movies: Map<
        number,
        {
          movieId: number
          movieName: string
          sessions: { id: number; time: string; startTime: string }[]
        }
      >
    }
  >()

  sessions
    .filter((s) => (cinemaId ? s.cinemaId === Number(cinemaId) : true))
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
          movies: new Map(),
        })
      }

      const day = daysMap.get(dateKey)!

      if (!day.movies.has(s.movieId)) {
        const movie = movieById[s.movieId]
        day.movies.set(s.movieId, {
          movieId: s.movieId,
          movieName: movie?.title ?? '',
          sessions: [],
        })
      }

      const movieGroup = day.movies.get(s.movieId)!
      movieGroup.sessions.push({
        id: s.id,
        time: timeStr,
        startTime: s.startTime,
      })
    })

  const result: CinemaDayResult[] = Array.from(daysMap.values())
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((day) => ({
      date: day.date,
      movies: Array.from(day.movies.values())
        .sort((a, b) => a.movieName.localeCompare(b.movieName))
        .map((movie) => ({
          movieId: movie.movieId,
          movieName: movie.movieName,
          sessions: movie.sessions.sort((a, b) => +new Date(a.startTime) - +new Date(b.startTime)),
        })),
    }))

  return {
    result,
    cinema,
  }
}
