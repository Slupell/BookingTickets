import { apiClient } from 'src/services/api'
import type {
  BookInSessionRequest,
  BookInSessionResponse,
  FetchMoviesSessionByIdResponse,
} from './api.types'

export const fetchMovieSessionDetailsById = (id: number) => {
  return apiClient.get<FetchMoviesSessionByIdResponse, FetchMoviesSessionByIdResponse>(
    `/movieSessions/${id}`,
  )
}

export const bookSeatInSession = ({ id, ...data }: BookInSessionRequest) => {
  return apiClient.post<BookInSessionResponse, BookInSessionResponse>(
    `/movieSessions/${id}/bookings`,
    data,
  )
}
