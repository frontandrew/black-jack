import fs from 'node:fs/promises'
import express from 'express'
import serialize from 'serialize-javascript'
import cors from 'cors'
import createEmotionServer from '@emotion/server/create-instance'

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.CLIENT_PORT

async function createServer() {
  // Cached production assets
  const templateHtml = isProduction
    ? await fs.readFile('./dist/client/index.html', 'utf-8')
    : ''
  const ssrManifest = isProduction // ToDo ssrManifest
    ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
    : undefined

  // Create http server
  const app = express()

  app.use(
    cors({
      origin: ['http://localhost', 'http://localhost:3001'],
      credentials: true,
    }),
  );

  // Add Vite or respective production middlewares
  let vite
  if (!isProduction) {
    const { createServer } = await import('vite')
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    const compression = (await import('compression')).default
    const sirv = (await import('sirv')).default
    app.use(compression())
    app.use(sirv('./dist/client', { extensions: [] }))
  }

  // Serve HTML
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template
      let render = function (req) {
        return new Promise(function (resolve) {
          resolve({
            html: '',
            initialState: {},
            helmet: {},
            styleCache: {},
          })
        })
      }

      if (!isProduction) {
        // Always read fresh template in development
        template = await fs.readFile('./index.html', 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-ssr.tsx')).render
      } else {
        template = templateHtml
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        render = (await import('./dist/server/entry-ssr.js')).render
      }

      const {
        html: appHtml,
        initialState,
        helmet,
        styleCache,
      } = await render(req)

      const { extractCriticalToChunks, constructStyleTagsFromChunks } =
        createEmotionServer(styleCache);
      const emotionChunks = extractCriticalToChunks(appHtml);
      const css = constructStyleTagsFromChunks(emotionChunks);

      const html = template
        .replace('<!--ssr-styles-->', css)
        .replace(`<!--ssr-helmet-->`, `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()}`)
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
            isJSON: true,
          })}</script>`
        )

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
    } catch (e) {
      vite?.ssrFixStacktrace(e)
      res.status(500).end(e.stack)
    }
  })

  // Start http server
  app.listen(port, () => {
    console.log(`🍋 SSR server started at ${port} port`)
    console.log(`🛠️ APP started in ${process.env.NODE_ENV} mode`)
  })
}

createServer()
