import React, { useState } from 'react'
import {
  Button,
  Typography,
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

  let tmpState = 0
  const handleClick = () => {
    tmpState = aprvState + 1
    tmpState %= 4
    setAprvState(tmpState)
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Typography variant='subtitle1' sx={{mr:0, pr:0}}>
        {`${unit} ${position} ${aprName}`}
      </Typography>
      <Button sx={{ml:-1.5, pl:0}} onClick={handleClick}>
        {aprvState === 0 && "(인)"}
        {aprvState === 1 && <img src={imgApprove} alt="stemp" width={"30px"} />}
        {aprvState === 2 && <img src={imgReject} alt="stemp" width={"30px"} />}
        {aprvState === 3 && <img src={imgHoding} alt="stemp" width={"30px"} />}
      </Button>
    </ThemeProvider>
  )
}
