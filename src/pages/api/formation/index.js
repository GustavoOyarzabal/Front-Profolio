import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db()

  switch (req.method) {
    case 'GET': {
      const formations = await db.collection('formation').find({}).toArray()
      console.log(db.formations)
      res.json(formations)
      break
    }

    case 'POST': {
      const newFormation = req.body
      await db.collection('formation').insertOne(newFormation)
      res.status(201).json(newFormation)
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
