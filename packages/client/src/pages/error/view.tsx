import { Box, Button, Typography } from '@mui/material'
import { useNavigate, useRouteError } from 'react-router'

import './style.css'
import { Component, ErrorInfo } from 'react'

// export const ErrorPage = () => {
//   const navigate = useNavigate()

//   return (
//     <Box className="error-page">
//       <Typography variant="h1">{routeError.status}</Typography>
//       <Typography variant="h5">{routeError.statusText || error.message}</Typography>
//       <Typography variant="body2" mb={4}>
//         {error.data}
//       </Typography>
//       <Button
//         variant="contained"
//         onClick={() => {
//           navigate(-2)
//         }}>
//         BACK
//       </Button>
//     </Box>
//   )
// }

export class ErrorPage extends Component {
  constructor() {
    super()

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      return <p>Error Dima</p>
    }

    return this.props.children
  }
}
