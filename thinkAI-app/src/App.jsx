
import './App.css'
import { Box, CssBaseline, IconButton, ThemeProvider } from '@mui/material'
import { AppRoutes } from './routes'
import { SnackbarProvider } from 'notistack'
import { createRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { createThemeApp } from './theme'

const theme = createThemeApp('dark')

function App() {
  const notistackRef = createRef()
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        ref={notistackRef}
        action={(key) => (
          <IconButton
            size="small"
            onClick={onClickDismiss(key)}>
            <CloseIcon />
          </IconButton>
        )}>
        <AppRoutes />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App