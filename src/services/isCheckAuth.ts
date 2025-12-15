import { sessionKey } from 'src/constants/sessions'

export const isCheckAuth = () => {
  return Boolean(localStorage.getItem(sessionKey))
}
