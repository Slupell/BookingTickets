import { Navigate, Outlet } from 'react-router-dom'
import { LOGIN_ROUTE } from 'src/constants/routes'
import { isCheckAuth } from 'src/services/isCheckAuth'

export const ProtectedLayout = () => {
  const isUserAuth = isCheckAuth()
  return isUserAuth ? (
    <Outlet />
  ) : (
    <Navigate
      to={LOGIN_ROUTE}
      replace
    />
  )
}
