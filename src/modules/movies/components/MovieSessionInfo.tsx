import { Image } from 'src/components/image'
import type { FetchMoviesResponse } from 'src/modules/movies/api/api.types'

export const MovieSessionsInfo = ({ movie }: { movie: FetchMoviesResponse }) => {
  return (
    <div className="px-12 pt-10 pb-8">
      <h1 className="mb-8 text-center text-3xl font-normal">{movie.title}</h1>

      <div className="flex items-start gap-8">
        <div className="flex h-40 w-32 items-center justify-center overflow-hidden rounded border border-neutral-600">
          <Image src={movie.posterImage} />
        </div>
        <div className="max-w-2xl space-y-2 text-sm leading-relaxed">
          <p>{movie.description}</p>
          <p>Год: {movie.year}</p>
          <p>
            Продолжительность: {Math.floor(movie.lengthMinutes / 60)}:
            {(movie.lengthMinutes % 60).toString().padStart(2, '0')}
          </p>
          <p>Рейтинг: {movie.rating}</p>
        </div>
      </div>
    </div>
  )
}
