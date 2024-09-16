import express from 'express'
import cors from 'cors'
import topicRoutes from './routes/topicRoutes'
import commentRoutes from './routes/commentRoutes'
import tapTopicEmojiRoutes from './routes/tapTopicEmojiRoutes'
import emojiRoutes from './routes/emojiRoutes'

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
app.use('/tap', tapTopicEmojiRoutes)
app.use('/emoji', emojiRoutes)

export { app }
