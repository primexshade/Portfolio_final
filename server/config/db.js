import mongoose from 'mongoose'

/** Connect to MongoDB using Mongoose */
export async function connectDB(uri) {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(uri, { dbName: process.env.DB_NAME || undefined })
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    console.log('⚠️  Server will continue without MongoDB (GitHub/LeetCode APIs will still work)')
    // Don't exit - allow server to continue for non-DB endpoints
  }
}
