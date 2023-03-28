import React, { useRef } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function Singnup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <h2 className="text-center mb-4">사용자 계정 만들기</h2>
        <div>
          <TextField
            required
            id="email-input"
            label="메일 주소"
            type="email"
            ref={emailRef}
            placeholder="Email 주소를 입력해주세요"
            variant="standard"
          />
        </div>

        <div>
          <TextField
            required
            id="password-input"
            label="패스워드"
            type="password"
            ref={passwordRef}
            placeholder="패스워드를 입력해주세요"
            autoComplete="current-password"
            variant="standard"
          />
        </div>

        <div>
          <TextField
            required
            id="confirm-password-input"
            label="패스워드 확인"
            type="password"
            ref={passwordConfirmRef}
            placeholder="동일한 패스워드를 다시 한번 입력해주세요"
            autoComplete="confirm-password"
            variant="standard"
          />
        </div>
      </Box>

      <div className="w-100 text-center mt-2">유효한 계정이 있나요? 로그인</div>
    </div>
  )
}
