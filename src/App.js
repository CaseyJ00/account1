import { Container } from '@mui/material'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import logo from './logo.svg'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import SignIn from './pages/SignIn'
import Singnup from './pages/Singnup'
import UpdateProfile from './pages/UpdateProfile'

function App() {
  return (
    <Container maxWidth="md">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/signup" element={<Singnup />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </Container>
  )
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   )
// }

export default App
