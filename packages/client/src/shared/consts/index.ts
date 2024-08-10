export const OAUTH = {
  YANDEX: 'https://oauth.yandex.ru/authorize?response_type=code&client_id=',
  REDIRECT: import.meta.env.VITE_DEPLOY_HOST ?? 'http://localhost:3000',
}
