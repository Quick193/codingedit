import mongoose from 'mongoose'

async function connectDB() {
  const uri = process.env.MONGO_URI
  if (!uri) {
    throw new Error('MONGO_URI not provided')
  }
  await mongoose.connect(uri)
  console.log('MongoDB connected')
}

export default connectDB
