export const getClientIdRequest = async () => {
  try {
    const response = await fetch(
      'https://ya-praktikum.tech/api/v2/oauth/yandex/service-id?redirect_uri=http%3A%2F%2Flocalhost%3A3000'
    )

    if (response.status === 200) {
      const result = await response.json()
      const { service_id } = result
      window.location.replace(
        `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=http%3A%2F%2Flocalhost%3A3000`
      )
    }
  } catch (error) {
    console.error(`Yandex OAuth error: ${error}`)
  }
}
