import { BASE, METHODS, OAUTH } from 'consts'

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

  try {
    await fetch(`https://ya-praktikum.tech/api/v2/oauth/yandex`, {
      method: METHODS.POST,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
      body: JSON.stringify({
        code: code,
        redirect_uri: OAUTH.REDIRECT,
      }),
    })
  } catch (error) {
    console.error(`Yandex oAuth post error: ${error}`)
  }
}
