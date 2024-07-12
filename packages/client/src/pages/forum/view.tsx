import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface ForumPageProps {
  onAddTopicClick: () => void
}

export const ForumPage: FC<ForumPageProps> = ({ onAddTopicClick }) => {
  const navigate = useNavigate()
  const topics = useSelector((state: RootState) => state.topics.topics)

  return (
    <div>
      <div className="flex">
        <Typography variant="h4">Blackjack Forum</Typography>
        <Button onClick={onAddTopicClick} variant="contained" color="primary">
          Add New Topic
        </Button>
      </div>
      <List>
        {topics.map(topic => (
          <ListItem
            button
            key={topic.id}
            onClick={() => navigate(`/forum/${topic.id}`)}>
            <ListItemText primary={topic.title} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
