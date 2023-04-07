import React, { useState } from 'react'
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Alert,
} from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import RichObjectTreeView from '../components/RichObjectTreeView'
import { useDb } from '../contexts/DbContext'
import { query, getDocs } from 'firebase/firestore'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://atoms-kr.com/">
        Atoms
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function NewUser() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [unitCode, setUnitCode] = useState('')
  const navigate = useNavigate()

  const parsedData = []

  const objParsing = (snapShot) => {
    let keyStringLng = 0

    snapShot.forEach((doc) => {
      let tmpStr = ''
      let insertPoint = parsedData
      let foundFlg = false
      const unitCode = doc.id

      keyStringLng = doc.id.length
      for (let index = 0; index < keyStringLng; index++) {
        if (index === keyStringLng - 1) {
          const toBeInserted = {}
          toBeInserted.id = unitCode
          toBeInserted.name = doc.data().name
          //console.log('toBeInserted: ', toBeInserted)
          insertPoint.push(toBeInserted)
        } else {
          tmpStr = unitCode.substring(0, index + 1)
          foundFlg = false
          // eslint-disable-next-line no-loop-func
          insertPoint.forEach((elmtObj) => {
            if (elmtObj.id === tmpStr) {
              if (!elmtObj.children) elmtObj.children = []
              insertPoint = elmtObj.children
              foundFlg = true
              return
            }
          })

          if (!foundFlg)
            throw new Error(`no parent unit of ${unitCode}, ${tmpStr}`)
        }
      }
    })
  }

  const { getColRef } = useDb()

  const q = query(getColRef('unitHierarchy'))
  getDocs(q)
    .then((snapShot) => {
      try {
        objParsing(snapShot)
      } catch (e) {
        console.log(e)
      } finally {
        //console.log(parsedData)
      }
    })
    .catch((err) => {
      console.log(err.message)
      setError('조직 정보 가져오기 실패')
    })

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })

    setError('')
    setLoading(true)

    setLoading(false)
  }

  const handleChange = (event) => {
    setUnitCode(event.target.value)
  }

  //console.log('Render App')

  const reqRegister = () => {
    navigate('/home')
  }

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
          <Typography component="h1" variant="h5" fontFamily="Nanum Gothic">
            사용자 계정 등록 요청
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <RichObjectTreeView data={parsedData} title="소속 부서" />

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
              id="name"
              label="성명"
              name="name"
              autoFocus
              onClick={() => {
                setError('')
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              onClick={reqRegister}
            >
              사용자 등록 요청
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href=""
                  onClick={() => {
                    navigate('/home')
                  }}
                  variant="h7"
                  fontFamily="Gamja Flower"
                  fontSize="1.5rem"
                >
                  홈 화면
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
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
