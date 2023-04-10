import React, { useState } from 'react'
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
//import { css } from '@emotion/react'
import { useAuth } from '../contexts/AuthContext'
//import { useNavigate } from 'react-router-dom'
import { Link as domLink, useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material'
import AtomsCopyright from '../components/AtomsCopyright'

const theme = createTheme()

export default function SignIn() {
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })

    setError('')
    setLoading(true)

    login(data.get('email'), data.get('password'))
      .then((cred) => {
        console.log('logined user:', cred.user)
        navigate('/home')
      })
      .catch((err) => {
        console.log(err.message)
        setError('메일주소와 비밀번호를 바르게 입력해주세요.')
      })

    setLoading(false)
  }

  //console.log('Render App')

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontFamily="Nanum Gothic">
            로그인
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-메일 주소"
              name="email"
              autoComplete="email"
              autoFocus
              onClick={() => {
                setError('')
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="비밀번호"
              name="password"
              type="password"
              autoComplete="current-password"
              onClick={() => {
                setError('')
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="계정정보 기억"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href=""
                  onClick={() => {
                    navigate('/forgot-password')
                  }}
                  variant="h7"
                  fontFamily="Gamja Flower"
                  fontSize="1.5rem"
                >
                  비밀번호 초기화
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href=""
                  onClick={() => {
                    navigate('/new-user')
                  }}
                  variant="h7"
                  fontFamily="Gamja Flower"
                  fontSize="1.5rem"
                >
                  사용자 등록
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
