import { METHODS } from 'constant'

export type TOptions = {
  method: METHODS
  data?: unknown
  headers?: Record<string, string>
  timeout?: number
  withCredentials?: boolean
  responseType?: 'json'
}
