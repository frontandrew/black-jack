/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTTPInterface } from './type'

// Implement the transport layer using the Fetch API
export class HTTPTransport implements HTTPInterface {
  get: <T>(url: string, body: any, headers?: HeadersInit) => Promise<T> = <T>(
    url: string,
    headers: HeadersInit = {}
  ): Promise<T> => {
    return this.fetchRequest<T>('GET', url, null, headers)
  }

  post: <T>(url: string, body: any, headers?: HeadersInit) => Promise<T> = <T>(
    url: string,
    body: any,
    headers: HeadersInit = {}
  ): Promise<T> => {
    return this.fetchRequest<T>('POST', url, body, headers)
  }

  put: <T>(url: string, body: any, headers?: HeadersInit) => Promise<T> = <T>(
    url: string,
    body: any,
    headers: HeadersInit = {}
  ): Promise<T> => {
    return this.fetchRequest<T>('PUT', url, body, headers)
  }

  delete: <T>(url: string, body: any, headers?: HeadersInit) => Promise<T> = <
    T
  >(
    url: string,
    headers: HeadersInit = {}
  ): Promise<T> => {
    return this.fetchRequest<T>('DELETE', url, null, headers)
  }

  private fetchRequest = async <T>(
    method: string,
    url: string,
    body: any = null,
    headers: HeadersInit = {}
  ): Promise<T> => {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    })
    return this.handleResponse<T>(response)
  }

  private handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Error ${response.status}: ${errorMessage}`)
    }
    return response.json() as Promise<T>
  }
}

// Example usage:
// const transportLayer = new HTTPTransport()

// async function fetchData() {
//   try {
//     const data = await transportLayer.get<any>('')
//     console.log(data)
//   } catch (error) {
//     console.error('Error fetching data:', error)
//   }
// }

// fetchData()
