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
  Typography,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import ApprovalIcon from '@mui/icons-material/Approval'
import SettingsIcon from '@mui/icons-material/Settings'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { useDb } from '../contexts/DbContext'
import { query, getDocs, addDoc, getDoc } from 'firebase/firestore'
import AtomsCopyright from '../components/AtomsCopyright'
import ApprovalTable from '../components/ApprovalTable'
import RichObjectTreeView from '../components/RichObjectTreeView'

const theme = createTheme()

const docTypes = [{id:'1', name:'예산 청구서'}, {id:'2', name:'예산 지출서'}, {id:'3', name:'예산 반납서'}, {id:'4', name:'수입 입금서'}, {id:'5', name:'회계감사 자료'}]

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

  let selectedDocId = ''
  let selectedDocType = ''
  const selCallback = (id, doc) => {
    selectedDocId = id
    selectedDocType = doc
    console.log(`ID: ${id}; Doc: ${doc}`)
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="s">
        <Box sx={{mt:2, display:'flex', flexDirection:'row', alignItems:'flex-end'}}>
          <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems='flex-end'>
            <Grid item xs={4}>
              <Button fullWidth variant="contained" startIcon={<SettingsIcon />} >
                주광철
              </Button>
            </Grid>

            <Grid item xs={5}>
              <Button variant="outlined" startIcon={<LogoutIcon />}>
                로그아웃
              </Button>
            </Grid>

            <Grid item xs={2} alignItems="self-end">
              <Badge badgeContent={4} color="error">
                <ApprovalIcon color="action" />
              </Badge> 
            </Grid>
          </Grid>
        </Box>

        <Box sx={{mt:1, display:'flex', flexDirection:'row'}} >
          <Grid container spacing={1} direction="row" justifyContent="space-between" alignItems="flex-end">
            <Grid item xs={9}>
              <ToggleButtonGroup color="primary" value={docPage} exclusive onChange={handleChangeOnSel} aria-label="Platform">
                <ToggleButton value="reqBudget" sx={{py:'6px', px:'4px'}}>
                  서류 작성
                </ToggleButton>
                <ToggleButton value="expend" sx={{py:'6px', px:'4px'}}>
                  수정/승인
                </ToggleButton>

                <ToggleButton value="return" sx={{py:'6px', px:'4px'}}>
                  장부 조회
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            <Grid item xs={3}>
              <Button variant="outlined" sx={{px:'4px'}} startIcon={<SaveIcon />}  >
                저장
              </Button>
            </Grid>
          </Grid>  
        </Box>

        <Box sx={{mt:1.5, mx:0, display:'flex', flexDirection:'row', justifyContent:'space-between'}} >
          <Grid container spacing={1} direction="row" justifyContent="space-between" alignItems="center">
            <Grid item xs={6}>
              <RichObjectTreeView data={docTypes} title="문서 선택" selCallback={selCallback} placeholder="작업할 문서 선택" size="small" fontControl={true}/>
            </Grid>
            
            <Grid item xs={6}>
              <Typography
                  variant="subtitle1" align="center"
                  // sx={{mt:'2px', border:2, borderRadius:3, borderColor:'warning.main',"javascript.format.enable": false}}
              >
                  {`교육3부   교3-R001`}
              </Typography>
            </Grid>
            
          </Grid>
        </Box>      
    
        <Box sx={{mt:1, mx:0, display:'flex', flexDirection:'row', alignItems:'center'}}>
          <ApprovalTable />
        </Box>

        <Box sx={{mt:4, display:'flex', flexDirection:'row', alignItems:'center'}}>
          main content
        </Box>

        <AtomsCopyright sx={{ mt: 6}} />
      </Container>
    </ThemeProvider>
  )
}
