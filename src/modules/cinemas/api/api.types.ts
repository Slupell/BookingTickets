export interface FetchCinemasResponse {
  id: number
  name: string
  address: string
}

export interface FetchCinemaSessionsByIdResponse {
  id: number
  movieId: number
  cinemaId: number
  startTime: string
}
