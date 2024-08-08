import dotenv from 'dotenv'
import express, { Request as ExpressRequest } from 'express'
import path from 'path'
import fs from 'fs/promises'
import serialize from 'serialize-javascript'
import { createServer as createViteServer, ViteDevServer } from 'vite'

dotenv.config()
const port = Number(process.env.SERVER_PORT) || 3001
const dev = process.env.NODE_ENV === 'development'
const clientPath = path.join(__dirname, `${dev ? '../' : '../../'}`, 'client')

async function createServer() {
  const app = express()

  let vite: ViteDevServer | undefined
  if (dev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false })
    )
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let render: (
        req: ExpressRequest
      ) => Promise<{ html: string; initialState: unknown; styleTags: string }>
      let template: string

      if (vite) {
        template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )

        template = await vite.transformIndexHtml(url, template)
        render = (
          await vite.ssrLoadModule(
            path.join(clientPath, 'src/entry-server.tsx')
          )
        ).render
      } else {
        template = await fs.readFile(
          path.join(clientPath, 'dist/client/index.html'),
          'utf-8'
        )

        const serverPath = path.join(clientPath, 'dist/server/entry-server.js')
        render = (await import(serverPath)).render
      }

      const { html: appHtml, initialState, styleTags } = await render(req)
      const html = template
        .replace('<!--ssr-styles-->', `<style>${styleTags}</style>`)
        .replace('<!--ssr-outlet-->', appHtml)
        .replace(
          '<!--ssr-initial-state-->',
          `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
            isJSON: true,
          })}</script>`
        )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      if (vite) {
        vite.ssrFixStacktrace(error as Error)
      }
      next(error)
    }
  })

  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
  })
}

createServer()
