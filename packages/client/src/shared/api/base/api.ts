import { METHODS } from 'constant'
import { TOptions } from './types'

export type TRequestFunction = <TResult>(
  url: string,
  options?: Omit<TOptions, 'method'>
) => Promise<TResult | null>

export const defaultOptions: TOptions = {
  method: METHODS.GET,
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000,
  withCredentials: true,
  responseType: 'json',
}

const apiRequest = async <TResult>(
  url: string,
  options: TOptions = defaultOptions
): Promise<TResult | null> => {
  const {
    headers = {},
    method,
    data,
    withCredentials,
    responseType,
  } = { ...defaultOptions, ...options }

  const requestOptions: RequestInit = {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
    credentials: withCredentials ? 'include' : 'same-origin',
  }

  if (data && data instanceof FormData) {
    requestOptions.headers = {}
    requestOptions.body = data
  }

  try {
    const response = await fetch(url, requestOptions)
    return handleResponse(response, responseType)
  } catch (err) {
    console.error(err)
    return null
  }
}

const handleResponse = async (
  res: Response,
  responseType?: 'json' | undefined
) => {
  if (res.ok) {
    const contentType = res.headers.get('Content-Type') || responseType
    if (contentType && contentType.includes('json')) {
      return res.json()
    }
    return res.text()
  } else {
    return Promise.reject(res)
  }
}

const createApiMethod =
  (method: METHODS): TRequestFunction =>
  (url, options) =>
    apiRequest(url, { ...options, method })

export const api: Record<string, TRequestFunction> = {
  get: createApiMethod(METHODS.GET),
  post: createApiMethod(METHODS.POST),
  put: createApiMethod(METHODS.PUT),
  patch: createApiMethod(METHODS.PATCH),
  delete: createApiMethod(METHODS.DELETE),
}
