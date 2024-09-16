import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { emojiApi } from '../../api'

interface Emoji {
  id: number
  emoji: string
}

interface EmojiState {
  emojis: Emoji[]
  currentEmoji: Emoji | null
  loading: boolean
  error: string | null
}

const initialState: EmojiState = {
  emojis: [],
  currentEmoji: null,
  loading: false,
  error: null,
}

export const fetchEmojis = createAsyncThunk(
  'emoji/fetchEmoji',
  async (_, { rejectWithValue }) => {
    try {
      const emoji = await emojiApi.getEmoji()
      return emoji
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

const emojiSlice = createSlice({
  name: 'emoji',
  initialState,
  reducers: {
    addEmojiToList: (state, action: PayloadAction<Emoji>) => {
      state.emojis.push(action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEmojis.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmojis.fulfilled, (state, action: PayloadAction<Emoji>) => {
        state.loading = false
        state.emojis = action.payload
      })
      .addCase(fetchEmojis.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { addEmojiToList } = emojiSlice.actions

export default emojiSlice.reducer
