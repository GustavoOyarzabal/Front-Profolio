import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db()

  switch (req.method) {
    case 'GET': {
      const experiences = await db.collection('experience').find({}).toArray()
      console.log(db.experiences)
      res.json(experiences)
      break
    }

    case 'POST': {
      const newExperience = req.body
      await db.collection('experience').insertOne(newExperience)
      res.status(201).json(newExperience)
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
