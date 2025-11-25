import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

async function connectDB () {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/raise'
  const allowMemory = process.env.ENABLE_IN_MEMORY_DB !== 'false'

  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI not set in environment, defaulting to mongodb://127.0.0.1:27017/raise')
  }

  try {
    await mongoose.connect(uri)
    console.log(`MongoDB connected at ${uri}`)
    return
  } catch (err) {
    console.error('Database connection failed', err)
    if (!allowMemory) throw err
  }

  try {
    console.log('Starting in-memory MongoDB instance because default connection failed...')
    const memoryServer = await MongoMemoryServer.create()
    const memoryUri = memoryServer.getUri('raise')
    await mongoose.connect(memoryUri)
    console.log(`In-memory MongoDB connected at ${memoryUri}`)
  } catch (err) {
    console.error('Failed to start in-memory MongoDB', err)
    throw err
  }
}

export default connectDB
