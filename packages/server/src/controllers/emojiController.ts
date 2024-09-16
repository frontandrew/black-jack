import { Request, Response } from 'express'
import { Emoji } from '../models/Emoji'

export const createEmoji = async (req: Request, res: Response) => {
  try {
    const emoji = await Emoji.create(req.body)
    return res.status(201).json(emoji)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create emoji' })
  }
}

export const getAllEmoji = async (_: Request, res: Response) => {
  try {
    const emoji = await Emoji.findAll()
    return res.status(200).json(emoji)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch emoji' })
  }
}

export const getEmoji = async (req: Request, res: Response) => {
  try {
    const emoji = await Emoji.findByPk(req.params.id)
    if (emoji) {
      return res.status(200).json(emoji)
    }
    return res.status(404).json({ error: 'Emoji not found' })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch emoji' })
  }
}
