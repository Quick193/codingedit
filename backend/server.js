import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import campaignRoutes from './routes/campaignRoutes.js'
import donationRoutes from './routes/donationRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import { notFound, errorHandler } from './utils/errorHandler.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '2mb' }))
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use('/api/campaigns', campaignRoutes)
app.use('/api/donations', donationRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.get('/', (req, res) => res.json({ message: 'Raise API running' }))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}).catch((err) => {
  console.error('Database connection failed', err)
  process.exit(1)
})
