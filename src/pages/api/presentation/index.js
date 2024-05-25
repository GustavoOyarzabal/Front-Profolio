import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db()

  switch (req.method) {
    case 'GET': {
      const presentations = await db
        .collection('presentation')
        .find({})
        .toArray()
      console.log(db.presentations)
      res.json(presentations)
      break
    }

    case 'POST': {
      const newPresentation = req.body
      await db.collection('presentation').insertOne(newPresentation)
      res.status(201).json(newPresentation)
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
