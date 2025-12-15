import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from './components/queryProvider'
import './index.css'
import { router } from './services/router'

export const App = () => {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}
