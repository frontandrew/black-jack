import { Request, Response } from 'express'
import { Comment } from '../models/Comment'

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.create(req.body)
    return res.status(201).json(comment)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create comment' })
  }
}

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.findAll()
    return res.status(200).json(comments)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch comments' })
  }
}

export const getComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByPk(req.params.id)
    if (comment) {
      return res.status(200).json(comment)
    }
    return res.status(404).json({ error: 'Comment not found' })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch comment' })
  }
}

export const updateComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByPk(req.params.id)
    if (comment) {
      await comment.update(req.body)
      return res.status(200).json(comment)
    }
    return res.status(404).json({ error: 'Comment not found' })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update comment' })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByPk(req.params.id)
    if (comment) {
      await comment.destroy()
      return res.status(204).send()
    }
    return res.status(404).json({ error: 'Comment not found' })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete comment' })
  }
}
