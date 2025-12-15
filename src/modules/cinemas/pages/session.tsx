import { useParams } from 'react-router-dom'
import { CinemaSessionMovies } from 'src/modules/cinemas/components/cinemaSessionMovie'
import { useGetSessionCinema } from 'src/modules/cinemas/hooks/useGetSessionCinema'

export const CinemaSessions = () => {
  const { id = '' } = useParams<{ id: string }>()
  const { result, cinema } = useGetSessionCinema(id)

  if (!id) return <div>Некорректный id фильма</div>

  if (!cinema) return <div>Фильм не найден</div>

  return (
    <div>
      <span>{cinema.name}</span>
      <CinemaSessionMovies result={result} />
    </div>
  )
}
