import express from 'express'
import { TapTopicEmoji } from '../models/TapTopicEmoji'
import { Emoji } from '../models/Emoji'

const router = express.Router()

// Get all topics
router.get('/', async (_, res) => {
  try {
    const tapTopicEmoji = await TapTopicEmoji.findAll()
    res.json(tapTopicEmoji)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tapTopicEmoji', error })
  }
})

// Get a single topic by ID
router.get('/:id', async (req, res) => {
  try {
    const tapTopicEmoji = await TapTopicEmoji.findByPk(req.params.id, {
      include: [Emoji],
    })
    if (tapTopicEmoji) {
      res.json(tapTopicEmoji)
    } else {
      res.status(404).json({ message: 'TapTopicEmoji not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tapTopicEmoji', error })
  }
})

// Create a new topic
router.post('/', async (req, res) => {
  try {
    const newTapTopicEmoji = await TapTopicEmoji.create(req.body)
    res.status(201).json(newTapTopicEmoji)
  } catch (error) {
    res.status(400).json({ message: 'Error creating tapTopicEmoji', error })
  }
})

// Update a topic
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await TapTopicEmoji.update(req.body, {
      where: { id: req.params.id },
    })
    if (updated) {
      const updatedTapTopicEmoji = await TapTopicEmoji.findByPk(req.params.id)
      res.json(updatedTapTopicEmoji)
    } else {
      res.status(404).json({ message: 'TapTopicEmoji not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating tapTopicEmoji', error })
  }
})

// Delete a topic
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await TapTopicEmoji.destroy({
      where: { id: req.params.id },
    })
    if (deleted) {
      res.status(204).send()
    } else {
      res.status(404).json({ message: 'TapTopicEmoji not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tapTopicEmoji', error })
  }
})

export default router
