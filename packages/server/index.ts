import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { createClientAndConnect } from './src/config/db'
import topicRoutes from './src/routes/topicRoutes'
import commentRoutes from './src/routes/commentRoutes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/topics', topicRoutes)
app.use('/comments', commentRoutes)

const port = Number(process.env.SERVER_PORT) || 3001

async function startServer() {
  await createClientAndConnect()

  app.get('/friends', (_, res) => {
    res.json([
      { name: 'Саша', secondName: 'Панов' },
      { name: 'Лёша', secondName: 'Садовников' },
      { name: 'Серёжа', secondName: 'Иванов' },
    ])
  })

  app.get('/user', (_, res) => {
    res.json({ name: '</script>Степа', secondName: 'Степанов' })
  })

  app.use('/topics', topicRoutes)
  app.use('/comments', commentRoutes)

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer().catch(console.error)
