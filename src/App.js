import { Container } from '@mui/material'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import logo from './logo.svg'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import NewUser from './pages/NewUser'
import SignIn from './pages/SignIn'
import MainPage from './pages/MainPage'
import Singnup from './pages/Singnup'
import UpdateProfile from './pages/UpdateProfile'
import { DbProvider } from './contexts/DbContext'
import NewAccount from './pages/NewAccount'

function App() {
  return (
    <Container maxWidth="md">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <BrowserRouter>
          <AuthProvider>
            <DbProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
                <Route path="/signup" element={<Singnup />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/new-user" element={<NewUser />} />
                <Route path="/new-account" element={<NewAccount />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </DbProvider>
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
