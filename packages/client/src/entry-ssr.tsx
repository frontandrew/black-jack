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
import { ServerStyleSheet } from 'styled-components'
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
// import { createTheme, ThemeProvider } from '@mui/material/styles' // ToDo починить <ThemeProvider> в preview

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

  // try {
  //   if (fetchData) {
  //   await fetchData({
  //     dispatch: store.dispatch,
  //     state: store.getState(),
  //     ctx: createContext(req),
  //   })
  //   } else {
  //     console.log('fetchData is not defined')
  //   }
  // } catch (e) {
  //   console.log('Инициализация страницы произошла с ошибкой', e)
  // }

  store.dispatch(setPageHasBeenInitializedOnServer(true))

  const router = createStaticRouter(dataRoutes, context)
  const sheet = new ServerStyleSheet()
  // const theme = createTheme()

  try {
    const html = renderToString(
      sheet.collectStyles(
        <>
          <CssBaseline />
          <Provider store={store}>
            {/* <ThemeProvider theme={theme}> */}
            <StaticRouterProvider router={router} context={context} />
            {/* </ThemeProvider> */}
          </Provider>
        </>
      )
    )
    const styleTags = sheet.getStyleTags()

    const helmet = Helmet.renderStatic()

    return {
      html,
      helmet,
      styleTags,
      initialState: store.getState(),
    }
  } catch (error) {
    console.error('Render error:', error)
    throw error
  } finally {
    sheet.seal()
  }
}
