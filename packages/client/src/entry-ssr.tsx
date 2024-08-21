import { CssBaseline } from '@mui/material'
import { StrictMode } from 'react'
import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { matchRoutes } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import {
  createContext,
  createFetchRequest,
  createUrl,
} from './entry-server.utils'
import { reducer } from './shared/store/store'
import { renderToString } from 'react-dom/server'
import { routes } from './routes'
import { setPageHasBeenInitializedOnServer } from './shared/store/ssr/ssrSlice'
import { Helmet } from 'react-helmet'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import { createEmotionCache, lightTheme } from 'themes'

export async function render(req: ExpressRequest) {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const store = configureStore({
    reducer,
  })

  const url = createUrl(req)

  const foundRoutes = matchRoutes(routes, url)
  if (!foundRoutes) {
    throw new Error('Страница не найдена!')
  }

  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes

  try {
    if (fetchData) {
      await fetchData({
        dispatch: store.dispatch,
        state: store.getState(),
        ctx: createContext(req),
      })
    } else {
      console.log('fetchData is not defined')
    }
  } catch (e) {
    console.log('Инициализация страницы произошла с ошибкой', e)
  }

  store.dispatch(setPageHasBeenInitializedOnServer(true))

  const router = createStaticRouter(dataRoutes, context)
  const styleCache = createEmotionCache()

  try {
    const html = renderToString(
      <>
        <CacheProvider value={styleCache}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Provider store={store}>
              <StaticRouterProvider router={router} context={context} />
            </Provider>
          </ThemeProvider>
        </CacheProvider>
      </>
    )

    const helmet = Helmet.renderStatic()

    return {
      html,
      helmet,
      styleCache,
      initialState: store.getState(),
    }
  } catch (error) {
    console.error('Render error:', error)
    throw error
  }
}
