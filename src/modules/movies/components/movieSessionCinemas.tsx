import { Link, generatePath } from 'react-router-dom'
import { MOVIE_SESSION_ROUTE } from 'src/constants/routes'
import type { MovieDayResult } from 'src/modules/movies/hooks/useGetSessionMovies'

export const MovieSessionsCinemas = ({ result }: { result: MovieDayResult[] }) => {
  return (
    <div className="px-12 pb-10">
      {result.map((day) => (
        <section
          key={day.date}
          className="mb-8"
        >
          <div className="mt-4 mb-4 flex items-center gap-4">
            <span className="text-xs tracking-wide">{day.date}</span>
            <div className="h-px flex-1 bg-neutral-700/70" />
          </div>
          <div className="space-y-6">
            {day.cinemas.map((cinema) => (
              <div
                key={cinema.cinemaId}
                className="flex items-center justify-between gap-8"
              >
                <span className="min-w-[220px] text-base">{cinema.cinemaName}</span>
                <div className="flex flex-1 flex-wrap justify-end gap-3">
                  {cinema.sessions.map((session) => (
                    <Link
                      key={session.id}
                      to={generatePath(MOVIE_SESSION_ROUTE, {
                        sessionId: String(session.id),
                      })}
                      className="inline-flex min-w-[72px] justify-center rounded border border-neutral-500 px-3 py-1 text-xs tracking-wide transition hover:bg-neutral-800/40"
                    >
                      {session.time}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
