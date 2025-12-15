import { apiClient } from 'src/services/api'
import type {
  FetchLoginRequest,
  FetchLoginResponse,
  FetchRegistrationRequest,
  FetchRegistrationResponse,
} from './api.types'

export const fetchUserLogIn = (data: FetchLoginRequest) => {
  return apiClient.post<FetchLoginResponse, FetchLoginResponse>(`/login`, data)
}

export const fetchUserRegistration = (data: FetchRegistrationRequest) => {
  return apiClient.post<FetchRegistrationResponse, FetchRegistrationResponse>(`/register`, data)
}
