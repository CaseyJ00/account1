import React, { useState } from 'react'
import {
  Box,
  Container,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Badge,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import ApprovalIcon from '@mui/icons-material/Approval'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { useDb } from '../contexts/DbContext'
import { query, getDocs, addDoc, getDoc } from 'firebase/firestore'
import AtomsCopyright from '../components/AtomsCopyright'
import ApprovalTable from '../components/ApprovalTable'

const theme = createTheme()

export default function MainPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [unitCode, setUnitCode] = useState('')
  const navigate = useNavigate()
  const [docPage, setDocPage] = useState('reqBudget')
  const [selectedDoc, setSelectedDoc] = useState('')
  const [selectedBook, setSelectedBook] = useState('')

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

  const handleChangeOnSel = (event, newDocPage) => {
    console.log('current menu', docPage)
    console.log('menu to be selected', newDocPage)
    setDocPage(newDocPage)
    setSelectedDoc('reqBudget')
    setSelectedBook('')
  }

  const handleChangeOnDoc = (event) => {
    setSelectedDoc(event.target.value)
    setSelectedBook('')
  }

  const handleChangeOnBook = (event) => {
    setSelectedBook(event.target.value)
    setSelectedDoc('')
    setDocPage('')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="s">
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* <Grid container sx={{ justifyContent: 'space-around' }}> */}
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">문서</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedDoc}
                  label="Unit"
                  onChange={handleChangeOnDoc}
                >
                  <MenuItem value={10} sx={{ color: 'primary.dark' }}>
                    교3-작성
                  </MenuItem>
                  <MenuItem value={20} sx={{ color: 'warning.dark' }}>
                    예E001
                  </MenuItem>
                  <MenuItem value={30} style={{ color: 'gray' }}>
                    교3B001
                  </MenuItem>
                  <MenuItem value={40} sx={{ color: 'warning.dark' }}>
                    교3R001
                  </MenuItem>
                  <MenuItem value={50} sx={{ color: 'warning.dark' }}>
                    재I001
                  </MenuItem>
                  <MenuItem value={60} sx={{ color: 'secondary.dark' }}>
                    재-장부
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <Button variant="contained">주광철</Button>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <Button
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  // sx={{ ml: 2, py: '2px', px: '2px' }}
                >
                  Logout
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={docPage}
            exclusive
            onChange={handleChangeOnSel}
            aria-label="Platform"
          >
            <ToggleButton value="reqBudget" sx={{ py: '6px', px: '7px' }}>
              청구
            </ToggleButton>
            <ToggleButton value="expend" sx={{ py: '6px', px: '7px' }}>
              지출
            </ToggleButton>

            <ToggleButton value="return" sx={{ py: '6px', px: '7px' }}>
              반납
            </ToggleButton>
            <ToggleButton value="income" sx={{ py: '6px', px: '7px' }}>
              입금
            </ToggleButton>
          </ToggleButtonGroup>

          <FormControl size="small">
            <InputLabel id="demo-simple-select-label">장부</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedBook}
              label="Unit"
              onChange={handleChangeOnBook}
            >
              <MenuItem value={10}>예배부</MenuItem>
              <MenuItem value={20}>성가부</MenuItem>
              <MenuItem value={30}>교육1부</MenuItem>
              <MenuItem value={40}>교육2부</MenuItem>
              <MenuItem value={50}>재정부</MenuItem>
              <MenuItem value={60}>관리부</MenuItem>
            </Select>
          </FormControl>

          <Badge
            badgeContent={4}
            color="error"
            sx={{ ml: 0.5, px: '2px', mr: 0.5 }}
          >
            <ApprovalIcon color="action" />
          </Badge>
        </Box>

        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            sx={{ ml: 2, py: '2px', px: '2px' }}
          >
            저장
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <ApprovalTable />
        </Box>

        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* main content */}
        </Box>

        <AtomsCopyright sx={{ mt: 6, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
