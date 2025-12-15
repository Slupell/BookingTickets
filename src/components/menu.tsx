import { Link, useNavigate } from 'react-router-dom'
import { CINEMAS_ROUTE, LOGIN_ROUTE, MOVIES_ROUTE, MY_TICKETS_ROUTE } from 'src/constants/routes'
import { sessionKey } from 'src/constants/sessions'
import { isCheckAuth } from 'src/services/isCheckAuth'

export const Menu = () => {
  const isUserAuth = isCheckAuth()
  const navigate = useNavigate()

  const onClick = () => {
    localStorage.removeItem(sessionKey)
    navigate(MOVIES_ROUTE)
  }

  const itemClass = 'text-2xl leading-relaxed text-black text-left'

  return (
    <nav className="flex flex-col gap-4.5">
      <Link
        to={MOVIES_ROUTE}
        className={itemClass}
      >
        Фильмы
      </Link>
      <Link
        to={CINEMAS_ROUTE}
        className={itemClass}
      >
        Кинотеатры
      </Link>
      <Link
        to={MY_TICKETS_ROUTE}
        className={itemClass}
      >
        Мои билеты
      </Link>

      {isUserAuth ? (
        <button
          type="button"
          onClick={onClick}
          className={`${itemClass} cursor-pointer`}
        >
          Выход
        </button>
      ) : (
        <Link
          to={LOGIN_ROUTE}
          className={itemClass}
        >
          Вход
        </Link>
      )}
    </nav>
  )
}
