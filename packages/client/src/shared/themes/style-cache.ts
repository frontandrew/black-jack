/**
 * Material UI - ssr guide:
 * https://mui.com/material-ui/guides/server-rendering/#handling-the-request
 */

import createCache from '@emotion/cache'

export function createEmotionCache() {
  return createCache({ key: 'css' })
}
