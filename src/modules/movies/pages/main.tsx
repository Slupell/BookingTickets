import { generatePath, Link } from 'react-router-dom'
import { Image } from 'src/components/image'
import { MOVIES_SESSIONS_ROUTE } from 'src/constants/routes'
import { useFetchMoviesQuery } from 'src/modules/movies/api/api.queries'

const formatLength = (minutes: number) => {
  if (!minutes) return '-'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}:${m.toString().padStart(2, '0')}`
}

export const Movies = () => {
  const { data = [], isPending } = useFetchMoviesQuery()

  if (isPending) {
    return <div className="px-12 py-8 text-sm">Загрузка...</div>
  }

  return (
    <div className="px-12 py-10">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-700/70 pb-3 text-sm">
            <th className="w-20 pb-3 text-left"></th>
            <th className="pb-3 pl-8 text-left">Название</th>
            <th className="pb-3 text-center">Продолжительность</th>
            <th className="pb-3 text-center">Рейтинг</th>
            <th className="pb-3 text-right"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="align-middle text-sm"
            >
              <td className="w-20 py-4">
                <div className="ml-2 flex h-20 w-16 items-center justify-center overflow-hidden rounded border border-neutral-600">
                  <Image src={item.posterImage} />
                </div>
              </td>
              <td className="py-4 pl-8">
                <span className="text-base font-medium">{item.title}</span>
              </td>
              <td className="py-4 text-center">{formatLength(item.lengthMinutes)}</td>
              <td className="py-4 text-center">{item.rating}</td>
              <td className="py-4 text-right">
                <Link
                  to={generatePath(MOVIES_SESSIONS_ROUTE, { id: String(item.id) })}
                  className="inline-flex h-8 items-center rounded border border-neutral-500 px-4 text-sm transition hover:bg-neutral-800/40"
                >
                  Посмотреть сеансы
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
