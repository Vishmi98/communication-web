import mongoose from 'mongoose'

const MONGODB_URI = "mongodb+srv://devuser:LFDqdkxCHLa4EP@stag.jt9ps.mongodb.net/communication"

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then(mongoose => {
      console.log('MongoDB connected')
      return mongoose
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
