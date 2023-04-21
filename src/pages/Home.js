import React, { useState } from 'react'
// import { Image, Dimension } from 'react-native'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link as domLink, useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material'
import AtomsCopyright from '../components/AtomsCopyright'

// in case that any customization is required, you need to put an object argument in createTheme()
const theme = createTheme()

export default function Dashboard() {
  const navigate = useNavigate()
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src="Gumee.jpg" style={{ width: 200 }} alt="Gumee church logo" />
          {/* <Image
            style={{ width: '100%' }}
            source="Gumee.jpg"
            resizeMode="cover"
          /> */}
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}

          <Box component="form" noValidate sx={{ mt: 4 }}>
            <Typography variant="h5" fontFamily="Nanum Gothic">
              간편 회계 프로그램
            </Typography>
            <Grid container sx={{ mt: 6 }}>
              <Grid item xs>
                <Link
                  href=""
                  onClick={() => {
                    navigate('/help')
                  }}
                  variant="h7"
                  fontFamily="Gamja Flower"
                  fontSize="1.5rem"
                >
                  도움말
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href=""
                  onClick={() => {
                    navigate('/login')
                  }}
                  variant="h7"
                  fontFamily="Gamja Flower"
                  fontSize="1.5rem"
                >
                  로그인
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <AtomsCopyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
