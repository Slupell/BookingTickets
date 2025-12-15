import axios, { type AxiosInstance } from 'axios'
import { sessionKey } from 'src/constants/sessions'

const DefaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const getApiClient = (): AxiosInstance => {
  const token = localStorage.getItem(sessionKey)

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      ...DefaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(sessionKey)
      if (!config.headers.Authorization && token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => Promise.reject(error),
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      return response.data
    },
    async (error) => {
      return Promise.reject(error)
    },
  )

  return axiosInstance
}

export const apiClient = getApiClient()
