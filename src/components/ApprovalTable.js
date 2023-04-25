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
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme()

export default function ApprovalTable() {
  const approverList = [
    {
      unit: '교육3부',
      approver: [
        { position: '회계', name: '박경란' },
        { position: '부장', name: '주광철' },
      ],
    },
    { unit: '관리부', approver: [{ position: '부장', name: '황태연' }] },
    {
      unit: '재정부',
      approver: [
        { position: '회계', name: '최종철' },
        { position: '부장', name: '정인환' },
        { position: '목사', name: '김대동' },
      ],
    },
  ]

  return (
    <FormGroup aria-label="position" row>
      {approverList.map((approver) => (
        <FormControlLabel
          value={approver.name}
          control={<Checkbox />}
          label={`${approver.unit} ${approver.position} ${approver.name}`}
          labelPlacement="start"
        />
      ))}
    </FormGroup>
  )
}
