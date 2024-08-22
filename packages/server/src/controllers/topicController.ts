import { Request, Response } from 'express'
import { Topic } from '../models/Topic'

export const createTopic = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.create(req.body)
    return res.status(201).json(topic)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create topic' })
  }
}

export const getAllTopics = async (_: Request, res: Response) => {
  try {
    const topics = await Topic.findAll()
    return res.status(200).json(topics)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch topics' })
  }
}

export const getTopic = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.findByPk(req.params.id, { include: ['comments'] })
    if (topic) {
      return res.status(200).json(topic)
    }
    return res.status(404).json({ error: 'Topic not found' })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch topic' })
  }
}

export const updateTopic = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.findByPk(req.params.id)
    if (topic) {
      await topic.update(req.body)
      return res.status(200).json(topic)
    }
    return res.status(404).json({ error: 'Topic not found' })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update topic' })
  }
}

export const deleteTopic = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.findByPk(req.params.id)
    if (topic) {
      await topic.destroy()
      return res.status(204).send()
    }
    return res.status(404).json({ error: 'Topic not found' })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete topic' })
  }
}
