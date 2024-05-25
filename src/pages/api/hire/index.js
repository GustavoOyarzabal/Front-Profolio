import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db()

  switch (req.method) {
    case 'GET': {
      const hires = await db.collection('hire').find({}).toArray()
      console.log(db.hires)
      res.json(hires)
      break
    }

    case 'POST': {
      const newHire = req.body
      await db.collection('hire').insertOne(newHire)
      res.status(201).json(newHire)
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
