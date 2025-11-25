import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { asyncHandler } from '../utils/errorHandler.js'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-raise-secret-change-me'

if (!process.env.JWT_SECRET) {
  console.warn('JWT_SECRET not set; using a development fallback secret. Set JWT_SECRET in production.')
}

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' })

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  const existing = await User.findOne({ email })
  if (existing) {
    return res.status(400).json({ message: 'Email already registered' })
  }
  const user = await User.create({ name, email, password })
  const token = generateToken(user._id)
  res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email }
  })
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ message: 'Invalid credentials' })
  const match = await user.matchPassword(password)
  if (!match) return res.status(400).json({ message: 'Invalid credentials' })
  const token = generateToken(user._id)
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
})
