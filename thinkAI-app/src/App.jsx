
import './App.css'
import { Box, IconButton } from '@mui/material'
import { AppRoutes } from './routes'
import { SnackbarProvider } from 'notistack'
import { createRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'

function App() {
  const notistackRef = createRef()
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key)
  }

  return (
    <>
      <Box>
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
              <CloseIcon/>
            </IconButton>
          )}>
          <AppRoutes />
        </SnackbarProvider>
      </Box >
    </>
  )
}

export default App