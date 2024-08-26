import express from 'express'
import { Topic } from '../models/Topic'
import { Comment } from '../models/Comment'

const router = express.Router()

// Get all topics
router.get('/', async (_, res) => {
  try {
    const topics = await Topic.findAll()
    res.json(topics)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topics', error })
  }
})

// Get a single topic by ID
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findByPk(req.params.id, { include: [Comment] })
    if (topic) {
      res.json(topic)
    } else {
      res.status(404).json({ message: 'Topic not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topic', error })
  }
})

// Create a new topic
router.post('/', async (req, res) => {
  try {
    const newTopic = await Topic.create(req.body)
    res.status(201).json(newTopic)
  } catch (error) {
    res.status(400).json({ message: 'Error creating topic', error })
  }
})

// Update a topic
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Topic.update(req.body, {
      where: { id: req.params.id },
    })
    if (updated) {
      const updatedTopic = await Topic.findByPk(req.params.id)
      res.json(updatedTopic)
    } else {
      res.status(404).json({ message: 'Topic not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating topic', error })
  }
})

// Delete a topic
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Topic.destroy({
      where: { id: req.params.id },
    })
    if (deleted) {
      res.status(204).send()
    } else {
      res.status(404).json({ message: 'Topic not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting topic', error })
  }
})

export default router
