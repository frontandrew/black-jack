import fs from 'node:fs/promises'
import express from 'express'
import serialize from 'serialize-javascript'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 80
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
  : undefined

// Create http server
const app = express()

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    let render = function () {
      return new Promise(function (resolve) {
        resolve({
          html: '',
          initialState: {},
        })
      })
    }
    // let render: () => Promise<{ html: string; initialState: unknown }> // ToDo need ssr-server.ts

    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-ssr.tsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-ssr.js')).render
    }

    const { html: appHtml, initialState } = await render()

    const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(
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
  console.log(`Server started at http://localhost:${port}`)
})