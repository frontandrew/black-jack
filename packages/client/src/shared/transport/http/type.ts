import { METHODS } from 'constant'

export interface HTTPOptions<P> {
  headers?: Record<string, string>
  payload?: P
}

export type HTTPMethod = <P, R>(
  path: string,
  payload?: P,
  headers?: Record<string, string>
) => Promise<R>

export type HTTPRequest = <P, R>(
  method: METHODS,
  path: string,
  payload?: P | null,
  headers?: Record<string, string>
) => Promise<R>
