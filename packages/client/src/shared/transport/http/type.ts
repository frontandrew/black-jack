/* eslint-disable @typescript-eslint/no-explicit-any */
export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface HTTPInterface {
  get<T>(url: string, headers?: HeadersInit): Promise<T>
  post<T>(url: string, body: any, headers?: HeadersInit): Promise<T>
  put<T>(url: string, body: any, headers?: HeadersInit): Promise<T>
  delete<T>(url: string, headers?: HeadersInit): Promise<T>
}
