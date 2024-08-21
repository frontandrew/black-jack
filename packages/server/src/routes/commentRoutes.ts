import express from 'express'
import { Comment } from '../models/Comment'

const router = express.Router()

// Get all comments
router.get('/', async (_, res) => {
  try {
    const comments = await Comment.findAll()
    res.json(comments)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error })
  }
})

// Get a single comment by ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id)
    if (comment) {
      res.json(comment)
    } else {
      res.status(404).json({ message: 'Comment not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comment', error })
  }
})

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create(req.body)
    res.status(201).json(newComment)
  } catch (error) {
    res.status(400).json({ message: 'Error creating comment', error })
  }
})

// Update a comment
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Comment.update(req.body, {
      where: { id: req.params.id },
    })
    if (updated) {
      const updatedComment = await Comment.findByPk(req.params.id)
      res.json(updatedComment)
    } else {
      res.status(404).json({ message: 'Comment not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating comment', error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Comment.destroy({
      where: { id: req.params.id },
    })
    if (deleted) {
      res.status(204).send()
    } else {
      res.status(404).json({ message: 'Comment not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error })
  }
})

export default router
