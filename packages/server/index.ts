import dotenv from 'dotenv'
import { app } from './src/app'
import { createClientAndConnect } from './src/config/db'

dotenv.config()
const port = Number(process.env.SERVER_PORT) || 3001

async function startServer() {
  await createClientAndConnect()

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer().catch(console.error)
