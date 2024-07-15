/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryStringify } from './tools'
import { HTTPMethod, HTTPRequest, METHODS } from './type'

// Implement the transport layer using the Fetch API
export class HTTPTransport {
  private host: string | null = null

  constructor(host: string) {
    this.host = host
  }

  public get: HTTPMethod = (path, payload, headers) => {
    return this.request(METHODS.GET, path, payload, headers)
  }
  public post: HTTPMethod = (path, payload, headers) => {
    return this.request(METHODS.POST, path, payload, headers)
  }
  public put: HTTPMethod = (path, payload, headers) => {
    return this.request(METHODS.PUT, path, payload, headers)
  }
  public delete: HTTPMethod = (path, payload, headers) => {
    return this.request(METHODS.DELETE, path, payload, headers)
  }

  private request: HTTPRequest = async (
    method,
    path,
    payload = null,
    headers = {}
  ) => {
    const isJSONPayload = headers['Content-Type'].includes('application/json')
    const isGetRequest = method === METHODS.GET

    let url = `${this.host}/${path}`
    const payloadAsBody = isJSONPayload ? JSON.stringify(payload) : payload

    if (!isJSONPayload && isGetRequest && payload) {
      const params = queryStringify(payload)
      url = `${url}?${params}`
    }

    const heads = new Headers()

    Object.entries(headers).forEach(([key, value]) => {
      heads.append(key, value)
    })

    return await fetch(url, {
      credentials: 'include',
      body: payloadAsBody as BodyInit,
      headers: heads,
      method,
    }).then(response => {
      if (!response.ok) {
        const errorMessage = response.text()
        throw new Error(`Error ${response.status}: ${errorMessage}`)
      }
      return response.json()
    })
    //   .catch((error) => {
    //     throw new Error(`HTTP Request Error: ${error.reasone}`)
    //   // return this.handleResponse<R>(response)
    // }
  }

  // private handleResponse = async <R>(response: Response): Promise<R> => {
  //   if (!response.ok) {
  //     const errorMessage = await response.text()
  //     throw new Error(`Error ${response.status}: ${errorMessage}`)
  //   }
  //   return response.json() as Promise<R>
  // }
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
