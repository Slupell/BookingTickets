import { Link, generatePath } from 'react-router-dom'
import { CINEMAS_SESSIONS_ROUTE } from 'src/constants/routes'
import { useFetchCinemasQuery } from 'src/modules/cinemas/api/api.queries'

export const Cinemas = () => {
  const { data = [], isPending } = useFetchCinemasQuery()

  if (isPending) {
    return <div className="px-12 py-8 text-sm">Загрузка...</div>
  }

  return (
    <div className="px-12 py-10">
      <h1 className="mb-8 text-center text-3xl font-normal">Кинотеатры</h1>
      <div className="grid grid-cols-[2fr_3fr_auto] items-center gap-4 border-b border-neutral-700/70 pb-3 text-sm">
        <span>Кинотеатр</span>
        <span>Адрес</span>
        <span className="justify-self-end" />
      </div>
      <div className="mt-6 space-y-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[2fr_3fr_auto] items-center gap-4 text-sm"
          >
            <span className="truncate">{item.name}</span>
            <span className="truncate">{item.address}</span>
            <div className="justify-self-end">
              <Link
                to={generatePath(CINEMAS_SESSIONS_ROUTE, { id: String(item.id) })}
                className="inline-flex h-8 items-center rounded border border-neutral-500 px-4 text-sm transition hover:bg-neutral-800/40"
              >
                Посмотреть сеансы
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
