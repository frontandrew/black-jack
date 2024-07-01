import { Box, Button, Typography } from '@mui/material'
import { useNavigate, useRouteError } from 'react-router'

import './style.css'
import React, { ReactNode } from 'react'

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate()
  const error: any = useRouteError()

  return (
    <Box className="error-page">
      <Typography variant="h1">{error.status}</Typography>
      <Typography variant="h5">{error.statusText || error.message}</Typography>
      <Typography variant="body2" mb={4}>
        {error.data}
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate(-2)
        }}>
        BACK
      </Button>
    </Box>
  )
}

type Props = {
  children: ReactNode
}
type State = {
  hasError: boolean
  error: any
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: any, info: any) {
    console.log(error, info)
  }

  navigate(to: number) {
    const navigate = useNavigate()
    navigate(to)
  }

  render() {
    const { error } = this.state
    console.log('render', error)
    if (this.state.hasError) {
      return (
        <Box className="error-page">
          <Typography variant="h1">Ops</Typography>
          <Typography variant="h5">{error.message}</Typography>
          <Button
            variant="contained"
            onClick={() => {
              this.navigate(-2)
            }}>
            BACK
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}
