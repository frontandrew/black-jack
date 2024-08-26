import express from 'express'
import cors from 'cors'
import topicRoutes from './routes/topicRoutes'
import commentRoutes from './routes/commentRoutes'

const app = express()

app.use(cors())
app.use(express.json())

// Добавляем маршруты для friends и user
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

// Подключаем маршруты для topics и comments
app.use('/topics', topicRoutes)
app.use('/comments', commentRoutes)

export { app }
