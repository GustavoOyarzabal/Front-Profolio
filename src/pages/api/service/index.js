import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db()

  switch (req.method) {
    case 'GET': {
      const services = await db.collection('service').find({}).toArray()
      console.log(db.services)
      res.json(services)
      break
    }

    case 'POST': {
      const newService = req.body
      await db.collection('service').insertOne(newService)
      res.status(201).json(newService)
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
