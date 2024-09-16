import './client.d'

export const BASE = 'https://ya-praktikum.tech/api/v2'
export const LOCAL_BASE = 'http://localhost:3001'

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const OAUTH = {
  OAUTH_YANDEX: '/oauth/yandex',
  SERVICE_ID: '/oauth/yandex/service-id',
  YANDEX: 'https://oauth.yandex.ru/authorize?response_type=code&client_id=',
  REDIRECT: import.meta.env.VITE_DEPLOY_HOST ?? 'http://localhost:3000',
}

export const AUTH_API = {
  GET_USER: '/auth/user',
}

export const SERVER_HOST =
  typeof window === 'undefined'
    ? __INTERNAL_SERVER_URL__
    : __EXTERNAL_SERVER_URL__

export const EMOJIS_PACK = [
  '😀',
  '🧐',
  '🤮',
  '😑',
  '🤬',
  '😁',
  '😌',
  '👆',
  '👇',
]
