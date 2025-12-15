import { apiClient } from 'src/services/api'
import type { FetchCinemaSessionsByIdResponse, FetchCinemasResponse } from './api.types'

export const fetchCinemas = () => {
  return apiClient.get<FetchCinemasResponse[], FetchCinemasResponse[]>('/cinemas')
}

export const fetchCinemaSessionsById = (id: string) => {
  return apiClient.get<FetchCinemaSessionsByIdResponse[], FetchCinemaSessionsByIdResponse[]>(
    `/cinemas/${id}/sessions`,
  )
}
