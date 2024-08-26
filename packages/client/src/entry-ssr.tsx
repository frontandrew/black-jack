import { CssBaseline } from '@mui/material'
import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { matchRoutes } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider, useSelector } from 'react-redux'
import {
  createContext,
  createFetchRequest,
  createUrl,
} from './entry-server.utils'
import { reducer, TRootState } from './shared/store/store'
import { renderToString } from 'react-dom/server'
import { routes } from './routes'
import { setPageHasBeenInitializedOnServer } from './shared/store/ssr/ssrSlice'
import { Helmet } from 'react-helmet'
import { FC } from 'react'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import { createEmotionCache, themes } from 'themes'

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

  const App: FC = () => {
    const { current } = useSelector((state: TRootState) => state.theme)

    return (
      <CacheProvider value={styleCache}>
        <ThemeProvider theme={themes[current]}>
          <CssBaseline />
          <StaticRouterProvider router={router} context={context} />
        </ThemeProvider>
      </CacheProvider>
    )
  }

  try {
    const html = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
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
