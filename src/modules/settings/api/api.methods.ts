import { apiClient } from 'src/services/api'
import type { FetchSettingsResponse } from './api.types'

export const fetchSettings = () => {
  return apiClient.get<FetchSettingsResponse, FetchSettingsResponse>(`/settings`)
}
