const API_URL = 'http://localhost:3001'

export interface Topic {
  id: number
  title: string
  content: string
  userId: string
  userName: string
  userEmail?: string
  comments: Comment[]
}

export interface Comment {
  id: number
  content: string
  userId: string
  userName: string
  userEmail?: string
  topicId: number
  createdAt?: Date
  updatedAt?: Date
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text()
    throw new Error(error)
  }
  return response.json()
}

export const apiForum = {
  getAllTopics: (): Promise<Topic[]> =>
    fetch(`${API_URL}/topics`).then(response =>
      handleResponse<Topic[]>(response)
    ),

  getTopic: (id: number): Promise<Topic> =>
    fetch(`${API_URL}/topics/${id}`).then(response =>
      handleResponse<Topic>(response)
    ),

  createTopic: (topic: Omit<Topic, 'id' | 'comments'>): Promise<Topic> =>
    fetch(`${API_URL}/topics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(topic),
    }).then(response => handleResponse<Topic>(response)),

  updateTopic: (id: number, topic: Partial<Topic>): Promise<Topic> =>
    fetch(`${API_URL}/topics/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(topic),
    }).then(response => handleResponse<Topic>(response)),

  deleteTopic: (id: number): Promise<void> =>
    fetch(`${API_URL}/topics/${id}`, { method: 'DELETE' }).then(response =>
      handleResponse<void>(response)
    ),

  createComment: (comment: Omit<Comment, 'id'>): Promise<Comment> =>
    fetch(`${API_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    }).then(response => handleResponse<Comment>(response)),

  updateComment: (id: number, comment: Partial<Comment>): Promise<Comment> =>
    fetch(`${API_URL}/comments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    }).then(response => handleResponse<Comment>(response)),

  deleteComment: (id: number): Promise<void> =>
    fetch(`${API_URL}/comments/${id}`, { method: 'DELETE' }).then(response =>
      handleResponse<void>(response)
    ),
}
