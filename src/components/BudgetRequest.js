import React, { useState } from 'react'

import {
    Button,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    Paper,
    Box,
    Grid,
    Popover,
    TextField,
    Stack,
    IconButton,
    Input
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styled from '@emotion/styled'

import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette:{
    customWhite: {      
      main: '#ffffff',      
    },
    customBlack: {
      main: '#000',      
    }
  }
})

export default function BudgetRequest({tableData}) {

  const [localTbData, setLocalTbData] = useState(tableData)

  const onItemChange = (row, e) => {
    const newTbData = localTbData.map((el, idx) => idx === row ? {...el, item: e.target.value} : el)
    // console.log(newTbData)
    setLocalTbData(newTbData)
  }

  const onDescChange = (row, e) => {
    const newTbData = localTbData.map((el, idx) => idx === row ? {...el, desc: e.target.value} : el)
    // console.log(newTbData)
    setLocalTbData(newTbData)
  }

  const onAmountChange = (row, e) => {
    const newTbData = localTbData.map((el, idx) => idx === row ? {...el, amount: e.target.value} : el)
    // console.log(newTbData)
    setLocalTbData(newTbData)
  }

  const onDeleteClick = (row, e) => {
    e.preventDefault()
    // console.log(localTbData)
    setLocalTbData(localTbData.filter((element, idx) => idx !== row) )
    // console.log(localTbData)
  }

  const renderRow = (numRow) => (
    <Stack direction="row" alignItems="stretch">
            <Input id="string-input" type="text" name={`item${numRow}`} disableUnderline multiline
              value={localTbData[numRow].item}
              sx={{width:"30%", borderLeft:'1px solid', borderRight:'1px solid', borderBottom:'1px solid', p:0.5}}
              onChange={(e) => onItemChange(numRow, e)} />
            <Input id="string-input" type="text" name={`decs${numRow}`} disableUnderline multiline
              value={localTbData[numRow].desc}
              sx={{width:"40%", borderBottom:'1px solid', p:0.5}} 
              onChange={(e) => onDescChange(numRow, e)}/>
            <Input id="number-input" type="number" name={`amount${numRow}`} disableUnderline
              value={localTbData[numRow].amount}
              sx={{width:"25%", borderLeft:'1px solid', borderRight:'1px solid', borderBottom:'1px solid', p:0.5}}
              inputProps={{min: 0, max:50000000, style:{textAlign:'right'}}}
              onChange={(e) => onAmountChange(numRow, e)}/>
            <IconButton sx={{width:"5%"}} 
              onClick={(e) => onDeleteClick(numRow, e)}>
              <DeleteForeverIcon color='secondary'/>
            </IconButton>
    </Stack>
  )
  
  const handleAddRow = () =>{
    const nextTbData = localTbData.concat({item:'', desc:'', amount:0})
    //console.log("tmpTbData in handleAddRow: ", nextTbData)
    setLocalTbData(nextTbData)
    //console.log("localTbData in handleAddRow: ", localTbData)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className='smallFont'>
        <Stack direction="column" alignItems="stretch">
          <Stack direction="row">
            <Box sx={{ border:'1px solid', px:1, py:1.5, width:"30%"}}>과목</Box>
            <Box sx={{ borderTop:'1px solid', borderBottom:'1px solid', px:1, py:1.5, width:'40%'}}>내역</Box>
            <Box sx={{ border:'1px solid', px:1, py:1.5, width:'25%'}}>금액</Box>
            <Box sx={{width:"5%"}}/>
          </Stack>
          
          {localTbData.map((item, i) => renderRow(i))}
                              
          <Stack direction="row" alignItems="center">
          <Button onClick={handleAddRow} variant="outlined" sx={{width:"95%", mt:'2px'}} startIcon={<AddCircleIcon />} >
            행 추가
          </Button>  
            <Box sx={{width:"5%"}}/>
          </Stack>       
      </Stack>
    </div>
    </ThemeProvider>
  )
}
