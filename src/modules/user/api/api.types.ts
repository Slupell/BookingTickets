export interface FetchLoginResponse {
  token: string
}

export interface FetchRegistrationResponse {
  token: string
}

export interface FetchLoginRequest {
  username: string
  password: string
}

export interface FetchRegistrationRequest {
  username: string
  password: string
}
