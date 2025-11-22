import mongoose from 'mongoose'

async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/raise'
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI not set in environment, defaulting to mongodb://127.0.0.1:27017/raise')
  }
  await mongoose.connect(uri)
  console.log(`MongoDB connected at ${uri}`)
}

export default connectDB
