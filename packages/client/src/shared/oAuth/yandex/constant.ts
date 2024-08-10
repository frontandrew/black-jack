export const OAUTH = {
  YANDEX: 'https://oauth.yandex.ru/authorize?response_type=code&client_id=',
  SERVICE_ID: 'oauth/yandex/service-id',
  REDIRECT: import.meta.env.VITE_DEPLOY_HOST ?? 'http://localhost:3000/',
}
