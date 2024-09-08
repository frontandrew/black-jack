import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { apiForum, Topic, Comment, emojiApi } from '../../api'

interface TopicsState {
  topics: Topic[]
  currentTopic: Topic | null
  loading: boolean
  error: string | null
}

const initialState: TopicsState = {
  topics: [],
  currentTopic: null,
  loading: false,
  error: null,
}

export const fetchTopics = createAsyncThunk(
  'topics/fetchTopics',
  async (_, { rejectWithValue }) => {
    try {
      const topics = await apiForum.getAllTopics()
      return topics
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const fetchTopic = createAsyncThunk(
  'topics/fetchTopic',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const topic = await apiForum.getTopic(id)
      dispatch(setCurrentTopic(topic))
      return topic
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const createTopic = createAsyncThunk(
  'topics/createTopic',
  async (
    topic: Omit<Topic, 'id' | 'comments'>,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const newTopic = await apiForum.createTopic(topic)
      dispatch(addTopicToList(newTopic))
      return newTopic
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const addComment = createAsyncThunk(
  'topics/addComment',
  async (comment: Omit<Comment, 'id'>, { rejectWithValue, dispatch }) => {
    try {
      const newComment = await apiForum.createComment(comment)
      dispatch(addCommentToTopic(newComment))
      return newComment
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    addTopicToList: (state, action: PayloadAction<Topic>) => {
      state.topics.push(action.payload)
    },
    addCommentToTopic: (state, action: PayloadAction<Comment>) => {
      if (
        state.currentTopic &&
        state.currentTopic.id === action.payload.topicId
      ) {
        state.currentTopic.comments.push(action.payload)
      }
      const topic = state.topics.find(t => t.id === action.payload.topicId)
      if (topic) {
        topic.comments.push(action.payload)
      }
    },
    setCurrentTopic: (state, action: PayloadAction<Topic>) => {
      state.currentTopic = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTopics.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchTopics.fulfilled,
        (state, action: PayloadAction<Topic[]>) => {
          state.loading = false
          state.topics = action.payload
        }
      )
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchTopic.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTopic.fulfilled, (state, action: PayloadAction<Topic>) => {
        state.loading = false
        state.currentTopic = action.payload
      })
      .addCase(fetchTopic.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { addTopicToList, addCommentToTopic, setCurrentTopic } =
  topicsSlice.actions

export default topicsSlice.reducer
