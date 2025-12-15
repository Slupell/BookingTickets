import { Link, generatePath } from 'react-router-dom'
import { Image } from 'src/components/image'
import { MOVIE_SESSION_ROUTE } from 'src/constants/routes'
import type { CinemaDayResult } from 'src/modules/cinemas/hooks/useGetSessionCinema'
import { useFetchMoviesQuery } from 'src/modules/movies/api'

export const CinemaSessionMovies = ({ result }: { result: CinemaDayResult[] }) => {
  const { data: movies = [] } = useFetchMoviesQuery()

  return (
    <div className="px-16 py-10">
      {result.map((day) => (
        <section
          key={day.date}
          className="mb-12"
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="text-sm tracking-wide">{day.date}</span>
            <div className="h-px flex-1 bg-neutral-600" />
          </div>

          <div className="space-y-8">
            {day.movies.map((item) => {
              const movie = movies.find((m) => m.id === item.movieId)

              return (
                <div
                  key={item.movieId}
                  className="flex items-center justify-between gap-10"
                >
                  <div className="flex min-w-[260px] items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded border border-neutral-500">
                      {movie ? (
                        <Image src={movie.posterImage} />
                      ) : (
                        <span className="text-[10px] text-neutral-400">img</span>
                      )}
                    </div>
                    <span className="text-lg">{item.movieName}</span>
                  </div>
                  <div className="flex flex-1 flex-wrap justify-end gap-4">
                    {item.sessions.map((elem) => (
                      <Link
                        key={elem.id}
                        to={generatePath(MOVIE_SESSION_ROUTE, { sessionId: String(elem.id) })}
                        className="inline-flex min-w-[72px] justify-center rounded border border-neutral-400 px-4 py-1.5 text-sm tracking-wide transition hover:bg-neutral-800/50"
                      >
                        {elem.time}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
