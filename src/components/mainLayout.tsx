import { Outlet, useLocation } from 'react-router-dom'
import { CINEMAS_ROUTE, LOGIN_ROUTE, MOVIES_ROUTE, MY_TICKETS_ROUTE } from 'src/constants/routes'
import { Menu } from './menu'

const titles: Record<string, string> = {
  [MOVIES_ROUTE]: 'Фильмы',
  [CINEMAS_ROUTE]: 'Кинотеатры',
  [MY_TICKETS_ROUTE]: 'Мои билеты',
  [LOGIN_ROUTE]: 'Вход',
}

export const MainLayout = () => {
  const location = useLocation()
  const title = titles[location.pathname] ?? 'Кинотеатр'

  return (
    <div className="flex h-svh justify-center gap-10 px-10 pt-10">
      <div>
        <h1 className="mb-4 text-3xl font-normal">{title}</h1>
        <div className="mb-4 h-px w-full bg-neutral-600" />
        <Menu />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}
