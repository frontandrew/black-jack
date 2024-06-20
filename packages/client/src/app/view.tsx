import { Box } from '@mui/material'
import { useEffect } from 'react'
import './style.css'

export function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <Box className="app">Вот тут будет жить ваше приложение :)</Box>
}
