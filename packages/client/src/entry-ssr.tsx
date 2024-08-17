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
import { fetchUserThunk } from 'features/userSlice/model'
// import { createFetchRequest, createUrl } from './entry-server.utils'
import { reducer } from './shared/store/store'
import { renderToString } from 'react-dom/server'
import { routes } from './routes'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// После добавления StaticRouterProvider так и не смог сделать
// чтобы yarn dev запускался нормально и без ошибок
// потому что не приходит req с ssr-server.js, если его передавать в render

// В этом же примере все прекрасно запускается без передачи req из ssr-server.js, который сделал Андрей на vite 5
// но есть ошибка Error: Hydration failed because the initial UI does not match what was rendered on the server.
// потому что гидрация сделана с ошибкой.

export async function render(req: ExpressRequest) {
  // const { query, dataRoutes } = createStaticHandler(routes)
  // const fetchRequest = createFetchRequest(req)
  // const context = await query(fetchRequest)
  // if (context instanceof Response) {
  //   throw context
  // }

  const store = configureStore({
    reducer,
  })

  // const router = createStaticRouter(dataRoutes, context)
  const theme = createTheme()

  try {
    const html = renderToString(
      <StrictMode>
        <CssBaseline />
        <Provider store={store}>
          <>loading...</>
          {/* <ThemeProvider theme={theme}>
            <StaticRouterProvider router={router} context={context} />
          </ThemeProvider> */}
        </Provider>
      </StrictMode>
    )

    return {
      html,
      initialState: store.getState(),
    }
  } catch (error) {
    console.error('Render error:', error)
    throw error
  }
}
