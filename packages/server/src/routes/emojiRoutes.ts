import express from 'express'
import { Emoji } from '../models/Emoji'

const router = express.Router()

// Get all comments
router.get('/', async (_, res) => {
  try {
    const emoji = await Emoji.findAll()
    res.json(emoji)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching emoji', error })
  }
})

export default router
