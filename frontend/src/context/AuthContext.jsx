import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('raise_user')) || null)
  const [token, setToken] = useState(() => localStorage.getItem('raise_token'))
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      localStorage.setItem('raise_token', token)
    } else {
      localStorage.removeItem('raise_token')
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem('raise_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('raise_user')
    }
  }, [user])

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials)
    setToken(data.token)
    setUser(data.user)
    navigate('/dashboard')
  }

  const signup = async (payload) => {
    const { data } = await api.post('/auth/signup', payload)
    setToken(data.token)
    setUser(data.user)
    navigate('/dashboard')
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
