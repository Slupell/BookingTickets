import { useParams } from 'react-router-dom'
import { MovieSessionsCinemas } from 'src/modules/movies/components/movieSessionCinemas'
import { MovieSessionsInfo } from 'src/modules/movies/components/MovieSessionInfo'
import { useGetSessionMovies } from 'src/modules/movies/hooks/useGetSessionMovies'

export const MovieSessions = () => {
  const { id = '' } = useParams<{ id: string }>()

  if (!id) return <div className="px-12 py-8 text-sm">Некорректный id фильма</div>

  const { result, movie } = useGetSessionMovies(id)

  if (!movie) return <div className="px-12 py-8 text-sm">Фильм не найден</div>

  return (
    <div>
      <MovieSessionsInfo movie={movie} />
      <MovieSessionsCinemas result={result} />
    </div>
  )
}
