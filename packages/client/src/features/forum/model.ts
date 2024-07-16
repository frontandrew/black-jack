import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Comment {
  id: number
  content: string
}

interface Topic {
  id: number
  title: string
  content: string
  comments: Comment[]
}

interface TopicsState {
  topics: Topic[]
}

const initialState: TopicsState = {
  topics: [],
}

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    addTopic(state, action: PayloadAction<Topic>) {
      state.topics.push(action.payload)
    },
    addComment(
      state,
      action: PayloadAction<{ topicId: number; comment: Comment }>
    ) {
      const { topicId, comment } = action.payload
      const topic = state.topics.find(t => t.id === topicId)
      if (topic) {
        topic.comments.push(comment)
      }
    },
  },
})

export const { addTopic, addComment } = topicsSlice.actions

export default topicsSlice.reducer
