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
  Popover
} from '@mui/material'
import styled from '@emotion/styled'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import imgApprove from "./image/Approve.png"
// import imgNoDecision from "./image/NoDecision.png"
import imgReject from "./image/Reject.png"
import imgHoding from "./image/Holding.png"

const theme = createTheme()

export default function ApprovalTable({unit, position, aprName }) {  
  const [aprvState, setAprvState] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)

  let tmpState = 0
  const handleStampClick = () => {
    tmpState = aprvState + 1
    tmpState %= 4
    setAprvState(tmpState)
  }

  const handleDetailClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  let total = 5
  let approved = 3

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{width:'100%', display:'flex', flexDirection:'row'}}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={7} >
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', height:'34px'}} >
              <Typography variant='subtitle1'>
                {`${unit} ${position} ${aprName}`}
              </Typography>
              <Button sx={{ml:-2}} onClick={handleStampClick} disableFocusRipple>
                {aprvState === 0 && "(인)"}
                {aprvState === 1 && <img src={imgApprove} alt="stemp" width={"30px"} />}
                {aprvState === 2 && <img src={imgReject} alt="stemp" width={"30px"} />}
                {aprvState === 3 && <img src={imgHoding} alt="stemp" width={"30px"} />}
              </Button>          
            </Box>
          </Grid>
          <Grid item xs={5} align="center" >
            <Button variant='outlined' size="small" onClick={handleDetailClick}>결제 상황 {`(${approved}/${total})`}</Button>
            <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}} >
              <Typography sx={{ p: 1 }}>
                교육3부 회계 박경란 : 승인<br/>
                교육3부 부장 주광철 : 승인<br/>
                관리부 부장 황태연 :<br/>
                재정부 회계 최종철 :<br/>
                재정부 부장 정인환 :<br/>
                교회 목사 김대동 :
              </Typography>
            </Popover>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
