import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db()

  switch (req.method) {
    case 'GET': {
      const abouts = await db.collection('about').find({}).toArray()
      console.log(db.abouts)
      res.json(abouts)
      break
    }

    case 'POST': {
      const newAbout = req.body
      await db.collection('about').insertOne(newAbout)
      res.status(201).json(newAbout)
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
