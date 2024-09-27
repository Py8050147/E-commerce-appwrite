

// import SignUp from './components/_auth/signupForm.jsx'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice.js'
import authService from './appwrite/auth.js'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
// import './App.css'
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <>
      <Header />
      <main>
      <Outlet />
      </main>
    </>
  
  ) : null
}

export default App
