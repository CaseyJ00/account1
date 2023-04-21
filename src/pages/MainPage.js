import React, { useState } from 'react'
import {
  Box,
  Container,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Badge,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import ApprovalIcon from '@mui/icons-material/Approval'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useDb } from '../contexts/DbContext'
import { query, getDocs, addDoc, getDoc } from 'firebase/firestore'
import AtomsCopyright from '../components/AtomsCopyright'

const theme = createTheme()

export default function MainPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [unitCode, setUnitCode] = useState('')
  const navigate = useNavigate()
  const [alignment, setAlignment] = useState('reqBudget')

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

  let selectedId = ''
  let selectedUnitName = ''
  const selCallback = (id, name) => {
    selectedId = id
    selectedUnitName = name
    //console.log(`ID: ${id}; unit name: ${name}`)
  }

  let email = ''
  let userName = ''
  const hdlEmailInput = (event) => {
    email = event.target.value
  }
  const hdlNameInput = (event) => {
    userName = event.target.value
  }

  const reqRegister = () => {
    console.log(
      `Request resgisteration for ID: ${selectedId}; unit name: ${selectedUnitName}`
    )

    const colRef = getColRef('requests')
    addDoc(colRef, {
      unitId: selectedId,
      unitName: selectedUnitName,
      email: email,
      userName: userName,
    })
      .then((docRef) => {
        console.log(`done request, given Id : ${docRef.id}`)
      })
      .catch((err) => {
        console.log(err.message)
        setError('시스템 장애가 있습니다. 나중에 다시 시도해보세요.')
      })

    // navigate('/home')
  }

  const handleChange = (event, newAlignment) => {
    console.log('current menu', alignment)
    console.log('menu to be selected', newAlignment)
    setAlignment(newAlignment)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="reqBudget" sx={{ py: '2px', px: '4px' }}>
              청구
            </ToggleButton>
            <ToggleButton value="expend" sx={{ py: '2px', px: '4px' }}>
              지출
            </ToggleButton>
            <ToggleButton value="acntBook" sx={{ py: '2px', px: '4px' }}>
              장부
            </ToggleButton>
            <ToggleButton value="return" sx={{ py: '2px', px: '4px' }}>
              반납
            </ToggleButton>
            <ToggleButton value="income" sx={{ py: '2px', px: '4px' }}>
              입금
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            sx={{ ml: 2, py: '2px', px: '2px' }}
          >
            저장
          </Button>
          <Badge badgeContent={4} color="error" sx={{ ml: 0.5, px: '2px' }}>
            <ApprovalIcon color="action" />
          </Badge>
        </Box>
        <AtomsCopyright sx={{ mt: 6, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
