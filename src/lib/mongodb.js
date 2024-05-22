import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let client
// eslint-disable-next-line import/no-mutable-exports
let clientPromise

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'dev') {
  if (!global.mongoClientPromise) {
    client = new MongoClient(uri, options)
    global.mongoClientPromise = client.connect()
  }
  clientPromise = global.mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
