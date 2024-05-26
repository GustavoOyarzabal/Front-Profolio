import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db()

  switch (req.method) {
    case 'GET': {
      const works = await db.collection('works').find({}).toArray()
      console.log(db.works)
      res.json(works)
      break
    }

    case 'POST': {
      const newEWork = req.body
      await db.collection('works').insertOne(newEWork)
      res.status(201).json(newEWork)
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
