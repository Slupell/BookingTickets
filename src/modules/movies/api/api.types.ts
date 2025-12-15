export interface FetchMoviesResponse {
  id: number
  title: string
  year: number
  rating: number
  lengthMinutes: number
  description: string
  posterImage: string
}

export interface FetchMovieSessionsResponse {
  id: number
  movieId: number
  cinemaId: number
  startTime: string
}
