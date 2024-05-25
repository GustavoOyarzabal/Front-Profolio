import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db()

  switch (req.method) {
    case 'GET': {
      const footers = await db.collection('footer').find({}).toArray()
      console.log(db.footers)
      res.json(footers)
      break
    }

    case 'POST': {
      const newFooter = req.body
      await db.collection('footer').insertOne(newFooter)
      res.status(201).json(newFooter)
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
