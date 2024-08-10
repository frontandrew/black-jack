import { OAUTH } from './constant'

export const signinWithYandex = async () => {
  try {
    const response = await fetch(
      'https://ya-praktikum.tech/api/v2/oauth/yandex/service-id?redirect_uri=http%3A%2F%2Flocalhost%3A3000'
    )

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
