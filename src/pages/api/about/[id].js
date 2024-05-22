import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db()

  const { id } = req.query

  switch (req.method) {
    case 'GET': {
      const about = await db
        .collection('about')
        .findOne({ _id: new ObjectId(id) })
      res.json(about)
      break
    }
    case 'PUT': {
      const updateData = req.body
      await db
        .collection('about')
        .updateOne({ _id: new ObjectId(id) }, { $set: updateData })
      res.status(200).json(updateData)
      break
    }
    case 'DELETE': {
      await db.collection('about').deleteOne({ _id: new ObjectId(id) })
      res.status(204).end()
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
