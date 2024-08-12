import axios from 'axios'
import { AUTH_API, BASE, METHODS, OAUTH } from 'consts'

const ax = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  withCredentials: true,
  timeout: 1000,
})

export const oAuth = async () => {
  try {
    const response = await fetch(`${BASE}${OAUTH.SERVICE_ID}`)

    if (response.status === 200) {
      const result = await response.json()
      const { service_id } = result
      window.location.replace(
        `${OAUTH.YANDEX}${service_id}&redirect_uri=${OAUTH.REDIRECT}`
      )
    }
  } catch (error) {
    console.error(`Yandex OAuth error: ${error}`)
  }
}

export const loginInOAuth = async () => {
  const code = new URL(window.location.href).searchParams.get('code')

  ax.post('/oauth/yandex', {
    code: code,
    redirect_uri: OAUTH.REDIRECT,
  }).then(response => {
    console.log(response)
  })

  getUser()

  // try {
  //   const response = await fetch(
  //     `https://ya-praktikum.tech/api/v2/oauth/yandex`,
  //     {
  //       method: METHODS.POST,
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8',
  //       },
  //       body: JSON.stringify({
  //         code: code,
  //         redirect_uri: OAUTH.REDIRECT,
  //       }),
  //     }
  //   )

  //   if (response.status === 200) {
  //     const result = await response.json()
  //     console.log(result)
  //     // getUser()
  //   }
  // } catch (error) {
  //   console.error(`Yandex oAuth post error: ${error}`)
  // }
}

const getUser = async () => {
  ax.get(`${AUTH_API.GET_USER}`)
  // try {
  //   const response = await fetch(`${BASE}${AUTH_API.GET_USER}`)

  //   if (response.status === 200) {
  //     const result = response.json()

  //     console.log(result)
  //   }
  // } catch (error) {
  //   console.error(`Get user error: ${error}`)
  // }
}
