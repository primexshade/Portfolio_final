import mongoose from 'mongoose'

/** Connect to MongoDB using Mongoose */
export async function connectDB(uri) {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(uri, { dbName: process.env.DB_NAME || undefined })
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  }
}
