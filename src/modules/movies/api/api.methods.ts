import { apiClient } from 'src/services/api'
import type { FetchMovieSessionsResponse, FetchMoviesResponse } from './api.types'

export const fetchMovies = () => {
  return apiClient.get<FetchMoviesResponse[], FetchMoviesResponse[]>('/movies')
}

export const fetchMovieSessions = (id: string) => {
  return apiClient.get<FetchMovieSessionsResponse[], FetchMovieSessionsResponse[]>(
    `/movies/${id}/sessions`,
  )
}
