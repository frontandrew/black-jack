import { Request, Response } from 'express'
import { TapTopicEmoji } from '../models/TapTopicEmoji'

export const createTapTopicEmoji = async (req: Request, res: Response) => {
  try {
    const tapTopicEmoji = await TapTopicEmoji.create(req.body)
    return res.status(201).json(tapTopicEmoji)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create tapTopicEmoji' })
  }
}

export const getAllTapTopicEmoji = async (_: Request, res: Response) => {
  try {
    const tapTopicEmoji = await TapTopicEmoji.findAll()
    return res.status(200).json(tapTopicEmoji)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch tapTopicEmoji' })
  }
}

export const getTapTopicEmoji = async (req: Request, res: Response) => {
  try {
    const tapTopicEmoji = await TapTopicEmoji.findByPk(req.params.id, {
      include: ['emoji'],
    })
    if (tapTopicEmoji) {
      return res.status(200).json(tapTopicEmoji)
    }
    return res.status(404).json({ error: 'TapTopicEmoji not found' })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch tapTopicEmoji' })
  }
}

export const updateTapTopicEmoji = async (req: Request, res: Response) => {
  try {
    const tapTopicEmoji = await TapTopicEmoji.findByPk(req.params.id)
    if (tapTopicEmoji) {
      await tapTopicEmoji.update(req.body)
      return res.status(200).json(tapTopicEmoji)
    }
    return res.status(404).json({ error: 'TapTopicEmoji not found' })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update tapTopicEmoji' })
  }
}

export const deleteTapTopicEmoji = async (req: Request, res: Response) => {
  try {
    const tapTopicEmoji = await TapTopicEmoji.findByPk(req.params.id)
    if (tapTopicEmoji) {
      await tapTopicEmoji.destroy()
      return res.status(204).send()
    }
    return res.status(404).json({ error: 'TapTopicEmoji not found' })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete tapTopicEmoji' })
  }
}
