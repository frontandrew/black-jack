import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

interface Comment {
  id: number
  content: string
}

interface Topic {
  id: string
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
    addTopic: {
      reducer: (state, action: PayloadAction<Topic>) => {
        state.topics.push(action.payload)
      },
      prepare: (title: string, content: string) => {
        return { payload: { id: nanoid(), title, content, comments: [] } }
      },
    },
    addComment(
      state,
      action: PayloadAction<{ topicId: string; comment: Comment }>
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
